import { createBrowserRouter } from "react-router-dom";
import Root from "./../Layout/Root";
import NotFound from "../Pages/ErrorPage/NotFound";
import Home from "./../Pages/Home/Home";
import Login from "./../Pages/Login/Login";
import Register from "./../Pages/Register/Register";
import AllFoods from "../Pages/AllFoods/AllFoods";
import SingleFood from "../Pages/SingleFood.jsx/SingleFood";
import Purchase from "../Pages/Purchase/Purchase";
import AddFood from "../Pages/AddFood/AddFood";
import MyFoods from "../Pages/MyAdded/MyFoods";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import UpdateFood from "../Pages/UpdateFood/UpdateFood";
import MyPurchases from "../Pages/MyPurchases/MyPurchases";
import Gallery from "../Pages/Gallery/Gallery";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <NotFound></NotFound>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/allFoods",
        element: <AllFoods></AllFoods>,
      },
      {
        path: "/gallery",
        element: <Gallery></Gallery>,
      },
      {
        path: "/food/:id",
        element: <SingleFood></SingleFood>,
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/food/${params.id}`),
      },
      {
        path: "/addedFoods",
        element: (
          <PrivateRoute>
            <MyFoods></MyFoods>
          </PrivateRoute>
        ),
      },
      {
        path: "/purchase/:id",
        element: (
          <PrivateRoute>
            <Purchase></Purchase>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/food/${params.id}`),
      },
      {
        path: "/purchasedFoods",
        element: (
          <PrivateRoute>
            <MyPurchases></MyPurchases>
          </PrivateRoute>
        ),
      },

      {
        path: "/add-food",
        element: (
          <PrivateRoute>
            <AddFood></AddFood>
          </PrivateRoute>
        ),
      },
      {
        path: "/updateFood/:id",
        element: (
          <PrivateRoute>
            <UpdateFood></UpdateFood>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/food/${params.id}`),
      },

      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
]);

export default router;
