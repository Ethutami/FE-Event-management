"use client";

import axios from "axios";
import { Formik, Form, Field, FormikProps } from "formik";
import { API_URL } from "@/config";
import IResetPassword from "./type";
import { useRouter } from "next/navigation";
import ResetPasswordSchema from "./schema";

export default function ResetPasswordForm() {
  const router = useRouter();
  const initialValues: IResetPassword = {
    new_password: "",
    confirm_password: "",
  };

  const ResetPassword = async (values: IResetPassword) => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");

      if (values.new_password !== values.confirm_password) throw new Error("Please enter your password again corectly");

      await axios.patch(
        `${API_URL}/api/auth/reset`,
        {
          new_password: values.new_password,
          token
        },
      );

      alert("Reset Password Success");

      router.push("/signin")
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const errorMessage = err.response.data.message;
        alert(`${errorMessage}`);
      } else {
        alert(err);
      }
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={ResetPasswordSchema}
        onSubmit={(values, { resetForm }) => {
          ResetPassword(values);
          resetForm();
        }}
      >
        {(props: FormikProps<IResetPassword>) => {
          const { values, handleChange, touched, errors } = props;

          return (
            <Form className="bg-[#F9F7F7] p-8 rounded-lg shadow-md w-[500px] max-w-md">
              <h1 className="text-2xl font-bold mb-6 text-[#112D4E]">
                Reset Password
              </h1>
              <div className="mb-4">
                <Field
                  type="password"
                  name="new_password"
                  onChange={handleChange}
                  value={values.new_password}
                  placeholder="Enter Your New Password"
                  className="w-full p-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#DBE2EF] placeholder-[#DBE2EF]"
                  required
                />
                {touched.new_password && errors.new_password ? (
                  <div className="text-red-500">{errors.new_password}</div>
                ) : null}
              </div>
              <div className="mb-4">
                <Field
                  type="password"
                  name="confirm_password"
                  onChange={handleChange}
                  value={values.confirm_password}
                  placeholder="Enter Your Password Again"
                  className="w-full p-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#DBE2EF] placeholder-[#DBE2EF]"
                />
                {touched.confirm_password && errors.confirm_password ? (
                  <div className="text-red-500">{errors.confirm_password}</div>
                ) : null}
              </div>

              <button
                type="submit"
                className="w-full p-4 rounded-lg bg-[#112D4E] text-white font-bold hover:bg-[#3F72AF] focus:outline-none focus:ring-2 focus:ring-[#DBE2EF]"
              >
                Submit
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
