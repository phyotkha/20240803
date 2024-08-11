import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from './Avatar';

const SearchUserDisplay = ({ user, onClose }) => {
    return (
        <Link to={"/" + user?._id} onClick={onClose}
            className='flex items-center gap-3 p-2 lg:p-4 border border-transparent border-b-slate-200 hover:border-primary cursor-pointer'
        >
            <div>
                <Avatar
                    width={50}
                    height={50}
                    username={user?._id}
                    userId={user?._id}
                    imageUrl={user?.profile_pic}
                />
            </div>
            <div>
                <div className='font-semibold text-ellipsis line-clamp-1'>
                    {user?.username}
                </div>
                <p className='text-sm text-ellipsis line-clamp-1'>{user?.email}</p>
            </div>
        </Link>
    )
}

export default SearchUserDisplay;