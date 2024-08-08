import React, { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { logout, setUser } from '../app/UserSlice';
import Sidebar from '../components/Sidebar';
import logo from '../public/logo.png'

const HomePage = () => {

  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const fetchUserDetails = async () => {
    try {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/user-details`;

      const response = await axios({
        url: URL,
        withCredentials: true
      })

      dispatch(setUser(response.data.data));

      if (response.data.data.logout) {
        dispatch(logout())
        navigate("/email")
      }

      console.log("User Details ", response.data);

    } catch (error) {
      console.log("Error ", error.message);
    }
  }

  useEffect(() => {
    fetchUserDetails()
  }, [])

  const basePath = location.pathname === '/';

  return (
    <div className='grid lg:grid-cols-[300px,1fr] h-screen max-h-screen'>
      <section className={`bg-white lg:block ${!basePath && "hidden"}`}>
        <Sidebar />
      </section>

      <section className={`${basePath && "hidden"}`}>
        <Outlet />
      </section>

      {/* Logo Display */}
      {/* <div className={`justify-center items-center flex-col gap-2 hidden ${!basePath ? "hidden" : "lg:flex"}`}>
        <div>
          <img 
            src={logo}
            width={250}
            alt='logo'
          />
        </div>
      </div> */}
    </div>
  )
}

export default HomePage;