import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeftStartOnRectangleIcon,
  RectangleGroupIcon,
  TableCellsIcon,
} from "@heroicons/react/24/outline";
import supabaseClient from "../../config/supabaseClient";

export const Navbar = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function getUserData() {
      await supabaseClient.auth.getUser().then((value) => {
        if (value.data?.user) {
          console.log(value.data.user);
          setUser(value.data.user);
        }
      });
    }
    getUserData();
  }, []);

  async function signOutUser() {
    const { error } = await supabaseClient.auth.signOut();
    navigate("/");
  }

  return (
    <article
      id="navbar"
      className="col-span-1 row-span-full grid grid-rows-24 bg-gray-900 outline outline-1 outline-offset-0 outline-gray-700"
    >
      <div className="col-start-1 row-start-2 mx-2 content-center text-gray-500 hover:cursor-pointer hover:rounded-sm hover:bg-gray-800 hover:text-gray-200 hover:outline hover:outline-1 hover:outline-offset-0 hover:outline-gray-700">
        <Link to="/dashboard">
          <div className="flex flex-row justify-center">
            <RectangleGroupIcon className="h-6 w-6" />
          </div>
        </Link>
      </div>
      <div className="col-start-1 row-start-22 mx-2 content-center text-center align-middle text-gray-500 hover:cursor-pointer hover:rounded-sm hover:bg-gray-800 hover:text-gray-200 hover:outline hover:outline-1 hover:outline-offset-0 hover:outline-gray-700">
        <button className="" onClick={() => signOutUser()}>
          <div className="flex flex-row justify-center pt-2">
            <ArrowLeftStartOnRectangleIcon className="h-6 w-6" />
          </div>
        </button>
      </div>
    </article>
  );
};
