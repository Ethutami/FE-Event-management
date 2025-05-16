"use client"

import axios from "axios";
import { Formik, Form, Field, FormikProps } from "formik";
import { API_URL } from "@/config";
import { IVerifyReset } from "./type";
import { useState } from "react";
import VerifyResetSchema from "./schema";

export default function ResetVerificationForm() {
  const [isSubmit, setIsSubmit] = useState(false);

  const initialValues: IVerifyReset = {
    email: "",
  };

  const VerifyReset = async (values: IVerifyReset) => {
    try {
      await axios.post(`${API_URL}/api/auth/resetverify`, {
        email: values.email,
      });
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const errorMessage = err.response.data.message;
        alert(`${errorMessage}`);
      } else {
        alert("An unexpected error occurred");
      }
    }
  };

  return (
    <div>
      {!isSubmit && (
        <Formik
          initialValues={initialValues}
          validationSchema={VerifyResetSchema}
          onSubmit={(values, { resetForm }) => {
            VerifyReset(values);
            resetForm();
            setIsSubmit(true);
          }}
        >
          {(props: FormikProps<IVerifyReset>) => {
            const { values, handleChange, touched, errors } = props;

            return (
              <Form className="bg-[#F9F7F7] p-8 rounded-lg shadow-md w-[500px] max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-[#112D4E]">
                  We need to verify it&apos;s you
                </h1>
                <div className="mb-4">
                  <Field
                    type="email"
                    name="email"
                    onChange={handleChange}
                    value={values.email}
                    placeholder="Your registered email"
                    className="w-full p-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#DBE2EF] placeholder-[#DBE2EF]"
                    required
                  />
                  {touched.email && errors.email ? (
                    <div className="text-red-500">{errors.email}</div>
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
      )}
      {isSubmit && (
        <div className="bg-[#F9F7F7] p-16 rounded-lg shadow-md w-[750px] h-[250px] mx-auto mt-16">
          <h1 className="text-3xl text-center font-bold mb-6 text-[#112D4E]">
            Hello There!
          </h1>
          <p className="text-xl text-center font-bold">
            We&apos;ve sent a link to reset your password,
          </p>
          <p className="text-xl text-center font-bold">
            Please kindly check your email.
          </p>
        </div>
      )}
    </div>
  );
}
