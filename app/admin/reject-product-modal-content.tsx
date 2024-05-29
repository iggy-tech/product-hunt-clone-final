import { rejectProduct } from "@/lib/server-actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PiCheckCircle, PiXCircle } from "react-icons/pi";
import { toast } from "sonner";

interface RejectProductModalContentProps {
  currentProduct: any;
  closeModal: () => void;
}

const RejectProductModalContent: React.FC<RejectProductModalContentProps> = ({
  currentProduct,
  closeModal,
}) => {
  const router = useRouter();

  const [reason, setReason] = useState("");


  const handleRejectButton = async () => {
    try {
        await rejectProduct(currentProduct.id, reason);
        toast(
            <>
              <div className="flex items-center gap-4 mx-auto">
                <PiCheckCircle className="text-green-500 text-3xl" />
                <div className="text-md font-semibold">
                  Product rejected successfully
                </div>
              </div>
            </>,
            {
              position: "top-center",
            }
          );
          closeModal();
          router.refresh();
        } catch (error) {
          console.log(error);
        }
      };


  return (
    <div className="h-full overflow-auto">
      <div>
        <PiXCircle
          className="text-red-500 
            text-5xl mb-4 bg-red-100 p-1 
            rounded-md"
        />
        <h1 className="text-3xl font-bold mb-4">Reject Product</h1>
        <p className="text-gray-500 mb-4">
          Are you sure you want to reject this product?
        </p>
        <p className="  text-gray-500">
          Once rejected, the owner will be notified with the neccessary steps to
          take.
        </p>

        <div>
          <h1 className="text-gray-500 py-4 font-semibold">
            Reason for rejection
          </h1>

          <textarea
            onChange={(e) => setReason(e.target.value)}
            className="w-full p-2 rounded-md border focus:outline-none"
            placeholder="Enter reason for rejection"
            rows={4}
          >
            {reason}
          </textarea>
        </div>

        <button
        onClick={handleRejectButton}
        className="pt-4 text-red-500 hover:underline"
        
        >
            Click here to reject 

        </button>
      </div>
    </div>
  );
};

export default RejectProductModalContent;
