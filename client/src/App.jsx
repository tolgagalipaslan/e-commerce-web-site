import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import routes from "./routes/Router";
const App = () => {
  const routeComponents = routes.map(({ path, component }, key) => (
    <Route key={key} path={path} element={component} />
  ));
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>{routeComponents}</Routes>
    </BrowserRouter>
  );
};

export default App;
