import { Home, Login, Register, MyProducts, CreateProducts } from "../pages";

const routes = [
  { path: "/", component: <Home /> },
  { path: "/login", component: <Login /> },
  { path: "/register", component: <Register /> },
  { path: "/myproducts/:id", component: <MyProducts /> },
  { path: "/createproducts/:id", component: <CreateProducts /> },
];

export default routes;
