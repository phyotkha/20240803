import React, { useState } from 'react';
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const CheckEmailPage = () => {
  const [data, setData] = useState({
    email: ""
  });

  const navigate = useNavigate();

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

    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/verify-email`;

    try {
      const response = await axios.post(URL, data);

      toast.success(response.data.message);

      if (response.data.success) {
        setData({
          email: ""
        })

        navigate("/password", {
          state: response?.data?.data
        })
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className='mt-5'>
      <div className='bg-white w-full max-w-md overflow-hidden p-4 mx-auto'>

        <div className='w-fit mx-auto mb-2'>
          <FaUserCircle size={50} />
        </div>

        <h3 className='text-center font-semibold text-lg'>
          Login
        </h3>

        <form className='grid gap-4 mt-5' onSubmit={handleSubmit}>

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

          <button className='bg-primary font-semibold text-white text-lg px-4 py-1 hover:bg-secondary'>
            Next
          </button>

        </form>

        <p className='my-3 text-center'>
          New User?
          <Link to={"/register"} className='hover:text-primary font-semibold'> Register</Link>
        </p>
      </div>
    </div>
  )
}

export default CheckEmailPage;