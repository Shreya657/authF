import React from 'react'
import { useNavigate,Link } from 'react-router-dom'
import './Home.css'

const Home = () => {

  const navigate=useNavigate();
 
  return (
    <div class="welcome-container">
       <div class="floating-shapes">
            <div class="shape"></div>
            <div class="shape"></div>
            <div class="shape"></div>
        </div>
      <h1 >Welcome to AuthApp 🚀</h1>
      <p class="subtitle">Your secure and simple authentication system</p>

      <button class="get-started-btn" onClick={() => navigate('/register')} style={{ marginTop: '20px' }}>
        Get Started
      </button>

      <p class="login-text" style={{ marginTop: '10px' }}>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  )
}

export default Home
