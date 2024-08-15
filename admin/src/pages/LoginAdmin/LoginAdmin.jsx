import React, { useState } from 'react'
import './LoginAdmin.css'
import { useNavigate } from 'react-router-dom';

const LoginAdmin = ({url}) => {

    const navigate = useNavigate();

    const [tokenAdmin, setTokenAdmin] = useState("");
    const [currState, setCurrState] = useState('Login')
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

    const onSubmitHandler = (e) => {
        e.preventDefault();

        let newUrl = currState === 'Login' ? `${url}/api/admin/login` : `${url}/api/admin/register`;
        
        const { email, password } = data;

        fetch(newUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.adminToken) {  // Check if token is received
                    setTokenAdmin(data.adminToken);
                    localStorage.setItem("tokenAdmin", data.adminToken);
                    navigate("/"); // Navigate to / on successful login
                } else {
                    setErrorMessage("Failed to login. Please check your credentials.");
                }
            })
            .catch((err) => {
                console.log(err);
                setErrorMessage("Failed to login. Please check your credentials.");
            });
    };


  return (
    <div className='login-popup'>
      <form onSubmit={onSubmitHandler} className="login-popup-container">
        <div className="login-popup-title">
            <h2>{currState}</h2>
        </div>
        <div className='login-popup-inputs'>
            <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required />
            <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required  />
        </div>
        <button type='submit'>{currState === "Sign Up" ? "Create account" : "Login"}</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className='login-popup-condition'>
            <input type="checkbox" required name=""  />
            <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
        {currState === "Login" 
            ? <p>Create a new account? <span onClick={()=>setCurrState("Sign Up")} >Click here</span></p>
            : <p>Already have an account? <span onClick={()=>setCurrState("Login")}>Login here</span></p>
        }
        
      </form>
    </div>
  )
}

export default LoginAdmin
