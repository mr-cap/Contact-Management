import React, { Fragment } from "react";
import "./App.css";
import ContactCard from "./Components/ContactCard";
import XMarkIcon from "@heroicons/react/20/solid/XMarkIcon";
import TopBanners from "./Components/TopBanners";
import SideBard from "./Components/SideBard";
import ContactForm from "./Components/ContactForm";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Link,
  useLocation,
} from "react-router-dom";
import ErrorCard from "./Components/ErrorCard";
import { useAppSelector } from "./redux-store/hooks";
import NoDataFound from "./Components/NoDataFound";
import MapChart from "./Components/MapChart";

const AppLayout = () => {
  const getContactList = useAppSelector((state) => state.contact.items);
  const { pathname } = useLocation();
  return (
    <div className="App ">
      <TopBanners msg={"top-bar"} />
      <div className="">
        <div className="mx-auto p-2 bg-white shadow-xl items-center text-center w-full">
          <h1 className="font-bold text-xl text-gray-900">
            Contact Management App
          </h1>
        </div>
        <div className="flex">
          <SideBard />
          <div className=" bg-gray-50 w-full">
            {pathname !== "/chart-map" && (
              <img
                src="https://kiranworkspace.com/demo/projects/code-snippets/card/profile-card/img/banner.jpg"
                alt=""
                className="w-full h-[13rem] object-cover"
              />
            )}
            <div
              className={`${
                pathname !== "/chart-map" && "-mt-[12rem]"
              } relative mx-2`}
            >
              <div className="mx-auto pt-[2rem]  sm:px-2 container flex gap-y-4 justify-between">
                {pathname === "/chart-map" ? (
                  <></>
                ) : (
                  <>
                    {pathname !== "/contacts" ? (
                      <Link to="/contacts">
                        <button
                          type="button"
                          className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                          View Contacts
                        </button>
                      </Link>
                    ) : (
                      <h2 className="text-2xl font-bold leading-7 text-white sm:truncate sm:text-2xl sm:tracking-tight">
                        List of Contacts
                      </h2>
                    )}
                    <Link to="/create-contact">
                      <button
                        type="button"
                        className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      >
                        Create Contact
                      </button>
                    </Link>
                  </>
                )}
              </div>
              <Outlet />
            </div>

            {pathname === "/contacts" && getContactList.length === 0 && (
              <div className="mx-5 mt-10 shadow-2xl">
                {" "}
                <NoDataFound />
              </div>
            )}
            {pathname === "" && getContactList.length === 0 && (
              <div className="mx-5 mt-10 shadow-2xl">
                {" "}
                <NoDataFound />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "",
        element: <ContactCard />,
      },
      {
        path: "/contacts",
        element: <ContactCard />,
      },
      {
        path: "/create-contact",
        element: <ContactForm pathType={"create-contact"} />,
      },
      {
        path: "/edit-contact/:userId",
        element: <ContactForm pathType={"edit-contact"} />,
      },
      {
        path: "/chart-map",
        element: <MapChart />,
      },
    ],
    errorElement: <ErrorCard />,
  },
]);
const App = () => {
  return <RouterProvider router={appRouter} />;
};

export default App;
