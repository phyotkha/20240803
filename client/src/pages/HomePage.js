import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {

  const fetchUserDetails = async () => {
    try {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/user-details`;

      console.log("URL: ", URL);

      const response = await axios({
        url: URL,
        withCredentials: true
      })

      console.log("User Details ", response.data);

    } catch (error) {
      console.log("Error ", error.message);
    }
  }

  useEffect(() => {
    fetchUserDetails()
  }, [])

  return (
    <div>
      HomePage

      <section>
        <Outlet />
      </section>
    </div>
  )
}

export default HomePage;