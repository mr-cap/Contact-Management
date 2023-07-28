import { UserIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { useAppDispatch } from "../redux-store/hooks";
import { getContact, updateContact } from "../redux-store/listContact";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffectOnce } from "../utils/useEfftect";
const ContactForm = ({ pathType }: { pathType: string }) => {
  const dispatch = useAppDispatch();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [status, setStatus] = useState<string>("active");
  const serverUrl = "http://localhost:9000";
  const id = uuid();
  const { userId } = useParams();
  const navigate = useNavigate();
  const postContact = async () => {
    let dataUrl = `${serverUrl}/contacts`;
    const payload = {
      id: id,
      first_name: firstName,
      last_name: lastName,
      status: status,
    };

    let response = await axios.post(dataUrl, payload);
    if (response) {
      navigate("/contacts");
      dispatch(getContact([response?.data]));
      restField();
    }
  };
  const putContact = async () => {
    let dataUrl = `${serverUrl}/contacts/${userId}`;
    const payload = {
      first_name: firstName,
      last_name: lastName,
      status: status,
    };

    let response = await axios.put(dataUrl, payload);
    if (response) {
      navigate("/contacts");
      dispatch(updateContact(response.data));
      restField();
    }
  };
  const restField = () => {
    setFirstName("");
    setLastName("");
    setStatus("active");
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    pathType === "create-contact" ? postContact() : putContact();
  };

  useEffect(() => {
    const fetchData = async () => {
      const dataUrl = `${serverUrl}/contacts/${userId}`;
      const result = await axios(dataUrl).then((response) => response?.data);
      setFirstName(result?.first_name);
      setLastName(result?.last_name);
      setStatus(result?.status);
    };
    userId && fetchData();
    !userId && restField();
  }, [userId]);
  return (
    <>
      <div className=" w-full sm:w-[40rem] container mx-auto bg-white p-8 mt-6 sm:px-24 sm:py-10 rounded-2xl shadow-xl">
        <div className="flex  space-x-7 items-center justify-center">
          <h2 className="text-center text-2xl font-bold  tracking-tight text-blue-900">
            {userId ? "Edit Contact" : "Create Contact"}
          </h2>
        </div>

        <div className="mt-10 mx-auto sm:max-w-sm ">
          <form className="space-y-6" onSubmit={(e) => handleSubmit(e)}>
            <div>
              <label
                htmlFor="firstName"
                className="flex text-sm font-medium leading-6 text-gray-900"
              >
                First Name
              </label>
              <div className="mt-2 rounded-md shadow-sm">
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="flex text-sm font-medium leading-6 text-gray-900"
              >
                Last Name
              </label>
              <div className="mt-2 rounded-md shadow-sm">
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="">
              <label
                htmlFor="status"
                className="flex text-sm font-medium leading-6 text-gray-900"
              >
                Status
              </label>
              <div className="flex justify-start gap-6 py-2 items-center">
                <div className="flex text-center self-center item-center">
                  <input
                    className=" mr-1 mt-0.5 h-5 w-5 rounded-full border-2 border-solid border-neutral-300 "
                    type="radio"
                    name="flexRadioDefault"
                    id="active"
                    checked={status === "active" ? true : false}
                    onChange={(e) => setStatus("active")}
                  />
                  <label
                    className=" pl-[0.15rem] hover:cursor-pointer"
                    htmlFor="active"
                  >
                    Active
                  </label>
                </div>
                <div className="flex text-center self-center item-center">
                  <input
                    className=" mr-1 mt-0.5 h-5 w-5 rounded-full border-2 border-solid border-neutral-300 "
                    type="radio"
                    name="flexRadioDefault"
                    id="inactive"
                    checked={status === "inactive" ? true : false}
                    onChange={(e) => setStatus("inactive")}
                  />
                  <label
                    className=" pl-[0.15rem] hover:cursor-pointer"
                    htmlFor="inactive"
                  >
                    In-active
                  </label>
                </div>
              </div>
            </div>

            <div className="flex">
              <button
                type="submit"
                className="w-full rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {userId ? "Update" : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactForm;
