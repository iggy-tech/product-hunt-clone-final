"use client";

import Image from "next/image";
import { useState } from "react";
import {
  PiArrowBendDoubleUpRight,
  PiCaretUpFill,
  PiChatCircle,
} from "react-icons/pi";
import ProductModal from "./ui/modals/product-modal";
import ProductModalContent from "./product-modal-content";
import Modal from "./ui/modals/modal";
import AuthContent from "./navbar/auth-content";
import Link from "next/link";
import { upvoteProduct } from "@/lib/server-actions";
import { motion } from "framer-motion";


interface ProductItemProps {
  product: any;
  authenticatedUser: any;
}

const ProductItem: React.FC<ProductItemProps> = ({
  product,
  authenticatedUser,
}) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<any>(null);

  const [hasUpvoted, setHasUpvoted] = useState(
    product.upvoters?.includes(authenticatedUser?.user.id)
  );

  const [totalUpvotes, setTotalUpvotes] = useState(product.upvotes || 0);

  const handleProductItemClick = () => {
    if (!authenticatedUser) {
      setShowLoginModal(true);
    } else {
      setCurrentProduct(product);
      setShowProductModal(true);
    }
  };

  const handleArrowClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    // Prevent the click event from propagating to the product item container
    e.stopPropagation();
    // Open the link in a new tab
    window.open(`${product.website}`, "_blank");
  };

  const handleCategoryClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.stopPropagation();
  };


  const handleUpvoteClick = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();

    try {
      await upvoteProduct(product.id);
      setHasUpvoted(!hasUpvoted);
      setTotalUpvotes(hasUpvoted ? totalUpvotes - 1 : totalUpvotes + 1);
    } catch (error) {
      console.error(error);
    }
  }




  const releaseDate = product.releaseDate && new Date(product.releaseDate);

  const currentDate = new Date();

  let displayReleaseDate;

  if (releaseDate > currentDate) {
    displayReleaseDate = releaseDate.toDateString();
  } else {
    displayReleaseDate = "Available Now";
  }

  const variants = {
    initital : { scale: 1 },
    upvoted: { scale: [1, 1.2, 1], transition: { duration: 0.3 } },
  };



  return (
    <div
      onClick={handleProductItemClick}
      className="
    py-4 w-full cursor-pointer p-2   
    rounded-md
     hover:bg-gradient-to-bl
    from-[#ffe6d3]
    via-[#fdfdfd]
    to-white
    "
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src={product.logo}
            alt="logo"
            width={1000}
            height={1000}
            className="h-12 w-12 rounded-md"
          />

          <div className="ml-4">
            <div className="md:flex items-center gap-x-2">
              <h1 className="text-sm font-semibold">{product.name}</h1>
              <p className="hidden md:flex text-xs">-</p>
              <p className="text-gray-500 text-xs md:text-sm pr-2">
                {product.headline}
              </p>
              <div
                onClick={handleArrowClick}
                className="hidden md:flex cursor-pointer"
              >
                <PiArrowBendDoubleUpRight />
              </div>
            </div>
            <div className="hidden md:flex gap-x-2 items-center">
              <div className="text-xs text-gray-500 flex gap-x-1 items-center">
                {product.commentsLength}
                <PiChatCircle />
              </div>

              {product.categories.map((category: string) => (
                <div key={category} className="text-xs text-gray-500">
                  <div className="flex gap-x-1 items-center">
                    <div className="mr-1">•</div>
                    <Link
                      href={`/category/${category.toLowerCase()}`}
                      className="hover:underline"
                      onClick={handleCategoryClick}
                    >
                      {category}
                    </Link>
                  </div>
                </div>
              ))}

              <div className="text-xs text-gray-500">
                <div className="flex gap-x-1 items-center">
                  <div className="mr-1">•</div>
                  {displayReleaseDate}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-sm">
          <motion.div
          onClick={handleUpvoteClick}
          variants={variants}
          animate={hasUpvoted ? "upvoted" : "initital"}
          
          >
            {hasUpvoted ? (
              <div
                className="border px-2 rounded-md flex flex-col 
              items-center bg-gradient-to-bl 
              from-[#ff6154] to-[#ff4582] border-[#ff6154]
              text-white"
              >
                <PiCaretUpFill className="text-xl" />
                {totalUpvotes}
              </div>
            ) : (
              <div className="border px-2 rounded-md flex flex-col items-center">
                <PiCaretUpFill className="text-xl" />
                {totalUpvotes}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <ProductModal visible={showProductModal} setVisible={setShowProductModal}>
        <ProductModalContent
          currentProduct={currentProduct}
          authenticatedUser={authenticatedUser}
          setTotalUpvotes={setTotalUpvotes}
          totalUpvotes={totalUpvotes}
          hasUpvoted={hasUpvoted}
          setHasUpvoted={setHasUpvoted}
        />
      </ProductModal>

      <Modal visible={showLoginModal} setVisible={setShowLoginModal}>
        <AuthContent />
      </Modal>
    </div>
  );
};

export default ProductItem;
