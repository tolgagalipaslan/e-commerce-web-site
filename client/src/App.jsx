import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import routes from "./routes/Router";
import { GoogleOAuthProvider } from "@react-oauth/google";
const App = () => {
  const routeComponents = routes.map(({ path, component }, key) => (
    <Route key={key} path={path} element={component} />
  ));
  console.log(import.meta.env.VITE_GOOGLE_API_TOKEN);
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
