"use client";

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { onLogin } from "@/store/slice/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { IAuth, IUser } from "@/interfaces/auth.interface";
import { Field, Form, Formik, FormikProps } from "formik";
import { IProfile } from "./type";
import EditProfileSchema from "./schema";
import { getCookie } from "cookies-next";
import { API_URL } from "@/config";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function EditProfileForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [isEditMode, setIsEditMode] = useState(false);

  const initialValues: IProfile = {
    email: "",
    first_name: "",
    last_name: "",
  };

  // Retrieve user data from the cookie on component mount
  useEffect(() => {
    const token = getCookie("access_token") as string;
    if (token) {
      const user = jwtDecode<IUser>(token); // Decode the JWT to get user data
      const userState: IAuth = {
        user: {
          id: user.id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          role: user.role,
          referral_code: user.referral_code,
          profile_picture: user.profile_picture,
        },
        isLogin: true,
      };
      dispatch(onLogin(userState)); // Update Redux state with transformed user data
    }
  }, [dispatch]);

  // Access the user state from the Redux store using the custom hook
  const user = useAppSelector((state) => state.auth.user);

  const updateProfile = async (values: IProfile) => {
    try {
      const token = getCookie("access_token") as string;
      await axios.put(`${API_URL}/api/users/${user.id}`, values, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert("Update Profile Success");

      setIsEditMode(false);
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
      <Formik
        initialValues={initialValues}
        validationSchema={EditProfileSchema}
        onSubmit={(values) => {
          updateProfile(values);
        }}
      >
        {(props: FormikProps<IProfile>) => {
          const { values, handleChange, touched, errors } = props;

          return (
            <Form className="bg-gray-100 font-sans">
              {/* <!-- User Information Section --> */}
              <div className="p-6 grid grid-cols-2 grid-rows-2 gap-5">
                <div className="mb-4">
                  <label className="block text-[#112D4E] text-sm font-medium mb-1">
                    First Name
                  </label>
                  {isEditMode ? (
                    <>
                      <Field
                        type="text"
                        name="first_name"
                        value={values.first_name}
                        readOnly={!isEditMode}
                        onChange={handleChange}
                        className={
                          "w-[400px] p-2 bg-[#F9F9F9] border border-color-gray"
                        }
                      />
                      {touched.first_name && errors.first_name ? (
                        <div className="text-red-500">{errors.first_name}</div>
                      ) : null}
                    </>
                  ) : (
                    <div className="w-[400px] p-2 bg-[#F9F9F9]">
                      <p className="text-gray-400">{user.first_name}</p>
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-[#112D4E] text-sm font-medium mb-1">
                    Last Name
                  </label>
                  {isEditMode ? (
                    <>
                      <Field
                        type="text"
                        name="last_name"
                        value={values.last_name}
                        readOnly={!isEditMode}
                        onChange={handleChange}
                        className={
                          "w-[400px] p-2 bg-[#F9F9F9] border border-color-gray"
                        }
                      />
                      {touched.last_name && errors.last_name ? (
                        <div className="text-red-500">{errors.last_name}</div>
                      ) : null}
                    </>
                  ) : (
                    <div className="w-[400px] p-2 bg-[#F9F9F9]">
                      <p className="text-gray-400">{user.last_name}</p>
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-[#112D4E] text-sm font-medium mb-1">
                    Email
                  </label>
                  {isEditMode ? (
                    <>
                      <Field
                        type="email"
                        name="email"
                        value={values.email}
                        readOnly={!isEditMode}
                        onChange={handleChange}
                        className={
                          "w-[400px] p-2 bg-[#F9F9F9] border border-color-gray"
                        }
                      />
                      {touched.email && errors.email ? (
                        <div className="text-red-500">{errors.email}</div>
                      ) : null}
                    </>
                  ) : (
                    <div className="w-[400px] p-2 bg-[#F9F9F9]">
                      <p className="text-gray-400">{user.email}</p>
                    </div>
                  )}
                </div>

                <div className="mb-6">
                  <label className="block text-[#112D4E] text-sm font-medium mb-1">
                    Referral Code
                  </label>
                  <div className="w-[400px] p-2 bg-[#F9F9F9]">
                    <p className="text-gray-400">{user.referral_code}</p>
                  </div>
                </div>

                {isEditMode ? (
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="w-[175px] h-[50px] p-2 bg-[#112D4E] text-white font-medium rounded-md hover:bg-[#FFCB00]"
                    >
                      Save Information
                    </button>
                    <button
                      className="w-[175px] h-[50px] p-2 bg-[#FFCB00] text-white font-medium rounded-md hover:bg-[#112D4E]"
                      onClick={() => setIsEditMode(false)}
                    >
                      Discard Changes
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <button
                      className="w-[175px] h-[50px] p-2 bg-[#112D4E] text-white font-medium rounded-md hover:bg-[#FFCB00]"
                      onClick={() => setIsEditMode(true)}
                    >
                      Edit Information
                    </button>
                    <button
                      className="w-[175px] h-[50px] p-2 bg-red-400 text-white font-medium rounded-md hover:bg-[#FFCB00]"
                      onClick={() => router.push("/reset-password")}
                    >
                      Change Password
                    </button>
                  </div>
                )}
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
