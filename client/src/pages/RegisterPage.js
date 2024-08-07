import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

import uploadFile from '../helpers/UploadFile';

const RegisterPage = () => {
  // State to manage form data
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    profile_pic: ""
  });

  // State to manage the uploaded photo
  const [uploadPhoto, setUploadedPhoto] = useState("");
  const navigate = useNavigate();

  // Handler to update form data state when input fields change
  const handleInputChange = (e) => {
    const { name, value } = e.target

    setData((prevData) => {
      return {
        ...prevData,
        [name]: value
      };
    });
  };

  // Handler to upload profile picture
  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0]; // Gets the selected file
    const uploadPhoto = await uploadFile(file); // Upload the file and get the URL

    // Update the selected photo state and form data
    setUploadedPhoto(file);
    setData((prevData) => {
      return {
        ...prevData,
        profile_pic: uploadPhoto?.url
      };
    });
  };

  // Handler to clear the uploaded photo
  const handlePhotoClear = (e) => {
    // Prevent the default action of the event
    e.preventDefault();

    // Stop the event from bubbling up to the parent element
    e.stopPropagation();

    // Clear the selected photo state and reset the profile_pic field in form data
    setUploadedPhoto(null);
    setData((prevData) => {
      return {
        ...prevData,
        profile_pic: ""
      };
    });
  };

  // Handler to submit the registration  form 
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/register-user`;

    try {
      // Send a POST request to the backend with the form data
      const response = await axios.post(URL, data);

      // Show a success toast notification
      toast.success(response.data.message);

      // Clears the form data when successful
      if (response.data.success) {
        setData({
          name: "",
          email: "",
          password: "",
          profile_pic: ""
        })

        // Navigate to the login page
        navigate("/email");
      }
    } catch (error) {
      // Show an error toast notification
      toast.error(error?.response?.data?.message || "Registeration failed. Please try again.");
    }
  };

  return (
    <div className='mt-5'>
      <div className='bg-white w-full max-w-md overflow-hidden p-4 mx-auto'>
        <h3 className='text-center font-semibold text-lg'>
          Welcome to WebChat!
        </h3>

        <form className='grid gap-4 mt-5' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-1'>
            <label htmlFor='username'>Username: </label>
            <input
              type='text'
              id='username'
              name='username'
              placeholder='Enter your username'
              className='bg-slate-100 px-2 py-1 border hover:border-primary'
              value={data.username}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className='flex flex-col gap-1'>
            <label htmlFor='email'>Email: </label>
            <input
              type='email'
              id='email'
              name='email'
              placeholder='Enter your email address'
              className='bg-slate-100 px-2 py-1 border hover:border-primary'
              value={data.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className='flex flex-col gap-1 '>
            <label htmlFor='password'>Password: </label>
            <input
              type='password'
              id='password'
              name='password'
              placeholder='Enter your password'
              className='bg-slate-100 px-2 py-1 border hover:border-primary'
              value={data.password}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className='flex flex-col gap-1'>
            <label htmlFor='profile_pic'>Profile Picture:

              <div className='h-14 bg-slate-200 flex justify-center items-center border hover:border-primary'>
                <p className='text-sm max-w-[300px] text-ellipsis line-clamp-1'>
                  {
                    uploadPhoto?.name ? uploadPhoto?.name : "Upload your profile picture"
                  }
                </p>
                {
                  uploadPhoto?.name && (
                    <button className='text-lg ml-2 hover:text-red-600' onClick={handlePhotoClear}>
                      <IoMdClose />
                    </button>
                  )
                }
              </div>

            </label>

            <input
              type='file'
              id='profile_pic'
              name='profile_pic'
              className='bg-slate-100 px-2 py-1 hidden'
              onChange={handlePhotoUpload}
            />
          </div>

          <button className='bg-primary font-semibold text-white text-lg px-4 py-1 hover:bg-secondary'>
            Register
          </button>

        </form>

        <p className='my-3 text-center'>
          Already have an account?
          <Link to={"/email"} className='hover:text-primary font-semibold'> Login</Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage;