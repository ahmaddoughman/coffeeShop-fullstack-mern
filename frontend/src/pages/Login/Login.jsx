import React, { useContext, useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Login = () => {
  const navigate = useNavigate();
  const {url} = useContext(StoreContext)
  const [tokenUser, setTokenUser] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      setData(data => ({ ...data, [name]: value }))
  }


  const handlelogin = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    
    try {
      const response = await fetch(`${url}/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      
      const result = await response.json();
  
      if (response.ok && result.userToken) {  // Check if token is received and response is OK
        setTokenUser(result.userToken);
        localStorage.setItem("tokenUser", result.userToken);
        navigate("/");
      } else {
        setErrorMessage(result.message || "Failed to login. Please check your credentials.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    }
  }
  

  const handleSignup = () =>{
    navigate("/signup")
  }

  return (
    <div className='login-user'>
      <div className='login-container'>
        <h1>Login</h1>
        <form onSubmit={handlelogin} className='login-form'>
          <div className='login-inputs'> 
              <input  name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email' required/>
              <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required/>
          </div>
          <div>
              <button type='submit' className='login-btn'>Login</button>
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
        <div>
          <p>Create a new account? <span onClick={()=>handleSignup()} >Click here</span></p>
        </div>
      </div>
    </div>
  )
}

export default Login
