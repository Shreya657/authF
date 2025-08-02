import { useState } from 'react';
import api from '../utils/api';
import './ForgotPassword.css';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const redirectUrl = window.location.origin; // base URL of your frontend
      const res = await api.post('/forgot-password', {
        email,
        redirectUrl
      });
      setMessage(res.data.message);
      
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-box">
      <div className="floating-shapes">
        <div className="shape"></div>
        <div className="shape"></div>
        <div className="shape"></div>
      </div>

      <div className="icon-section">
        <div className="forgot-icon"></div>
        <h2>Forgot Password</h2>
        <p className="subtitle">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>

      {message && (
        <div className="success-message">
          {message}
        </div>
      )}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <form className="form-container" onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            className="form-input"
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="submit-btn"
          id="submitBtn"
          disabled={loading}
        >
          <span id="buttonText">
            {loading ? 'Sending...' : 'Send Reset Link'}
          </span>
        </button>
      </form>

      <div className="back-link">
        <a href="/login">Back to Login</a>
      </div>
    </div>
  );
};

export default ForgotPassword;
