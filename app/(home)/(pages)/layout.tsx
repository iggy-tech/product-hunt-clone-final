import { auth } from "@/auth";
import Navbar from "@/components/navbar/navbar";
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




  return (
    <html lang="en">
      <body>
        <Navbar authenticatedUser={authenticatedUser} />

        {children}
      </body>
    </html>
  );
};

export default PagesLayout;
