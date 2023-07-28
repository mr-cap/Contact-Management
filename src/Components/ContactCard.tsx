import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux-store/hooks";
import { getContact } from "../redux-store/listContact";
import Card from "./Card";
import axios from "axios";
import { useEffectOnce } from "../utils/useEfftect";
import ErrorCard from "./ErrorCard";

const ContactCard = () => {
  const getContactList = useAppSelector((state) => state.contact.items);
  const dispatch = useAppDispatch();

  useEffectOnce(() => {
    const serverUrl = "http://localhost:9000";
    const fetchData = async () => {
      const dataUrl = `${serverUrl}/contacts`;
      const result = await axios
        .get(dataUrl)
        .then((response) => response?.data);
      dispatch(getContact(result));
    };
    getContactList.length === 0 && fetchData();
  });
  return (
    <div className="mx-auto container py-14 sm:py-22">
      <ul className="grid gap-x-20 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-y-16">
        {getContactList.length !== 0 ? (
          getContactList?.map((contact: any) => (
            <li
              key={contact?.id}
              className=" bg-white flex p-6 border-2 mx-2 border-slate-200 shadow-md rounded-md "
            >
              <Card data={contact} />
            </li>
          ))
        ) : (
          <ErrorCard />
        )}
      </ul>
    </div>
  );
};

export default ContactCard;
