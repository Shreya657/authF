import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        await api.post('/logout', {}, { withCredentials: true });
        navigate('/');
      } catch (error) {
        console.error('Logout failed', error);
      }
    };

    logout();
  }, [navigate]);

  return <p>Logging you out...</p>;
};

export default Logout;
