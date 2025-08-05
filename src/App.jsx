import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Logout from './components/Logout';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import VerifyEmail from './components/VerifyEmail';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
     <Router>
      <Routes>

        <Route path='/' element={<Home/>}>
      
        </Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
                <Route path='/logout' element={<Logout/>}></Route>
                <Route path="/forgot-password" element={<ForgotPassword/>} />
<Route path="/reset-password/:token" element={<ResetPassword/>} />
<Route path="/verify-email/:token" element={<VerifyEmail/>}></Route>



      </Routes>
     </Router>
    </div>
  )
}

export default App
