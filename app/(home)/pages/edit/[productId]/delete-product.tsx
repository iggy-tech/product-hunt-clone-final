"use client";

import Modal from "@/components/ui/modals/modal";
import { deleteProduct } from "@/lib/server-actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PiStorefront, PiTrash } from "react-icons/pi";

interface DeleteProductProps {
  productId: string;
}

const DeleteProduct: React.FC<DeleteProductProps> = ({ productId }) => {
  const router = useRouter();

  const [confirmationInput, setConfirmationInput] = useState("");
  const [isDeleteButtonEnabled, setIsDeleteButtonEnabled] = useState(false);

  const handleConfirmationInputChange = (e: any) => {
    const inputText = e.target.value.toLowerCase();
    setConfirmationInput(inputText);
    setIsDeleteButtonEnabled(inputText === "delete");
  };

  const handleCancel = () => {
    setDeleteProductModalVisible(false);
  };

  const [deleteProductModalVisible, setDeleteProductModalVisible] =
    useState(false);

  const handleDeleteProductClick = () => {
    setDeleteProductModalVisible(true);
  };

  const handleConfirmDelete = () => {
    if (confirmationInput === "delete") {
      setTimeout(async () => {
        try {
          await deleteProduct(productId);
          router.push("/my-products");
          router.refresh();
        } catch (error) {
          console.error(error);
        }
      }, 3000);
    }
  };

  return (
    <>
      <button
        onClick={handleDeleteProductClick}
        className=" cursor-pointer bg-red-100 p-4 
    justify-center rounded-md items-center flex"
      >
        <PiTrash className="text-xl text-red-500" />
      </button>

      <Modal
        visible={deleteProductModalVisible}
        setVisible={setDeleteProductModalVisible}
      >
        <div>
          <PiStorefront
            className="text-red-500 mb-10 text-5xl
             bg-red-100 p-1 rounded-md"
          />
          <h1 className="text-xl font-semibold mb-10">Delete Product</h1>

          <p className="text-sm">
            We&apos;re sorry to see you go. Once your product is deleted, all of
            your content will be permanently gone, including your products and
            product settings.
          </p>

          <p className="text-sm py-10">
            This action cannot be undone. This will permanently delete your
            product and all of your content.
          </p>

          <p className="text-sm">To confirm deletion, type “delete” below:</p>

          <input
            type="text"
            className="border w-full p-4 rounded-xl mt-6 focus:outline-none"
            value={confirmationInput}
            onChange={handleConfirmationInputChange}
          />

          <div className="flex justify-end mt-10">
            <button
              className="bg-white text-red-500
             border text-sm rounded-full border-red-500 
             px-4 py-2 mr-4 font-light cursor-pointer"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className={`${
                isDeleteButtonEnabled
                  ? "bg-red-500 text-white rounded-full text-sm"
                  : "bg-gray-200 text-gray-500 rounded-full text-sm cursor-not-allowed"
              } px-4 py-2 `}
              disabled={!isDeleteButtonEnabled}
              onClick={handleConfirmDelete}
            >
              Confirm delete
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DeleteProduct;
