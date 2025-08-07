import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import api from '../utils/api'
import { GoogleLogin } from '@react-oauth/google'
import './Register.css'
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Register = () => {
  const[showPassword,setShowPassword]=useState(false);
  const navigate=useNavigate()
const[formData,setFormData]=useState({username:'',email:'',password:''})
const[loading,setLoading]=useState(false)
const[error,setError]=useState('')
const[message,setMessage]=useState('')
const[isRegistered,setIsRegistered]=useState(false)

const toggleEye=()=>{
  setShowPassword((prev)=>!prev);
}


const handleChange=(e)=>{
    setFormData((prev)=>({
        ...prev,
        [e.target.name]:e.target.value
    }))
}

const handleSubmit=async(e)=>{
    e.preventDefault()
    setError('')
    setMessage('')
    setLoading(true);

try {
    const redirectUrl = window.location.origin;
  const response = await api.post('/register', {
        ...formData,
      redirectUrl 
});
  console.log("Registration successful");
  //  redirectUrl: `${window.location.origin}/verify-email

  setIsRegistered(true);
 setMessage("Registration successful! Please check your email to verify your account.");
  // ✅ Store access token
  localStorage.setItem("token", response.data?.data?.accessToken);



} catch (error) {
  setError(error.response?.data?.message || 'Registration failed.');
} finally {
  setLoading(false);
}



   
};


const handleGoogleLogin = async () => {
  // Suppose tu idToken le chuki hai Google se (yeh manually lena padega via Google Identity Services)
  const idToken = "your_token_from_google"; // normally tu Google ke JS lib se leti hai

  // Backend URL ke sath query params pass karo
  const url = `https://your-backend.com/api/v1/users/google?idToken=${idToken}`;

  // Redirect to backend
  window.location.href = url;
};


  return (
    <div class="register-container">
       <div class="floating-shapes">
            <div class="shape"></div>
            <div class="shape"></div>
            <div class="shape"></div>
        </div>
      <h2>register</h2>
      {error && <p style={{color:'red'}}>{error}</p>}
       {message && <p style={{ color: 'green' }}>{message}</p>}
      <form  class="form-container"  onSubmit={handleSubmit} action="">
         <div class="input-group">
        <input   class="form-input"          
          name="username"
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
/></div>
         <div class="input-group">
          <input    class="form-input"  name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required/></div>
        
         <div class="input-group">
          <input   class="form-input"  name="password"
          type={showPassword ? "password": "text"}
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required/>
          
           <span
        onClick={toggleEye}
        style={{
          position: 'absolute',
          right: '10px',
          top: '50%',
          transform: 'translateY(-50%)',
          cursor: 'pointer'
        }}
      >
        {showPassword ? <FaEyeSlash/> : <FaEye />}
      </span>
          </div>
      
          <button  class="submit-btn" type='submit' disabled={loading || isRegistered}>{loading?'registering..':'register'}</button>
         {/* <p>{message}</p> */}

      </form>
{/* 
        {isRegistered && (
        // <button class="dashboard-btn" onClick={() => navigate('/dashboard')}>
        //   Go to Dashboard
        // </button>
      )} */}
      

      {/* <button onClick={handleGoogleLogin}>continue with google</button> */}
    </div>
  )
}

export default Register
