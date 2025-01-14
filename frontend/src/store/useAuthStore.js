import { create } from 'zustand'
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const useAuth = (set, get) => ({
    //initial state
    authUser: null,
    isCheckingAuth: false,
  
    //Actions
    checkAuth: async() =>{
        set({isCheckingAuth: true})
        try {
            const res = await axios.get('http://localhost:5000/auth/checkAuth', {withCredentials: true});
            set({authUser: res.data});
            //console.log(res)
        } catch (err) {
            console.log(err.response?.data?.message || "checkAuth failed. Please try again.");
            set({authUser: null});
        }finally{
            set({isCheckingAuth: false})
        }
    },
    signup: async(username, email, password, navigate) => {
        try {
            const res = await axios.post('http://localhost:5000/auth/signup', {username, email, password }, { withCredentials: true });
            set({authUser: res.data});
            console.log("result", result);
            console.log(authUser);
            toast.success("Signup successfully done! Redirecting to Login page...");
            navigate("/verify")
        } catch (err) {
            console.log(err.response?.data?.message || "Signup failed. Please try again.");
            toast.error(err.response?.data?.message || "Signup failed. Please try again.");  
        }
    },
    login: async(email, password, navigate) => {
        try {
            const res = await axios.post('http://localhost:5000/auth/login', { email, password }, { withCredentials: true });
            set({authUser: res.data});
            console.log("result", res.data);
            console.log(res.data.isVerified);
            if(res.data.isVerified){
                console.log("entering if block");
                toast.success("Login successful! Redirecting to home...");
                navigate("/home")
            }else{
                console.log("entering else block");
                toast.success("Login successful! Redirecting to verification page...");
                navigate("/verify")
                //have to call the option to send the mail again
            }
        } catch (err) {
            console.log(err.response?.data?.message || "Login failed. Please try again.");
            toast.error(err.response?.data?.message || "Login failed. Please try again.");  
        }
    },

    logout: async(navigate) => {
        try {
            const res = await axios.post('http://localhost:5000/auth/logout', {},{ withCredentials: true });
            set({authUser: null});
            console.log("result", res);
            toast.success("Logged out successful! Redirecting to Login...");
            navigate("/")
        } catch (err) {
            console.log(err.response?.data?.message || "Logout failed. Please try again.");
            toast.error(err.response?.data?.message || "Logout failed. Please try again.");  
        }
    },

    verifyEmail: async(verificationCode, navigate) =>{
        try {
            const authUser = get().authUser;
            const email = authUser.email;
            console.log(email, verificationCode)
            if (!authUser || !authUser.email) {
                toast.error("No user found. Please Sign up first.");
                return; 
            }
            const res = await axios.post('http://localhost:5000/auth/verify', {email, verificationCode}, { withCredentials: true });
            console.log("result", res);
            toast.success("Veirifed successfully! Redirecting to Login...");
            navigate("/")
            
        } catch (err) {
            console.log(err.response?.data?.message || "Verification failed. Please try again.");
            toast.error(err.response?.data?.message || "Verification failed. Please try again.");  
        }
    },
    

  })
  
  const useAuthStore = create(useAuth);
  export default useAuthStore
