import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {RectangleGroupIcon, TableCellsIcon} from "@heroicons/react/16/solid";
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
            })
        }
        getUserData();
    }, []);

    async function signOutUser() {
        const {error} = await supabaseClient.auth.signOut();
        navigate("/");
    }

    return (
        <div className='navbar'>
            <Link to="/dashboard" className="btn-navbar">
                <div className="flex flex-row justify-center">
                    <RectangleGroupIcon className="w-6 h-6 pr-2"/>
                    <p>Dashboard</p>
                </div>
            </Link>
            <button className="rounded-md bg-gradient-to-r from-slate-600 to-slate-800 p-3 my-2 mx-2 w-1/12 text-center" onClick={() => signOutUser()}>Sign Out</button>
            <Link to="/payments" className="btn-navbar">
                <div className="flex flex-row justify-center">
                    <TableCellsIcon className="w-6 h-6 pr-2"/>
                    <p>Payments</p>
                </div>
            </Link>
        </div>
    );
};