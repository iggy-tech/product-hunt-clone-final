import Image from "next/image";
import { useEffect, useState } from "react";
import { PiCheck, PiCopy } from "react-icons/pi";
import { CopyToClipboard } from "react-copy-to-clipboard";

interface ShareModalContentProps {
  currentProduct: any;
}

const ShareModalContent: React.FC<ShareModalContentProps> = ({
  currentProduct,
}) => {
  const [copiedText, setCopiedText] = useState("");

  const [isCopied, setIsCopied] = useState(false);

  const urlPrefix = "https://product-hunt-clone-final.vercel.app/product/";

  const handleCopy = () => {
    setIsCopied(true);
  };

  useEffect(() => {
    if (currentProduct && currentProduct.slug) {
      setCopiedText(urlPrefix + currentProduct.slug);
    }
  }, [currentProduct]);

  const handleDiscordClick = () => {
    if (currentProduct && currentProduct.discord) {
      window.open(currentProduct.discord, "_blank");
    }
  };

  const handleTwitterClick = () => {
    if (currentProduct && currentProduct.twitter) {
      window.open(currentProduct.twitter, "_blank");
    }
  };

  return (
    <div>
      <Image
        src={currentProduct.logo}
        alt="logo"
        width={200}
        height={200}
        className="h-24 w-28 bg-white shadow-md border rounded-md"
      />
      <div className="py-4">
        <h1 className="text-2xl font-semibold">Share this product</h1>
        <p className="text-gray-600">
          Stay connect by following the product on social media
        </p>

        <div className="flex gap-4 pt-4">
          <button
            className="bg-indigo-100 text-white p-2 rounded-md w-1/2"
            onClick={handleDiscordClick}
          >
            <Image
              src={"/logo/discord-logo.png"}
              width={50}
              height={50}
              alt="discord"
              className="flex items-center justify-center mx-auto"
            />
          </button>

          <button
            className="bg-sky-100 text-white p-5 rounded-md w-1/2"
            onClick={handleTwitterClick}
          >
            <Image
              priority
              src="/logo/twitter-logo.png"
              width={50}
              height={50}
              alt="twitter"
              className="flex items-center justify-center mx-auto"
            />
          </button>
        </div>

        <h1 className="pt-6 font-semibold">Copy Link</h1>
        <div className="mt-2 flex justify-center border rounded-md p-2">
          <input
            type="text"
            value={copiedText}
            className="text-sm md:text-md w-full rounded-md focus:outline-none"
          />
          {isCopied ? (
            <button className="bg-[#3daf64] text-white p-2 rounded-md hover:scale-105">
              <PiCheck className="text-white" />
            </button>
          ) : (
            <CopyToClipboard text={copiedText} onCopy={handleCopy}>
              <button className="bg-[#ff6154] text-white p-2 rounded-md hover:scale-105">
                <PiCopy className="text-white" />
              </button>
            </CopyToClipboard>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShareModalContent;
