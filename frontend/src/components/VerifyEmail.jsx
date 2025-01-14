import React, { useState } from 'react'
import "./css/VerifyEmail.css"
import EmailIcon from '@mui/icons-material/Email';
import CountdownTimer from './constant/CountdownTimer';
import useAuthStore from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

function VerifyEmail() {
    // const [isExpired, setIsExpired] = useState(false);
    const [verificationCode, setVerificationCode] = useState("");
    const authUser = useAuthStore.getState().authUser;
    const {verifyEmail} = useAuthStore();
    const navigate = useNavigate();
    // const onComplete = () =>{
    //     setIsExpired(true);
    //     console.log("Time's up");
    // }
    const handleVerify = (e) =>{
        e.preventDefault();
        verifyEmail(verificationCode, navigate);
    }
  return (
    <>
    <div className="verify">
        <div className="verify-container">
            <div className="verify-header">
                <EmailIcon style={{color: "green"}}/>
                <h4>VERIFY YOUR EMAIL ADDRESS</h4>
            </div>
            <div className="verify-info">
                <p>A verification code has been sent to</p>
                <span style={{ fontWeight: "bold" }}>{authUser?.email}</span>        
                <p >Please check your inbox and enter the verification code below to verify your email address. The code will expire in 2 hours.
                </p>
                {/* <CountdownTimer initialTime={10} /> */}
            </div>
            <div className="verify-input">
                <input type="text" value={verificationCode} onChange={(e)=> {setVerificationCode(e.target.value)}}/>
            </div>
            <div className="verify-btn">
                <button onClick={(e) =>{handleVerify(e)}}>Verify</button>
            </div>
            <div className="verify-addl-links">
                <p>Resend Code</p> 
                {/* have to call the option to send the mail again */}
                <p>Change email (optional)</p>
            </div>
        </div>
    </div>
    </>
  )
}

export default VerifyEmail