import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  BriefcaseIcon,
  CalendarIcon,
  CheckIcon,
  EllipsisVerticalIcon,
  CurrencyDollarIcon,
  LinkIcon,
  MapPinIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import axios from "axios";
import { useAppDispatch } from "../redux-store/hooks";
import { deleteContact } from "../redux-store/listContact";
import { Link } from "react-router-dom";
const DropDown = ({ dropId }: { dropId: any }) => {
  const dispatch = useAppDispatch();
  const clickDelete = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      const serverUrl = "http://localhost:9000";
      await axios.delete(`${serverUrl}/contacts/${dropId}`);
      dispatch(deleteContact({ id: dropId }));
      //   console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Menu as="div" className="relative ml-3 ">
        <Menu.Button className="inline-flex items-center px-3 py-2 text-sm font-semibold text-gray-900 ">
          <EllipsisVerticalIcon
            className="-mr-1 ml-1.5 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Menu.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item>
              <Link to={`/edit-contact/${dropId}`}>
                <div className="flex gap-x-4 p-2 text-sm text-blue-700 hover:bg-slate-100 cursor-pointer">
                  <PencilIcon
                    className="-mr-1 ml-1.5 h-5 w-5 text-blue-400"
                    aria-hidden="true"
                  />
                  Edit
                </div>
              </Link>
            </Menu.Item>
            <Menu.Item>
              <div
                className="flex gap-x-4 p-2 text-sm text-red-700 hover:bg-slate-100 cursor-pointer"
                onClick={(e) => clickDelete(e)}
              >
                <TrashIcon
                  className="-mr-1 ml-1.5 h-5 w-5 text-red-400"
                  aria-hidden="true"
                />
                Delete
              </div>
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default DropDown;
