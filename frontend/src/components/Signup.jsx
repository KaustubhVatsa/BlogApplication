import React, {useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import './css/Auth.css'
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const {signup} = useAuthStore();


    const handleSubmit = async (e) =>{
        e.preventDefault();
        signup(username, email, password, navigate);
    }
  return (
    <>
    <div className="form">
        <div className='form-container'>
            <div className="form-header">
                <h4>Welcome Back!</h4>
                <p>Please register to continue</p>
            </div>
            <div className="form-form">
                <TextField id="standard-basic" value={username} onChange={(e) => setUsername(e.target.value)} label="Username" variant="standard" fullWidth
            style={{ marginBottom: '10px' }} />
                <TextField id="standard-basic" value={email} onChange={(e) => setEmail(e.target.value)} label="Email" variant="standard" fullWidth
            style={{ marginBottom: '10px' }} />
                <TextField id="standard-basic" value={password} onChange={(e) => setPassword(e.target.value)} label="Password" variant="standard" fullWidth
            style={{ marginBottom: '20px' }} />
            </div>
            <div className="form-submit">
                <button type='submit' onClick={handleSubmit}>Register</button>
            </div>
            <div className="next-link">
                <p>Already registered? <span><Link to="/">Sign In</Link></span></p>
            </div>
        </div>
        </div>
    </>
  )
}

export default Signup