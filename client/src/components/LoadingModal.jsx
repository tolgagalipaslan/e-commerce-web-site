import React from "react";
import { ImSpinner2 } from "react-icons/im";

const LoadingModal = () => {
  return (
    <div className="w-screen h-screen backdrop-blur-md  fixed z-[999] top-0 left-0 flex items-center justify-center">
      <div className="w-[400px] h-28  bg-white rounded-md flex  flex-col justify-center items-center  shadow-lg">
        <ImSpinner2 className="animate-spin text-orange-600 text-3xl" />
        <h1 className="font-semibold border-b">
          Please wait, the process continues
        </h1>
      </div>
    </div>
  );
};

export default LoadingModal;
