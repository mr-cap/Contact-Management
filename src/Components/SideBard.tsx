import { UserGroupIcon, ChartBarIcon } from "@heroicons/react/20/solid";
import React from "react";
import { Link } from "react-router-dom";

const SideBard = () => {
  return (
    <main className="flex">
      <div className="bg-white sm:w-60 min-h-screen w-14 transition-all border-2 border-r-slate-200 shadow-2xl ">
        <ul className="mt-4">
          <li className="hover:bg-gray-400 hover:text-white cursor-pointer sm:justify-start px-4 h-12 flex items-center justify-center">
            <UserGroupIcon
              className={"h-5 w-5 flex-shrink-0"}
              aria-hidden="true"
            />
            <Link to={"/contacts"}>
              <span className="ml-3 hidden sm:block  text-gray-900 font-semibold tracking-wide transition-colors hover:text-white">
                {" "}
                All Contacts
              </span>
            </Link>
          </li>
          <li className="hover:bg-gray-400 hover:text-white cursor-pointer sm:justify-start px-4 h-12 flex items-center justify-center">
            <ChartBarIcon
              className={"h-5 w-5 flex-shrink-0"}
              aria-hidden="true"
            />
            <Link to={"/chart-map"}>
              <span className="ml-3 hidden sm:block  text-gray-900 font-semibold tracking-wide  transition-colors hover:text-white">
                {" "}
                Charts & Map
              </span>
            </Link>
          </li>
        </ul>
      </div>
      <section className="flex-1 bg-gray-900 bg-opacity-20"></section>
    </main>
  );
};

export default SideBard;
