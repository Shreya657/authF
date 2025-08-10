import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import api from "../utils/api.js"
import './Dashboard.css'

const Dashboard = () => {
  const[user,setUser]=useState(null);
  const[loading,setLoading]=useState(true);
  const navigate=useNavigate()

  useEffect(()=>{
    const fetchProfile=async()=>{
      try{
        const {data}=await api.get('/me');
          console.log("Fetched user:", data.data);
        setUser(data.data);
      }catch(error){
        console.error("error fetching user profile",error);
      }finally{
        setLoading(false)
      }
    };
    fetchProfile();
  },[])

  
const MemberSince = () => {
  const today = new Date();

  const day = today.getDate();
  const month = today.getMonth() + 1; // Months are 0-based
  const year = today.getFullYear();

  return `${day}/${month}/${year}`;
  

}
  
  // useEffect(() => {
  //   const storedUser = localStorage.getItem("user");
  //   if (storedUser) {
  //     setUser(JSON.parse(storedUser));
  //   }
  // }, []);

  if(loading)
    return <p>Loading...</p>
  return (
    <div class="dashboard-container">
      <div class="floating-shapes">
            <div class="shape"></div>
            <div class="shape"></div>
            <div class="shape"></div>
        </div>
       <div class="header">
      <h1>hi im dashboard</h1>
      
        <p class="subtitle">Welcome back! Here's your profile overview</p>
        </div>
         <div class="avatar-section">
      <h2 class="username" id="username">welcome {user?.username}</h2>
      </div>
        <div class="profile-info">
            <div class="info-item">
                <div class="info-icon">✉️</div>
                <div class="info-content">
                    <div class="info-label">Email</div>
                    <div class="info-value" id="userEmail">{user?.email}</div>
                </div>
            </div>

            <div class="info-item">
                <div class="info-icon">📅</div>
                <div class="info-content">
                    <div class="info-label">Member Since</div>
                    <div class="info-value" id="memberSince"> {MemberSince()} </div>
                </div>
            </div>

            <div class="info-item">
                <div class="info-icon">🔐</div>
                <div class="info-content">
                    <div class="info-label">Account Status</div>
                    <div class="info-value" id="accountStatus">Active</div>
                </div>
            </div>
        </div>
   

      <button class="logout-btn" onClick={()=>navigate('/logout')}>logout</button>
    </div>
  )
}


export default Dashboard
