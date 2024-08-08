import React, { useEffect, useState } from 'react';
import { FaUserCircle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import Avatar from '../components/Avatar';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../app/UserSlice.js';

const CheckPasswordPage = () => {
  const [data, setData] = useState({
    password: "",
    userId: ""
  })

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  console.log("Location: ", location)

  useEffect(() => {
    if (!location?.state?.username) {
      navigate("/email")
    }
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target

    setData((prevData) => {
      return {
        ...prevData,
        [name]: value
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/verify-password`;

    try {
      const response = await axios({
        method: 'post',
        url: URL,
        data: {
          userId: location?.state?._id,
          password: data.password
        },
        withCredentials: true
      })

      toast.success(response.data.message);

      if (response.data.success) {
        dispatch(setToken(response?.data?.token))
        localStorage.setItem('token', response?.data?.token)

        setData({
          password: ""
        })

        navigate("/")
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className='mt-5'>
      <div className='bg-white w-full max-w-md overflow-hidden p-4 mx-auto'>

        <div className='w-fit mx-auto mb-2'>
          <Avatar
            width={70}
            height={70}
            username={location?.state?.username}
            imageUrl={location?.state?.profile_pic}
          />
        </div>

        <h3 className='text-center font-semibold text-lg'>
          Welcome {location?.state?.username}
        </h3>

        <form className='grid gap-4 mt-5' onSubmit={handleSubmit}>

          <div className='flex flex-col gap-1'>
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

          <button className='bg-primary font-semibold text-white text-lg px-4 py-1 hover:bg-secondary'>
            Login
          </button>

        </form>

        <p className='my-3 text-center'>
          Forgot Password?
          <Link to={"/password-reset"} className='hover:text-primary font-semibold'> Reset</Link>
        </p>
      </div>
    </div>
  )
}

export default CheckPasswordPage;