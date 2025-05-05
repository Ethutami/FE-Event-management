"use client";

import Link from "next/link";
import { Formik, Form, Field, FormikProps } from "formik";
import axios from "axios";
import { useRouter } from "next/navigation";

import RegisterSchema from "./schema";
import IRegister from "./type";

export default function RegisterForm() {
  const router = useRouter();
  const initialValues: IRegister = {
    email: "",
    first_name: "",
    last_name: "",
    referral_code: "",
    role: "",
    password: "",
  };

  const register = async (values: IRegister) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/users?email=${values.email}`
      );

      const user = data.data;

      if (user) throw new Error("Email sudah terdaftar");

      await axios.post("http://localhost:8080/auth/register", values);

      alert("Register Success");

      router.push("/signin");
    } catch (err) {
      alert((err as any).message);
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={RegisterSchema}
        onSubmit={(values, { resetForm }) => {
          register(values);
          resetForm();
        }}
      >
        {(props: FormikProps<IRegister>) => {
          const { values, handleChange, touched, errors } = props;

          return (
            <Form className="bg-[#F9F7F7] p-8 rounded-lg shadow-md w-[500px] max-w-md my-3">
              <h1 className="text-2xl font-bold mb-6 text-[#112D4E]">
                Get started now
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
                  type="text"
                  name="first_name"
                  onChange={handleChange}
                  value={values.first_name}
                  placeholder="First Name"
                  className="w-full p-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#DBE2EF] placeholder-[#DBE2EF]"
                />
                {touched.first_name && errors.first_name ? (
                  <div className="text-red-500">{errors.first_name}</div>
                ) : null}
              </div>
              <div className="mb-4">
                <Field
                  type="text"
                  name="last_name"
                  onChange={handleChange}
                  value={values.last_name}
                  placeholder="Last Name"
                  className="w-full p-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#DBE2EF] placeholder-[#DBE2EF]"
                />
                {touched.last_name && errors.last_name ? (
                  <div className="text-red-500">{errors.last_name}</div>
                ) : null}
              </div>
              <div className="mb-4">
                <Field
                  type="text"
                  name="referral_code"
                  onChange={handleChange}
                  value={values.referral_code}
                  placeholder="Referral Code (optional)"
                  className="w-full p-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#DBE2EF] placeholder-[#DBE2EF]"
                />
                {touched.referral_code && errors.referral_code ? (
                  <div className="text-red-500">{errors.referral_code}</div>
                ) : null}
              </div>
              <div className="mb-4">
                <select
                  name="role"
                  onChange={handleChange}
                  value={values.role}
                  className="w-full p-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#DBE2EF] placeholder-[#DBE2EF]"
                >
                  <option value="" disabled>
                    Select a role
                  </option>
                  <option value="customer">Event Attendee</option>
                  <option value="organizer">Event Organizer</option>
                </select>
                {touched.role && errors.role ? (
                  <div className="text-red-500">{errors.role}</div>
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
              <div className="mb-4 flex items-center">
                <input
                  type="checkbox"
                  id="terms"
                  className="h-4 w-4 text-[#DBE2EF] border-gray-300 rounded"
                />
                <label htmlFor="terms" className="ml-2 text-sm text-[#112D4E]">
                  I agree to the{" "}
                  <a href="#" className="text-[#3F72AF] underline">
                    terms and conditions
                  </a>
                </label>
              </div>
              <button
                type="submit"
                className="w-full p-4 rounded-lg bg-[#112D4E] text-white font-bold hover:bg-[#3F72AF] focus:outline-none focus:ring-2 focus:ring-[#DBE2EF]"
              >
                Sign Up
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
                  Sign Up with Google
                </button>
              </div>
              <p className="text-center mt-4 text-[#112D4E]">
                Have an account?{" "}
                <Link href="/signin" className="text-[#3F72AF] underline">
                  Sign in
                </Link>
              </p>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
