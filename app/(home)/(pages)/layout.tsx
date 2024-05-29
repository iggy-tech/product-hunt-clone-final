import { auth } from "@/auth";

import { redirect } from "next/navigation";

const PagesLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  // get the user from the server

  const authenticatedUser = await auth();

  if (!authenticatedUser) {
    redirect("/");
  }


  return (
    <html suppressHydrationWarning={true} lang="en">
      <body>


        {children}
      </body>
    </html>
  );
};

export default PagesLayout;
