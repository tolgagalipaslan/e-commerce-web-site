import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { client } from "../../../utils/client";
import { RxCross2 } from "react-icons/rx";
import { ImSpinner2 } from "react-icons/im";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
const EditForm = ({ data }) => {
  const [productPhotos, setProductPhotos] = useState(data.picture);
  const [mainPic, setMainPic] = useState(data.picture[0] || "");
  const user = useSelector((state) => state.auth.user);
  const [looding, setLooding] = useState(false);
  const navigate = useNavigate();
  // UPLOAD IMAGE

  const uploadImage = (e) => {
    setLooding(true);

    const selectedFile = e.target.files[0];
    const fileTypes = ["image/png", "image/jpeg", "image/webm"];
    if (fileTypes.includes(selectedFile.type)) {
      if (productPhotos?.length !== 4) {
        client.assets
          .upload("image", selectedFile, {
            contentType: "image/png",
            filename: "someText.png",
          })
          .then((document) => {
            setProductPhotos([...productPhotos, document.url]);
            setLooding(false);
          })
          .catch((error) => {
            console.error("Upload Failed", error.message);
            setLooding(false);
          });
      } else {
        errorForm("Thats a lot of picture !!");
        setLooding(false);
      }
    } else {
      errorForm("Wrong type");
      setLooding(false);
    }
  };

  //delete Image
  const deletePhoto = (e, picture) => {
    const newPhotoList = productPhotos;
    setProductPhotos(newPhotoList.filter((item) => item !== picture));
  };

  const formik = useFormik({
    initialValues: {
      caption: data.caption,
      price: data.price,
      topic: data.topic,
      description: data.description,
      pictures: "",
      brand: data.brand,
      stock: data.stock,
    },
    validationSchema: Yup.object({
      caption: Yup.string().required(
        "Please do not leave any spaces in the form."
      ),
      price: Yup.string().required(
        "Please do not leave any spaces in the form."
      ),
      topic: Yup.string().required(
        "Please do not leave any spaces in the form."
      ),
      description: Yup.string().required(
        "Please do not leave any spaces in the form."
      ),
      pictures: Yup.string(),
      brand: Yup.string().required(
        "Please do not leave any spaces in the form."
      ),
      stock: Yup.string().required(
        "Please do not leave any spaces in the form."
      ),
    }),
    onSubmit: async (values) => {
      setLooding(true);

      if (productPhotos?.length === 0) {
        errorForm("Have at least 1 picture");
      } else {
        await client
          .patch(data._id)
          .set({
            caption: values.caption,
            price: values.price,
            topic: values.topic,
            description: values.description,
            picture: productPhotos,
            brand: values.brand,
            stock: values.stock,
          })
          .commit();
        formik.resetForm();
        setProductPhotos([]);
        navigate(`/myProducts/${user.userId}`);
      }

      setLooding(false);
    },
  });
  const errorForm = (message) => toast.error(message);
  return (
    <div className=" w-full h-screen pt-5 ">
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
      {/* UPLOAD PHOTO */}
      <div className="w-[1380px]  flex mx-auto">
        <div className="w-2/6 h-[600px]  rounded-md mx-auto flex flex-col justify-around p-1">
          <div className="w-full h-4/6  rounded-md bg-black ">
            {mainPic === "" ? (
              <img
                src="/assets/placeholder.png"
                alt=""
                className="h-full w-full rounded-md opacity-80 "
              />
            ) : (
              <img src={mainPic} alt="" className="h-full w-full rounded-md " />
            )}
          </div>
          <div className="w-full h-1/6  flex justify-center gap-3 items-center">
            {/* PHOTO SHOW */}
            {productPhotos?.map((picture, i) => (
              <div
                key={i}
                className="h-[60px] w-[60px] bg-white  rounded-md relative"
              >
                <img
                  src={picture}
                  alt=""
                  className="h-full w-full  rounded-md"
                  onClick={(e) => {
                    setMainPic(picture);
                  }}
                />
                <div
                  className="absolute top-0 right-0 rounded-full hover:bg-[#1a1a1a] hover:text-white"
                  onClick={(e) => {
                    deletePhoto(e, picture);
                    setMainPic("");
                  }}
                >
                  <RxCross2 className="text-xl" />
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* FORMIK */}
        <div className="w-3/6 h-[600px]  mx-auto items-center justify-center rounded-md">
          <form
            className="grid grid-cols-2 gap-2 h-full p-2 shadow-md bg-lightGray  rounded-md  w-full  border border-gray-400 "
            onSubmit={formik.handleSubmit}
          >
            <div className="flex flex-col gap-2">
              <label
                htmlFor="caption"
                className="border-b font-semibold border-black"
              >
                Caption
              </label>
              <input
                id="caption"
                name="caption"
                type="caption"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.caption}
                className="h-[40px] outline-none border border-black  rounded-md p-1 text-white bg-[#1a1a1a]"
              />
              {formik.touched.caption && formik.errors.caption ? (
                <div className="text-red-400">{formik.errors.caption}</div>
              ) : null}
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="price"
                className="border-b font-semibold border-black"
              >
                Price
              </label>
              <input
                id="price"
                name="price"
                type="price"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.price}
                className="h-[40px] outline-none border  border-black rounded-md p-1 text-white bg-[#1a1a1a]"
              />
              {formik.touched.price && formik.errors.price ? (
                <div className="text-red-400">{formik.errors.price}</div>
              ) : null}
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="topic"
                className="border-b font-semibold border-black"
              >
                Topic
              </label>
              <input
                id="topic"
                name="topic"
                type="topic"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.topic}
                className="h-[40px] outline-none border border-black  rounded-md p-1 text-white bg-[#1a1a1a]"
              />
              {formik.touched.topic && formik.errors.topic ? (
                <div className="text-red-400">{formik.errors.topic}</div>
              ) : null}
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="description"
                className="border-b font-semibold border-black"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                type="description"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
                className="h-[40px] outline-none border border-black  rounded-md p-1 text-white bg-[#1a1a1a]"
              />
              {formik.touched.description && formik.errors.description ? (
                <div className="text-red-400">{formik.errors.description}</div>
              ) : null}
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="pictures"
                className="border-b font-semibold border-black"
              >
                Pictures
              </label>
              <input
                id="pictures"
                name="pictures"
                type="file"
                onChange={(e) => {
                  formik.handleChange(e);
                  uploadImage(e);
                }}
                onBlur={formik.handleBlur}
                value={formik.values.pictures}
                className="h-[40px] outline-none border border-black  rounded-md p-1 text-white bg-[#1a1a1a]"
              />
              {formik.touched.pictures && formik.errors.pictures ? (
                <div className="text-red-400">{formik.errors.pictures}</div>
              ) : null}
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="brand"
                className="border-b font-semibold border-black"
              >
                Brand
              </label>
              <input
                id="brand"
                name="brand"
                type="brand"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.brand}
                className="h-[40px] outline-none border border-black  rounded-md p-1 text-white bg-[#1a1a1a]"
              />
              {formik.touched.brand && formik.errors.brand ? (
                <div className="text-red-400">{formik.errors.brand}</div>
              ) : null}
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="Stock"
                className="border-b font-semibold border-black"
              >
                Stock
              </label>
              <input
                id="stock"
                name="stock"
                type="stock"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.stock}
                className="h-[40px] outline-none border border-black  rounded-md p-1 text-white bg-[#1a1a1a]"
              />
              {formik.touched.stock && formik.errors.stock ? (
                <div className="text-red-400">{formik.errors.stock}</div>
              ) : null}
            </div>

            <button
              className="bg-[#ccf143] border-black  border rounded-md  text-black h-[40px] font-semibold text-lg p-1 mt-6  flex justify-center items-center  "
              type="submit"
              disabled={looding}
            >
              {looding ? <ImSpinner2 className="animate-spin" /> : "Create"}
            </button>
          </form>
        </div>
      </div>{" "}
    </div>
  );
};

export default EditForm;
