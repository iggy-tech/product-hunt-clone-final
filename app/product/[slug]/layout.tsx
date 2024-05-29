import { auth } from "@/auth";
import Navbar from "@/components/navbar/navbar";

const ProductPageLayout = async ({
    children
} : Readonly <{
    children: React.ReactNode   
}>) => {

    //get the user from the server 

    const authenticatedUser = await auth(); 

    return ( 
        <html lang="en">
            <body>
                <Navbar authenticatedUser={authenticatedUser} />
                {children}
            </body>

        </html>
    )
}

export default ProductPageLayout;