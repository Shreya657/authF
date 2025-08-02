import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
const clientId = '215792785419-l23v4dkqugnl0ljtilaolt9ba29nllp1.apps.googleusercontent.com';

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <GoogleOAuthProvider clientId={clientId}>
      <App />
    </GoogleOAuthProvider>
  </StrictMode>,
)
