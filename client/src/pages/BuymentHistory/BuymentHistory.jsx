import React, { useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getSingleUser } from "../../helpers/Api";
import ProductCard from "./components/ProductCard";
import { useSelector } from "react-redux";
const BuymentHistory = () => {
  const [userData, setUserData] = useState();

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    getSingleUser(user.userId).then((res) => {
      setUserData(res);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
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
        theme="dark"
      />
      {userData?.buymentStory?.length === 0 ? (
        <div className="w-full h-[88vh] flex justify-center items-center">
          <h1 className="text-4xl text-gray-500 font-semibold opacity-70 ">
            Your History Is Empty ! :(
          </h1>
        </div>
      ) : (
        <div className="w-[1380px] flex  gap-5 mx-auto p-2 relative">
          <div className=" w-5/6 flex flex-col gap-5 mx-auto p-2">
            {userData?.buymentStory?.map((basket, i) => (
              <ProductCard key={i} basket={basket} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BuymentHistory;
