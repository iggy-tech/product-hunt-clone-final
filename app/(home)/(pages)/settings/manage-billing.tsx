'use client'


import { createCustomerLink } from "@/lib/stripe";
import { PiX } from "react-icons/pi";
import { toast } from "sonner";

const ManageBilling = () => {
  const handleManageBilling = async () => {
    try {
      const result = await createCustomerLink();
      if (result) {
        window.location.href = result;
      } else {
        throw new Error("Error creating customer portal link");
      }
    } catch (error: any) {
      toast(
        <>
          <div className="flex items-center gap-4 mx-auto">
            <PiX className="text-red-500 text-3xl" />
            <p>Could not create checkout session. Please try again</p>
          </div>
        </>,
        {
          position: "top-center",
        }
      );
    }
  };

  return (
    <button
      onClick={handleManageBilling}
      className="mt-10 text-blue-500
    cursor-pointer hover:underline"
    >
      Manage Billing
    </button>
  );
};

export default ManageBilling;
