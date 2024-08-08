import React, { useEffect, useRef, useState } from 'react'
import Avatar from './Avatar';
import { useDispatch } from 'react-redux';
import uploadFile from '../helpers/UploadFile';
import axios from 'axios';
import toast from 'react-hot-toast';
import { setUser } from '../app/UserSlice';

const EditUserDetails = ({ onClose, userData }) => {

    const [data, setData] = useState({
        name: userData?.user,
        profile_pic: userData?.profile_pic,
    });

    const uploadPhotoRef = useRef();
    const dispatch = useDispatch();

    useEffect(() => {
        setData((prevData) => {
            return {
                ...prevData,
                ...userData
            }
        })
    }, [userData])

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setData((prevData) => {
            return {
                ...prevData,
                [name]: value
            }
        })
    }

    const handleOpenUploadPhoto = (e) => {
        e.preventDefault();
        e.stopPropagation();

        uploadPhotoRef.current.click()
    }

    const handleUploadPhoto = async (e) => {
        const file = e.target.files[0];
        const uploadPhoto = await uploadFile(file);

        setData((prevData) => {
            return {
                ...prevData,
                profile_pic: uploadPhoto?.url
            };
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        try {
            const URL = `${process.env.REACT_APP_BACKEND_URL}/api/update-user`;

            const response = await axios({
                method: 'post',
                url: URL,
                data: data,
                withCredentials: true
            })

            console.log("Response: ", response);
            toast.success(response?.data?.message);

            if (response.data.success) {
                dispatch(setUser(response.data.data))
                onClose()
            }

        } catch (error) {
            console.log("Error: ", error.message);
            toast.error();
        }
    }

    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 bg-gray-700 bg-opacity-40 flex justify-center items-center z-10'>
            <div className='bg-white p-4 py-6 m-1 rounded w-full max-w-sm'>
                <h2 className='font-semibold'>Profile Details</h2>
                <p className='text-sm'>Update your profile details</p>

                <form className='grid gap-3 mt-3' onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor='username'>Username:</label>
                        <input
                            type='text'
                            id='username'
                            name='username'
                            placeholder='Enter new username'
                            value={data?.username}
                            onChange={handleInputChange}
                            className='w-full py-1 px-2 cursor-pointer border hover:border-primary'
                        />
                    </div>

                    <div className='flex flex-col gap-1'>
                        <label htmlFor='email'>Email:</label>
                        <input 
                            type='email'
                            id='email'
                            name='email'
                            placeholder='Enter new email'
                            value={data?.email}
                            onChange={handleInputChange}
                            className='w-full py-1 px-2 cursor-pointer border hover:border-primary'
                        />
                    </div>

                    <div>
                        <div>Profile Picture: </div>
                        <div className='my-1 flex items-center gap-4'>
                            <Avatar
                                width={40}
                                height={40}
                                imageUrl={data?.profile_pic}
                                name={data?.username}
                            />
                            <label htmlFor='profile_pic'>
                                <button className='font-semibold' onClick={handleOpenUploadPhoto}>Change Photo</button>
                                <input
                                    type='file'
                                    id='profile_pic'
                                    className='hidden'
                                    onChange={handleUploadPhoto}
                                    ref={uploadPhotoRef}
                                />
                            </label>
                        </div>
                    </div>

                    <div className='flex gap-2 w-fit ml-auto'>
                        <button onClick={onClose} className='border-primary border text-primary px-4 py-1 rounded hover:bg-primary hover:text-white'>Cancel</button>
                        <button onClick={handleSubmit} className='border-primary bg-primary text-white border px-4 py-1 rounded hover:bg-secondary'>Save</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default React.memo(EditUserDetails);