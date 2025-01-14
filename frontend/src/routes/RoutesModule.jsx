import { Routes, Route, Navigate } from "react-router-dom";
import React from 'react'
import Signup from "../components/Signup"
import Login from "../components/Login";
import Home from "../components/Home";
import VerifyEmail from "../components/VerifyEmail";
import useAuthStore from "../store/useAuthStore";

function RoutesModule() {
  const authUser = useAuthStore.getState().authUser;
  return (
    <Routes>
        <Route path="/" element={!authUser ? <Login /> : authUser.isVerified ? <Navigate to="/home" /> : <Navigate to="/verify" />} />
        <Route path = '/signup' element={!authUser? <Signup/>: <Navigate to="/home"/>}></Route> {/*add verify logic if needed for signup*/}
        <Route path = '/home' element={authUser ? <Home /> : <Navigate to="/" />}></Route>
        <Route path = '/verify' element={<VerifyEmail/>}></Route>
        {/* <Route path = '/login' element={<Login/>}></Route> */}
    </Routes>
  )
}

export default RoutesModule