import React from "react";
import DropDown from "./DropDown";

const Card = ({ data }: { data: any }) => {
  let { first_name, last_name, status, id } = data;
  return (
    <>
      {/* <div className="h-24 w-24 flex-shrink-0  rounded-full border border-gray-200">
        <img
          className="rounded-full"
          src={
            "https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg"
          }
          alt=""
        />
      </div> */}

      <div className="ml-4 flex flex-1 space-y-5 flex-col">
        <div className="flex justify-between items-center">
          <div className=" text-base font-medium text-gray-900">
            <h3> {`${first_name} ${last_name}`}</h3>
          </div>
          <div className="flex">
            <DropDown dropId={id} />
          </div>
        </div>
        <div className="flex flex-1 items-center justify-between text-sm">
          <div className="animate-pulse flex space-x-4">
            <div
              className={`  py-1 px-2 text-green-950 rounded w-full h-full ${
                status === "active" ? "bg-green-100" : "bg-red-100"
              }`}
            >
              {status === "active" ? "Active" : "In-active"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
