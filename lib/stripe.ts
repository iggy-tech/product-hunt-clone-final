"use server";

import Stripe from "stripe";
import { auth } from "@/auth";

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY as string,
);
const priceId = "price_1PLqVaKEOSg8ptCxWHkkumTe";

// Create a function to generate checkout link
export const createCheckoutSession = async ({ email }: { email: string }) => {
  try {
    const session = await stripe.checkout.sessions.create({
      customer_email: email,
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `https://product-hunt-clone-final.vercel.app/new-product`,
      cancel_url: `https://product-hunt-clone-final.vercel.app`,
    });

    return { url: session.url };
  } catch (error) {
    console.error("Stripe error:", error);
    throw new Error("Failed to create checkout session");
  }
};

// Create a function to get customer portal link
export const createCustomerLink = async () => {


  try {

    const authenticatedUser = await auth()

    if (!authenticatedUser || !authenticatedUser.user || !authenticatedUser.user.email) {
      throw new Error("User not authenticated");
    }

    const email = authenticatedUser.user.email;

    console.log(email, 'email')



    const customers = await stripe.customers.list({
      email: email,
    });

    if (!customers || customers.data.length == 0) {
       throw new Error("Customer not found");
     }

    const customer = customers.data[0];

   if (!customer || !customer.id) {
      throw new Error("Customer not found");
    }

    const portal = await stripe.billingPortal.sessions.create({
      customer: customer.id,
      return_url: `https://product-hunt-clone-final.vercel.app/my-products`,
    });

    return portal.url;
  } catch (error) {

    console.error("Stripe error:", error);

    throw new Error("Customer not found");
  }
};


export const getNextPaymentDetails = async () => {
  try {
    const authenticatedUser = await auth();

    if (!authenticatedUser || !authenticatedUser.user || !authenticatedUser.user.email) {
      throw new Error("User not authenticated");
    }

    const email = authenticatedUser.user.email;

    const customers = await stripe.customers.list({
      email: email,
    });

    if (!customers || customers.data.length === 0) {
      throw new Error("Customer not found");
    }

    const customer = customers.data[0];

    const subscriptions = await stripe.subscriptions.list({
      customer: customer.id,
      status: 'active',
    });

    if (!subscriptions || subscriptions.data.length === 0) {
      throw new Error("No active subscriptions found for customer");
    }

    const subscription = subscriptions.data[0];

    const nextPaymentDate = new Date(subscription.current_period_end * 1000); // Convert timestamp to Date
    
    // Format date to MM/DD/YYYY
    const formattedNextPaymentDate = nextPaymentDate.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });

    const priceId = subscription.items.data[0].price.id;
    const price = await stripe.prices.retrieve(priceId);

    if (!price || !price.unit_amount || !price.currency) {
      throw new Error("Price not found");
    }

    return {
      nextPaymentDate: formattedNextPaymentDate,
      amount: price.unit_amount / 100, // Assuming the amount is in cents, convert to dollars
      currency: price.currency,
    };
  } catch (error) {
    console.error("Error fetching payment details:", error);
    return null;
  }
};