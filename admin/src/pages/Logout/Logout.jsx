import React from 'react'
import { useNavigate } from 'react-router-dom';


const Logout = () => {

    localStorage.removeItem("tokenAdmin");

    const navigate = useNavigate();
    navigate("/admin/login");

  return (
    <div>


    </div>
  )
}

export default Logout
