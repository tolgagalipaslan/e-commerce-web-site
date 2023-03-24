import {
  Home,
  Login,
  Register,
  MyProducts,
  CreateProducts,
  ProductDetails,
  Basket,
  BuymentHistory,
  Edit,
  Search,
} from "../pages";

const routes = [
  { path: "/", component: <Home /> },
  { path: "/login", component: <Login /> },
  { path: "/register", component: <Register /> },
  { path: "/myproducts/:id", component: <MyProducts /> },
  { path: "/createproducts", component: <CreateProducts /> },
  { path: "/productDetails/:id", component: <ProductDetails /> },
  { path: "/basket", component: <Basket /> },
  { path: "/buymentHistory", component: <BuymentHistory /> },
  { path: "/edit/:id", component: <Edit /> },
  { path: "/search/:searchQuery", component: <Search /> },
];

export default routes;
