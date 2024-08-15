import React, { useContext, useState } from 'react'
import './SignUp.css'
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const SignUp = () => {
  const navigate = useNavigate();

  const {url} = useContext(StoreContext)
  const [tokenUser, setTokenUser] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [data, setData] = useState({
    username:"",
    email: "",
    password: "",
    gender:"",
    phone:"",
    country:"",
  });

  const onChangeHandler = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      setData(data => ({ ...data, [name]: value }))
  }


  const handleSignUp = async (e) => {
    e.preventDefault();
    const { username, email, password, gender, phone, country  } = data;
    
    try {
      const response = await fetch(`${url}/api/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          gender,
          phone,
          country,
        }),
      });
      
      const result = await response.json();
  
      if (response.ok && result.userToken) {
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

  const handleLogin = () =>{
    navigate("/login")
  }

  return (
    <div className='signup-user'>
      <div className='signup-container'>
        <h1>Sign Up</h1>
        <form action="" onSubmit={handleSignUp}>
          <div className='signup-inputs'> 
              <input name='username' onChange={onChangeHandler} value={data.username} type="text" placeholder='Username' required/>
              <input  name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email' required/>
              <input  name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' />
              <div className='signup-gender'>
                  <div className='signup-gender-input'>
                    <input onChange={onChangeHandler} value="Male" type="radio" name="gender" id="Male" checked={data.gender === "Male"} />
                    <label htmlFor="Male">Male</label>
                  </div>
                  <div className='signup-gender-input'> 
                    <input onChange={onChangeHandler} value="Female" type="radio" name="gender" id="Female" checked={data.gender === "Female"} />
                    <label htmlFor="Female">Female</label>
                  </div>
              </div>
              <input type="number" onChange={onChangeHandler} value={data.phone} name="phone" placeholder='phone number' id="" />
              <select className='signup-select' onChange={onChangeHandler} value={data.country} name="country" id="">
                <option value="" disabled>Select Your Country</option>
                <option value="Beirut">Beirut</option>
                <option value="Jounieh">Jounieh</option>
                <option value="Tripoli">Tripoli </option>
                <option value="Saida">Saida</option>
                <option value="Tyre">Tyre</option>
                <option value="Zahle">Zahle</option>
              </select>
          </div>
          <div>
              <button type='submit' className='signup-btn'>Sign up</button>
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
        <div>
          <p>Create a new account? <span onClick={()=>handleLogin()} >Click here</span></p>
        </div>
      </div>
    </div>
  )
}

export default SignUp
