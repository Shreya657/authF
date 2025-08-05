import React, {useEffect,useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import api from '../utils/api';

const VerifyEmail = () => {
  const { token } = useParams();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleVerify = async () => {
    try {
      const res = await api.get(`/verify-email/${token}`);
      setMessage("Email verified! You can now log in.");
      setError(""); 
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.message ||"Verification failed or token expired.");
      setMessage("");
    }
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center', backgroundColor: "black" }}>
      <button onClick={handleVerify}>Verify Email</button>
      {message && <h2 style={{ color: 'green' }}>{message}</h2>}
      {error && <h2 style={{ color: 'red' }}>{error}</h2>}
    </div>
    
  );
};
export default VerifyEmail;
