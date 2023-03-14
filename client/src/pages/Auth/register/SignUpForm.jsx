import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import FacebookLogin from "react-facebook-login";
import { FcGoogle } from "react-icons/fc";

const SignUpForm = () => {
  const responseFacebook = (response) => {
    console.log(response);
  };
  // FORMIK
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Please do not leave any spaces in the form."),
      lastName: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Please do not leave any spaces in the form."),
      email: Yup.string()
        .email("Invalid email address")
        .required("Please do not leave any spaces in the form."),
      password: Yup.string()
        .min(8, "Minimun be 8 characters")
        .required("Please do not leave any spaces in the form."),
    }),
    onSubmit: (values) => {},
  });
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => console.log(tokenResponse),
  });
  return (
    <div className="w-full  h-screen flex  flex-col justify-center items-center bg-[#1a1a1a]">
      <img src="./assets/logo.png" alt="" className="h-16 rounded-lg" />
      <form
        className="flex flex-col border w-3/12  rounded-md p-4 shadow-md bg-[#2e2d2d] text-white"
        onSubmit={formik.handleSubmit}
      >
        <label htmlFor="firstName" className="font-semibold">
          First Name
        </label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.firstName}
          className="rounded-md p-1 text-black font-semibold"
        />
        {formik.touched.firstName && formik.errors.firstName ? (
          <div className="text-red-400">{formik.errors.firstName}</div>
        ) : null}
        <label htmlFor="lastName" className="font-semibold">
          Last Name
        </label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.lastName}
          className="rounded-md p-1 text-black font-semibold"
        />
        {formik.touched.lastName && formik.errors.lastName ? (
          <div className="text-red-400">{formik.errors.lastName}</div>
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
            <button
              onClick={login}
              className="flex gap-2 bg-gray-100 text-black font-semibold  p-3 px-5 rounded-md border border-black hover:text-orange-400 items-center hover:bg-stone-100 duration-300 w-full justify-center"
            >
              <FcGoogle className="text-3xl" /> Sing In
            </button>
          </div>
          <div className="h-14 border border-black overflow-hidden rounded-md flex items-center w-5/12  relative ">
            <FacebookLogin
              appId={import.meta.env.VITE_FACE_APP_ID}
              autoLoad={true}
              width="300"
              fields="name,email,picture"
              callback={responseFacebook}
              textButton="Sing In with Facebook"
            />
            <div className="absolute w-full h-full bg-black"></div>
          </div>
        </div>
        {/* AUTH */}
        <button type="submit" className="p-3 mt-4 bg-fuchsia-900 rounded-md">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
