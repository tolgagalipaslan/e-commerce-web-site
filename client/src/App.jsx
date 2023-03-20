import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import routes from "./routes/Router";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { getUserBasket } from "./store/basket";
import { client } from "./utils/client";
import { useDispatch, useSelector } from "react-redux";
const App = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const query = `*[_type == "user" && subId == "${user.userId}"][0]`;
    client.fetch(query).then((res) => dispatch(getUserBasket(res.basket)));
  }, [dispatch, user.userId]);
  const routeComponents = routes.map(({ path, component }, key) => (
    <Route key={key} path={path} element={component} />
  ));

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_API_TOKEN}>
      <BrowserRouter>
        <Navbar />
        <Routes>{routeComponents}</Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
};

export default App;
