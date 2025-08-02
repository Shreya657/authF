import React, { useState } from 'react'
import { useNavigate,Link } from 'react-router-dom'
import api from '../utils/api'
import { GoogleLogin } from '@react-oauth/google'
import axios from "axios"
import './Login.css'


const Login = () => {

  const navigate=useNavigate()
  const[input,setInput]=useState({identifier:'',password:''})
  const[loading,setLoading]=useState(false)
  const[error,setError]=useState('')
  const handleChange=(e)=>{
    setInput({...input,[e.target.name]:e.target.value})
  }

  const handleLogin=async(e)=>{
    e.preventDefault();
    setLoading(true)
    setError('')
    const payload = input.identifier.includes('@')
  ? { email: input.identifier, password: input.password }
  : { username: input.identifier, password: input.password };
    try{
      const res=await api.post('/login',payload)
    
      localStorage.setItem('token',res.data.data.accessToken);
      navigate('/dashboard')
    }catch(err){
      console.error(err);
      setError(err.response?.data?.message || 'Login failed');
    }finally{
      setLoading(false);
    }
  }


  //   const handleSuccess = async (credentialResponse) => {
  //   const idToken = credentialResponse.credential;

  //   try {
  //     const res = await axios.post(
  //       'https://authapi-production-5094.up.railway.app/api/v1/users/google',
  //       { idToken } // sending token in request body
  //     );
  
  //     console.log('Login Success:', res.data);
  //      const { user, accessToken } = res.data.data;
  //   // Save token + user to localStorage
  //   localStorage.setItem('token', res.data.data.accessToken); // or whole token obj
  //   localStorage.setItem("user", JSON.stringify(user));

  //     navigate('/dashboard')
  //   } catch (err) {
  //     console.error('Login failed:', err);
  //   }
  // };

  return (
    <div class="login-container">
      <div class="floating-shapes">
            <div class="shape"></div>
            <div class="shape"></div>
            <div class="shape"></div>
        </div>
      <h1>login page</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      <form class="form-container" onSubmit={handleLogin}>
        <div class="input-group">
        <input  class="form-input"
          type="email"
          name="identifier"
          placeholder="Enter email or username"
          value={input.identifier}
          onChange={handleChange}
          required
        /></div>
       <div class="input-group">
        <input  class="form-input"
          type="password"
          name="password"
          placeholder="Enter password"
          value={input.password}
          onChange={handleChange}
          required
        /> </div>
         <div class="forgot-password-container">
        <Link  class="forgot-password-link" to="/forgot-password">forgot password</Link>
        </div>
      
        <button type="submit" class="submit-btn" id="submitBtn" disabled={loading}>
          
                     <span id="buttonText">{loading ? 'Logging in...' : 'Login'}</span>

        </button>
      </form>
{/* 
       <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => {
          console.log('Login Failed');
        }}
          ux_mode="popup"
  prompt="select_account"
      /> */}
    
  

    </div>
  )
}

export default Login
