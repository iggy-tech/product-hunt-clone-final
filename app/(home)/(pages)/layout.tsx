import { auth } from "@/auth";
import Navbar from "@/components/navbar/navbar";
import { getNotifications, getProductsByUserId } from "@/lib/server-actions";
import { redirect } from "next/navigation";



const PagesLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  // get the user from the server

  const authenticatedUser = await auth();

  if (!authenticatedUser) {
    redirect('/')
  }

  const notifications = await getNotifications();
  const products = await getProductsByUserId(authenticatedUser?.user?.id || "");




  return (
    <html lang="en">
      <body>
        <Navbar 
        authenticatedUser={authenticatedUser}
        products={products}
        notifications={notifications}
        
        />

        {children}
      </body>
    </html>
  );
};

export default PagesLayout;
