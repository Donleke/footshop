import React, { lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Roots from "../components/Roots";
import Spinner from "../utils/Spinner";
import Account from "../pages/Account";
import Checkout from "../pages/Checkout";
import PrivateRoutes from "./PrivateRoutes";
import Checkoutdetails from "../pages/Checkoutdetails";
import Customer from "../pages/Customer";
import Order from "../pages/Order";
import Orderdetail from "../pages/Orderdetail";
const Home = lazy(() => import("../pages/Home"));
const Productdetails = lazy(() => import("../pages/Productdetails"));
const SearchResult = lazy(() => import("../pages/SearchResult"));
const Products = lazy(() => import("../pages/Products"));

const routes = [
  {
    path: "/",
    element: <Roots />,
    children: [
      {
        path: "/",
        element: (
          <React.Suspense fallback={<Spinner />}>
            <Home />
          </React.Suspense>
        ),
      },
      {
        path: "/product/:slug",
        element: (
          <React.Suspense fallback={<Spinner />}>
            <Productdetails />
          </React.Suspense>
        ),
      },
      {
        path: "account",
        element: <Account />,
      },
      {
        path: "search",
        element: (
          <React.Suspense fallback={<Spinner />}>
            <SearchResult />
          </React.Suspense>
        ),
      },
      {
        path: "products/category/:name",
        element: (
          <React.Suspense fallback={<Spinner />}>
            <Products />
          </React.Suspense>
        ),
      },
      {
        path: "checkout",
        element: (
          <PrivateRoutes>
            <Checkout />
          </PrivateRoutes>
        ),
        children: [
          {
            path: "checkoutdetails",
            element: (
              <PrivateRoutes>
                <Checkoutdetails />
              </PrivateRoutes>
            ),
          },
        ],
      },
      {
        path: "customer",
        element: (
          <PrivateRoutes>
            <Customer />
          </PrivateRoutes>
        ),
        children: [
          {
            path: "orders",
            element: (
              <React.Suspense fallback={<Spinner />}>
                <PrivateRoutes>
                  <Order />
                </PrivateRoutes>
              </React.Suspense>
            ),
            children: [
              {
                path: ":id",
                element: (
                  <React.Suspense fallback={<Spinner />}>
                    <PrivateRoutes>
                      <Orderdetail />
                    </PrivateRoutes>
                  </React.Suspense>
                ),
              },
            ],
          },
        ],
      },
    ],
  },
];

export default function Routespath() {
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
}
