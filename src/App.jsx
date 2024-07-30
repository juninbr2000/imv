import { BrowserRouter, Routes, Route, Navigate, Router } from "react-router-dom"
import { useState, useEffect } from "react";

import { onAuthStateChanged } from 'firebase/auth';

import { AuthProvider } from "./context/AuthContext";

import { useAuthentication } from './hooks/useAuthentication';

import NavBar from "./components/NavBar"
import Home from "./pages/Home"
import Casa from "./pages/Casa"
import Dashboard from "./pages/admin/Dashboard"
import Login from "./pages/admin/Login"
import CreateDoc from "./pages/admin/CreateDoc";
import Contacts from "./pages/Contacts";
import EditDoc from "./pages/admin/EditDoc";
import Footer from "./components/Footer";
import Aboult from "./pages/Aboult";
import NotFound from "./pages/NotFound";
import CookieConset from "./components/CookieConset";

function App() {

  const [user, setUser] = useState(undefined)
  const {auth} = useAuthentication()

  
  const loadingUser = user === undefined

  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })

  }, [auth])

  if(loadingUser) {
    return <div className="spinner">
    <div className="dot"></div>
    <div className="dot"></div>
    <div className="dot"></div>
    <div className="dot"></div>
    <div className="dot"></div>
    </div>
  }

  return (
    <>
      <CookieConset />
      <AuthProvider value={{user}}>
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home /> } />
          <Route path="/:id" element={<Casa />} />
          <Route path="/contato" element={<Contacts />} />
          <Route path="/sobre" element={<Aboult />} />
          <Route path="/dashboard" element={!user ? <Login/> : <Dashboard />} />
          <Route path='/admLogin' element={!user ? <Login/> : <Navigate to="/dashboard"/>}/>
          <Route path="/create" element={!user? <Login/> : <CreateDoc/>} />
          <Route path="/edit/:id" element={!user? <Login/> : <EditDoc/>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
      </AuthProvider>

    </>
  )
}

export default App
