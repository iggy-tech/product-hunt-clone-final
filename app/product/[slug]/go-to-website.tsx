'use client'


interface GoToWebsiteProps {
    website: string;
}


const GoToWebsite: React.FC<GoToWebsiteProps> = ({ 
    website
 }) => {
    return ( 
    <div
    onClick={() => window.open(website, "_blank")}
    className="hidden lg:flex hover:underline cursor-pointer"
    
    >
     Go to website
    </div>
     );
}
 
export default GoToWebsite;