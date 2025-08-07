import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import './ResetPassword.css'
import { FaEye, FaEyeSlash } from 'react-icons/fa';


const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
      const[showPassword,setShowPassword]=useState(false);
  

 const toggleEye=()=>{
  setShowPassword((prev)=>!prev);
}

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const res = await api.post(`/reset-password/${token}`, {
        newPassword,
        confirmPassword
      });
      setMessage(res.data.message);
      setTimeout(() => navigate('/login'), 2000); // redirect to login after success
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
     <div class="reset-password-container">
        <div class="floating-shapes">
            <div class="shape"></div>
            <div class="shape"></div>
            <div class="shape"></div>
        </div>
   
        <div class="icon-section">
            <div class="reset-icon"></div>
      <h2>Reset Password</h2>
       <p class="subtitle">Enter your new password below to complete the reset process.</p>
        </div>

        <div class="success-message" id="successMessage" style={{display:"none"}}>
            Password reset successfully! You can now login with your new password.
        </div>
        
        <div class="error-message" id="errorMessage" style={{display:"none"}} >
            Something went wrong. Please try again.
        </div>
         <form  class="form-container" onSubmit={handleReset}>
         <div class="input-group">
      <input  class="form-input"
         type={showPassword ? "text": "password"}
        placeholder="New password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
      />  <span
                      onClick={toggleEye}
                      style={{
                        position: 'absolute',
                        right: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        cursor: 'pointer'
                      }}
                    >
                      {showPassword ? <FaEye />: <FaEyeSlash/>}
                    </span>
        <div class="password-strength" id="passwordStrength" style={{display:"none"}}>
                    <div class="strength-bar">
                        <div class="strength-fill" id="strengthFill"></div>
                    </div>
                    <div class="strength-text" id="strengthText"></div>
                </div>
       
      </div>
      <div class="input-group">
      <input  class="form-input"
         type={showPassword ? "text": "password"}
        placeholder="Confirm password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      /> <span
                      onClick={toggleEye}
                      style={{
                        position: 'absolute',
                        right: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        cursor: 'pointer'
                      }}
                    >
                      {showPassword ? <FaEye />: <FaEyeSlash/>}
                    </span>
       <div class="password-match" id="passwordMatch" style={{display:"none"}}></div>
      </div>
      <button  class="submit-btn" type="submit">
         <span id="buttonText">Reset Password</span>
      </button>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
       <div class="back-link">
            <a href="/login" onclick="goToLogin(event)">Back to Login</a>
        </div>
     </div>
  );
};

export default ResetPassword;
