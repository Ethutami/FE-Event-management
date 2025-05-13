"use client"

import { API_URL } from "@/config";
import { IAuth, IUser } from "@/interfaces/auth.interface";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { onLogin } from "@/store/slice/authSlice";
import axios from "axios";
import { getCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const dispatch = useAppDispatch();
  const token = getCookie("access_token") as string;

  async function getUser() {
    if (token) {
      const user = jwtDecode<IUser>(token); // Decode the JWT to get user data
      const userState: IAuth = {
        user: {
          id: user.id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          role: user.role,
          profile_picture: user.profile_picture,
        },
        isLogin: true,
      };
      dispatch(onLogin(userState)); // Update Redux state with transformed user data
    }
  }

  // Access the user state from the Redux store using the custom hook
  const user = useAppSelector((state) => state.auth.user);
  console.log(user.id);

  async function fetchTransactions() {
    try {
      const { data } = await axios.get(
        `${API_URL}/api/transactions/56`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data.data);
      setTransactions(data.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getUser();
    fetchTransactions();
  }, []);
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Transaction Management</h1>
      <div>
        {transactions?.map((transaction) => (
          <div key={transaction.id}>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-3 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900">
                    {transaction.status}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {transaction.event_id}
                  </p>
                </div>
                <span className="font-semibold">
                  Rp.16.000
                </span>
              </div>

              <div className="flex justify-between mt-2 text-sm text-gray-500">
                <span>{transaction.payment_date}</span>
                {transaction.payment_method && (
                  <span>• {transaction.payment_method}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
