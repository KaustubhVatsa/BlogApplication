import React, {useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './css/Auth.css'
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuthStore from '../store/useAuthStore';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const {login} = useAuthStore();


    const handleLogin = async (e) => {
        e.preventDefault();
        login(email, password, navigate);
    };
    
  return (
    <>
    <div className="form">
    <div className='form-container'>
        <div className="form-header">
            <h4>Welcome Back!</h4>
            <p>Please sign in to continue</p>
        </div>
        <div className="form-form">
            <TextField id="standard-basic" value={email} onChange={(e) => setEmail(e.target.value)} label="Email" variant="standard" fullWidth
        style={{ marginBottom: '10px' }} />
            <TextField id="standard-basic" value={password} onChange={(e) => setPassword(e.target.value)} label="Password" variant="standard" fullWidth
        style={{ marginBottom: '10px' }} />
        </div>
        <div className="placeholder-field">
            <p>Forgot Password?</p>
        </div>
        <div className="form-submit">
            <button type='submit' onClick={handleLogin}>Login</button>
        </div>
        <div className="next-link">
            <p>Not registered? <span><Link to="/signup">Register Here</Link></span></p>
        </div>
    </div>
    </div>
    </>
  )
}

export default Login