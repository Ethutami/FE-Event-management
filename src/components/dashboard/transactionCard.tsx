
import Button from "../ui/button";
import { Transaction } from "@/interfaces/dashboard.interface";

interface TransactionCardProps {
  transaction: Transaction;
}

export function TransactionCard({ transaction }: TransactionCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold">{transaction.user.name}</h3>
          <p className="text-gray-600">{transaction.event.name}</p>
          <p className="text-sm text-gray-500">
            {transaction.quantity} ticket(s) - ${transaction.totalAmount}
          </p>
          <p
            className={`text-sm ${
              transaction.status === "pending"
                ? "text-yellow-600"
                : transaction.status === "approved"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            Status: {transaction.status}
          </p>
        </div>
        <div className="flex space-x-2">
          {transaction.status === "pending" && (
            <>
              <Button variant="success">Approve</Button>
              <Button variant="danger">Reject</Button>
            </>
          )}
          <Button variant="secondary">
            <a
              href={transaction.paymentProof}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Proof
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
