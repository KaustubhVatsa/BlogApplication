import { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';

import './App.css'
import RoutesModule from './routes/RoutesModule.jsx'
import useAuthStore from './store/useAuthStore.js'
import { CircularProgress } from '@mui/material'
function App() {
  const isCheckingAuth = useAuthStore.getState().isCheckingAuth
  const {checkAuth} = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [])
  if (isCheckingAuth) {
    return <CircularProgress />;
  }


  return (
    
    <>
   <div>
      <RoutesModule />
      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false} 
        closeOnClick 
        pauseOnHover 
        draggable 
        theme="colored" 
    />
    </div>
    </>
  )
}

export default App
