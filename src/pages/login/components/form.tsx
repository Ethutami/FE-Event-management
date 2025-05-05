"use client"

import { Formik, Form, Field, FormikProps } from "formik";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

import sign from "jwt-encode";
import { setCookie } from "cookies-next";

import LoginSchema from "./schema";
import ILogin from "./type";
import { onLogin } from "@/lib/redux/features/authSlice";
import { useAppDispatch } from "@/lib/redux/hooks";

export default function LoginForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const initialValues: ILogin = {
    email: "",
    password: "",
  };

  const login = async (values: ILogin) => {
    try {
      const { data } = await axios.post("http://localhost:8080/auth/login", {
        email: values.email,
        password: values.password,
      });

      const { user } = data.data;

      console.log(user.email);

      const stateUser = {
        user: {
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          role: user.role,
        },
        isLogin: true,
      };

      const token = sign(stateUser, "test");

      setCookie("access_token", token);
      dispatch(onLogin(stateUser));

      alert("Login Success");
      router.push("/main");
    } catch (err) {
      alert((err as any).message);
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
              <div className="flex gap-4 mt-4 mb-4">
                <button className="flex-1 flex items-center justify-center border border-gray-300 py-2 rounded-lg hover:bg-[#DBE2EF] text-[#112D4E]">
                  <img
                    src="/google-icon.svg"
                    alt="Google"
                    className="h-5 w-5 mr-2"
                    width={100}
                    height={100}
                  />
                  Sign In with Google
                </button>
              </div>
              <p className="text-center mt-4 text-[#112D4E]">
                Don't have an account?{" "}
                <Link href="/signup" className="text-[#3F72AF] underline">
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
