"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
import { API_URL } from "@/config";
import TransactionModal from "@/components/showTransaction.modal";

export default function TransactionsPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [transactions, setTransactions] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedTransaction, setSelectedTransaction] = useState<any | null>(
    null
  );
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const organizerId = urlParams.get("id");
        const token = getCookie("access_token") as string;

        const { data } = await axios.get(
          `${API_URL}/api/transactions/organizer/${organizerId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Sort transactions to show undone first
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const sortedTransactions = data.data.sort((a: any, b: any) => {
          if (a.status === "done" && b.status !== "done") return 1;
          if (a.status !== "done" && b.status === "done") return -1;
          return 0;
        });

        setTransactions(sortedTransactions);
      } catch (err) {
        console.error("Error fetching transactions:", err);
      }
    };

    fetchTransactions();
  }, []);

  const handleTransactionClick = async (transactionId: string) => {
    try {
      const token = getCookie("access_token") as string;
      const { data } = await axios.get(
        `${API_URL}/api/transactions/detail/${transactionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSelectedTransaction(data.data[0]);
      setShowModal(true);
      console.log(data.data[0]);
    } catch (err) {
      console.error("Error fetching transaction details:", err);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Transaction Management</h1>

      <div>
        {transactions?.map((transaction) => (
          <div
            key={transaction.id}
            onClick={() => handleTransactionClick(transaction.id)}
          >
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-3 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h3
                    className={`font-medium text-center capitalize rounded-2xl p-2 mb-3 ${
                      transaction.status === "done"
                        ? "bg-green-400 text-white"
                        : "bg-red-400 text-white"
                    }`}
                  >
                    {transaction.status}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Event ID: {transaction.event_id}
                  </p>
                  <p className="text-sm text-gray-500">
                    Transaction ID: {transaction.id}
                  </p>
                </div>
                <span className="font-semibold">
                  Rp.
                  {(
                    transaction.ticket_quantity * transaction.events.price
                  ).toLocaleString("id-ID")}
                </span>
              </div>

              <div className="flex justify-between mt-2 text-sm text-gray-500">
                <span>
                  {new Date(transaction.payment_date).toLocaleDateString(
                    "id-ID"
                  )}
                </span>
                {transaction.payment_method && (
                  <span>• {transaction.payment_method}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedTransaction && (
        <TransactionModal
          isVisible={showModal}
          onClose={() => setShowModal(false)}
          transaction={selectedTransaction}
        />
      )}
    </div>
  );
}
