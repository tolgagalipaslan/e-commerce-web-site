import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { GoogleLogin } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import { googleAuth, register } from "../../../store/auth";
import { client } from "../../../utils/client";
import LoadingModal from "../../../components/LoadingModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const SignUpForm = () => {
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);
  const user = useSelector((state) => state.auth.user);
  // FORMIK

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
      email: "",
    },
    validationSchema: Yup.object({
      userName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Please do not leave any spaces in the form."),

      email: Yup.string()
        .email("Invalid email address")
        .required("Please do not leave any spaces in the form."),
      password: Yup.string()
        .min(8, "Minimun be 8 characters")
        .required("Please do not leave any spaces in the form."),
    }),
    onSubmit: async (values) => {
      const query = `*[_type == "user" && email == "${values.email}"][0]`;
      setloading(true);
      const res = await client.fetch(query);
      dispatch(
        register({
          name: values.userName,
          email: values.email,
          password: values.password,
          res,
        })
      );
      if (!user.userName) {
        error("Email already exist !");
      }
      setloading(false);
    },
  });
  const error = (message) => toast.error(message);

  return (
    <div className="w-full  h-screen flex  flex-col justify-center items-center bg-[#1a1a1a]">
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <img src="./assets/logo.png" alt="" className="h-16 rounded-lg" />
      <form
        className="flex flex-col border w-3/12  rounded-md p-4 shadow-md bg-[#2e2d2d] text-white"
        onSubmit={formik.handleSubmit}
      >
        <label htmlFor="userName" className="font-semibold">
          User Name
        </label>
        <input
          id="userName"
          name="userName"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.userName}
          className="rounded-md p-1 text-black font-semibold"
        />
        {formik.touched.userName && formik.errors.userName ? (
          <div className="text-red-400">{formik.errors.userName}</div>
        ) : null}

        <label htmlFor="email" className="font-semibold">
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className="rounded-md p-1 text-black font-semibold"
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="text-red-400">{formik.errors.email}</div>
        ) : null}
        <label htmlFor="password" className="font-semibold">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          className="rounded-md p-1  text-black font-semibold"
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="text-red-400">{formik.errors.password}</div>
        ) : null}
        <div className="flex items-center gap-2 ">
          <div className="h-[1px] w-full bg-white"></div>
          <div className="text-md font-semibold text-gray-400">OR</div>
          <div className="h-[1px] w-full bg-white"></div>
        </div>
        {/* AUTH */}
        <div className="flex  justify-around gap-2">
          <div className="w-5/12 ">
            <GoogleLogin
              size="medium"
              width="200"
              height="56"
              text="signin"
              onSuccess={(credentialResponse) => {
                dispatch(googleAuth(credentialResponse));
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </div>
        </div>
        {/* AUTH */}
        <button type="submit" className="p-3 mt-4 bg-fuchsia-900 rounded-md">
          Submit
        </button>
      </form>
      {loading ? <LoadingModal /> : null}
    </div>
  );
};

export default SignUpForm;
