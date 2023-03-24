import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { client } from "../../utils/client";
import { RxCross2 } from "react-icons/rx";
import { ImSpinner2 } from "react-icons/im";
import { uid } from "uid";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleProduct } from "../../helpers/Api";
import LoadingModal from "../../components/LoadingModal";
import EditForm from "./components/EditForm";
const Edit = () => {
  const [data, setData] = useState({});
  const params = useParams();
  const user = useSelector((state) => state.auth.user);
  const [looding, setLooding] = useState(true);
  const navigate = useNavigate();
  // UPLOAD IMAGE
  useEffect(() => {
    getSingleProduct(params.id).then((res) => {
      setData(res);
      if (user.userId !== res.sellingBy._ref) {
        navigate("/");
      }
      setLooding(false);
    });
  }, [navigate, params.id, user.userId]);

  return <div>{looding ? <LoadingModal /> : <EditForm data={data} />}</div>;
};

export default Edit;
