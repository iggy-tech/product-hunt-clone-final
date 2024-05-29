import { auth } from "@/auth";
import Navbar from "@/components/navbar/navbar";
import Spinner from "@/components/spinner";
import { getNotifications, getProductsByUserId } from "@/lib/server-actions";
import { redirect } from "next/navigation";
import { Suspense } from "react";





const HomeLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  // get the user from the server

  const authenticatedUser = await auth();
  const notifications = await getNotifications();
  const products = await getProductsByUserId(authenticatedUser?.user?.id || "");


  return (
    <html 
    suppressHydrationWarning={true}
    
    lang="en">
      <body>
        <Suspense fallback={<Spinner />}>
          <Navbar
            authenticatedUser={authenticatedUser}
            notifications={notifications}
            products={products}
          />

          {children}
        </Suspense>
      </body>
    </html>
  );
};

export default HomeLayout;
