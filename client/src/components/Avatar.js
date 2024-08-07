import React from 'react';
import { FaUserCircle } from "react-icons/fa";

const Avatar = ({ userId, username, imageUrl, width, height }) => {
    let avatarName = "";

    if (username) {
        const splitName = username?.split(" ");

        if (splitName.length > 1) {
            avatarName = splitName[0][0] + splitName[1][0]
        } else {
            avatarName = splitName[0][0]
        }
    }

    const bgColor = [
        'bg-slate-200',
        'bg-teal-200',
        'bg-red-200',
        'bg-green-200',
        'bg-yellow-200',
        'bg-gray-200',
        "bg-cyan-200",
        "bg-sky-200",
        "bg-blue-200"
    ]
    const randomNumber = Math.floor(Math.random() * 9);

    return (
        <div className={`text-slate-800 rounded-full flex justify-center items-center`} style={{ width: width + "px", height: height + "px" }}>
            {
                imageUrl ? (
                    <img
                        src={imageUrl} width={width} height={height} alt={username}
                        className='overflow-hidden rounded-full'
                    />
                ) : (
                    username ? (
                        <div
                            style={{ width: width + "px", height: height + "px" }}
                            className={`overflow-hidden rounded-full flex justify-center items-center font-bold text-xl shadow-md  ${bgColor[randomNumber]}`}
                        >
                            {avatarName}
                        </div>
                    ) : (
                        <FaUserCircle size={width} />
                    )
                )
            }
        </div>
    )
}
export default Avatar;