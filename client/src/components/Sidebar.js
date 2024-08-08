import React, { useState } from 'react';
import { IoChatbubblesSharp } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router-dom';
import { IoLogOutSharp } from "react-icons/io5";
import Avatar from "./Avatar";
import { useDispatch, useSelector } from 'react-redux';
import EditUserDetails from './EditUserDetails';
import { logout } from '../app/UserSlice';

const Sidebar = () => {
    const user = useSelector(state => state?.user);
    const [editUserOpen, setEditUserOpen] = useState(false);
    const [allUser, setAllUser] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/email");
        localStorage.clear();
    }
    return (
        <div className='w-full h-full grid grid-cols-[48px,1fr] bg-white'>
            <div className='bg-slate-100 w-12 h-full rounded-tr-lg rounded-br-lg py-5 text-slate-500 flex flex-col justify-between'>
                <div>
                    <NavLink title='chat' className={({ isActive }) => `w-12 h-12 flex justify-center items-center cursor-pointer
                    hover:bg-slate-300 rounded ${isActive && "bg-slate-200 text-black"}`}>
                        <IoChatbubblesSharp size={25} />
                    </NavLink>

                    <div title='add friend' className={`w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-300 rounded`}>
                        <FaUserPlus size={25} />
                    </div>
                </div>
                <div className='flex flex-col items-center'>
                    <button className='mx-auto' title={user?.username} onClick={() => setEditUserOpen(true)}>
                        <Avatar
                            width={40}
                            height={40}
                            name={user?.username}
                            imageUrl={user?.profile_pic}
                            userId={user?._id}
                        />
                    </button>
                    <button title='logout' className='w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-300 hover:text-black rounded' onClick={handleLogout}>
                        <IoLogOutSharp size={25} />
                    </button>
                </div>
            </div>

            <div className='w-full'>
                <div className='h-16 flex items-center'>
                    <h2 className='text-xl font-bold p-4 text-slate-800'>Messages</h2>
                </div>
                <div className='bg-slate-200 p-[0.5px]'></div>

                <div className='h-[calc(100vh-65px)] overflow-x-hidden overflow-y-auto scrollbar'>
                    {
                        allUser.length === 0 && (
                            <div className='mt-12'>
                                <div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>

            {
                editUserOpen && (
                    <EditUserDetails onClose={() => setEditUserOpen(false)} userData={user} />
                )
            }
        </div>
    )
}

export default Sidebar;