import Image from "next/image";
import { X } from "lucide-react";
import { API_URL, IMAGE_URL } from "@/config";
import { getCookie } from "cookies-next";
import axios from "axios";

interface TransactionModalProps {
  isVisible: boolean;
  onClose: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transaction: any;
}

const TransactionModal: React.FC<TransactionModalProps> = ({
  isVisible,
  onClose,
  transaction,
}) => {
  if (!isVisible) return null;

  const token = getCookie("access_token") as string;

  const handleAccept = async () => {
    try {
      await axios.patch(
        `${API_URL}/api/transactions/${transaction.id}`,
        {
          status: "done",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      onClose();
      window.location.reload();
    } catch (err) {
      console.error("Error updating transaction status:", err);
      alert("Failed to update transaction status.");
    }
  };

  const handleReject = async () => {
    try {
      await axios.patch(
        `${API_URL}/api/transactions/${transaction.id}`,
        {
          status: "rejected",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      onClose();
      window.location.reload();
    } catch (err) {
      console.error("Error updating transaction status:", err);
      alert("Failed to update transaction status.");
    }
  };

  return (
    <div className="fixed inset-0 flex backdrop-filter backdrop-brightness-75 backdrop-blur-md justify-center items-center">
      <div className="flex flex-col">
        <button
          className="text-red-600 bg-black rounded-md text-lg place-self-end"
          onClick={() => onClose()}
        >
          <X />
        </button>
        <div className="flex flex-col items-center gap-4 bg-white p-4 w-[400px] h-[400px] rounded-xl text-black border-2 border-black">
          <h2 className="text-2xl font-bold text-[#112D4E]">Payment Proof</h2>

          <Image
            src={IMAGE_URL + transaction.payment_proof}
            alt="payment-proof"
            className="border-black border-solid border-1 rounded-sm"
            width={250}
            height={250}
          />
          <div className="flex gap-4">
            <button
              className="text-white bg-[#112D4E] w-[125px] rounded-md text-lg hover:bg-green-500"
              onClick={handleAccept}
            >
              Accept
            </button>
            <button
              className="text-white bg-yellow-400 w-[125px] rounded-md text-lg hover:bg-red-500"
              onClick={handleReject}
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionModal;
