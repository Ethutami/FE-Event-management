"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { Formik, Form, Field, FormikProps } from "formik";
import { API_URL } from "@/config";
import { onLogin } from "@/store/slice/authSlice";
import { useAppDispatch } from "@/store/hooks";
import ILogin from "./type";
import LoginSchema from "./schema";
import { useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [error, setError] = useState("");

  const initialValues: ILogin = {
    email: "",
    password: "",
  };

  const login = async (values: ILogin) => {
    try {
      const { data } = await axios.post(
        `${API_URL}/api/auth/login`,
        {
          email: values.email,
          password: values.password,
        },
        { withCredentials: true }
      );

      const user = data.data;

      const stateUser = {
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

      dispatch(onLogin(stateUser));

      alert("Login Success");

      if (user.role == "organizer") {
        router.push(`/dashboard?id=${user?.id}`);
      } else {
        router.push("/");
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const errorMessage = err.response.data.message;
        alert(`${errorMessage}`);
        setError(errorMessage);
      } else {
        alert("An unexpected error occurred");
      }
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={(values, { resetForm }) => {
          login(values);
          resetForm();
        }}
      >
        {(props: FormikProps<ILogin>) => {
          const { values, handleChange, touched, errors } = props;

          return (
            <Form className="bg-[#F9F7F7] p-8 rounded-lg shadow-md w-[500px] max-w-md my-3">
              <h1 className="text-2xl font-bold mb-6 text-[#112D4E]">
                Welcome Back
              </h1>
              <div className="mb-4">
                <Field
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={values.email}
                  placeholder="Email address"
                  className="w-full p-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#DBE2EF] placeholder-[#DBE2EF]"
                  required
                />
                {touched.email && errors.email ? (
                  <div className="text-red-500">{errors.email}</div>
                ) : null}
              </div>
              {error && (
                <Link
                  href="/reset-verification"
                  className="text-red-400 text-sm hover:text-[#3F72AF] ml-2 "
                >
                  Forgot password?
                </Link>
              )}
              <div className="mb-4">
                <Field
                  type="password"
                  name="password"
                  onChange={handleChange}
                  value={values.password}
                  placeholder="Password"
                  className="w-full p-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#DBE2EF] placeholder-[#DBE2EF]"
                />
                {touched.password && errors.password ? (
                  <div className="text-red-500">{errors.password}</div>
                ) : null}
              </div>

              <button
                type="submit"
                className="w-full p-4 rounded-lg bg-[#112D4E] text-white font-bold hover:bg-[#3F72AF] focus:outline-none focus:ring-2 focus:ring-[#DBE2EF]"
              >
                Sign In
              </button>

              <p className="text-center mt-4 text-[#112D4E]">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="text-[#3F72AF] underline">
                  Sign Up
                </Link>
              </p>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
