import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./home";
import EditProduct from "./product/EditProduct";
import AddProduct from "./product/AddProduct";
import { withTranslation } from "react-i18next";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/:itemCode",
    element: <EditProduct />,
  },
  {
    path: "/create",
    element: <AddProduct />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default withTranslation()(App);
