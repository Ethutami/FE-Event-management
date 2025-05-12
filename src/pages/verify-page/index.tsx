"use client";

import { useEffect } from "react";
import axios from "axios";
import { API_URL } from "@/config";

export default function VerifyPage() {
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");

        if (token) {
          const response = await axios.patch(`${API_URL}/api/auth/verify`, {
            token,
          });
          console.log("Success:", response.data);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    verifyToken();
  }, []);

  return (
    <div>
      <h1>Email Verified Successfully</h1>
      <p>Your email has been verified. You can now log in to your account.</p>
      <a href="/signin">Proceed to Login</a>
    </div>
  );
}
