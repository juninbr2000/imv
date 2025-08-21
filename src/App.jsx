import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useState, useEffect } from "react";

import { onAuthStateChanged } from 'firebase/auth';

import { AuthProvider } from "./context/AuthContext";

import { useAuthentication } from './hooks/useAuthentication';

import NavBar from "./components/layout/NavBar"
import Home from "./pages/Home/Home"
import Casa from "./pages/Casa/Casa"
import Dashboard from "./pages/admin/Dashboard/Dashboard"
import Login from "./pages/admin/Login/Login"
import CreateDoc from "./pages/admin/CreateDoc/CreateDoc";
import Contacts from "./pages/Contacts/Contacts";
import EditDoc from "./pages/admin/EditDoc/EditDoc";
import Footer from "./components/layout/Footer";
import Aboult from "./pages/Aboult/Aboult";
import NotFound from "./pages/NotFound/NotFound";
import CookieConset from "./components/layout/CookieConsent";
import Anuncie from "./pages/Anuncie/Anuncie";

function App() {

  const [user, setUser] = useState(undefined)
  const {auth} = useAuthentication()

  useEffect(() => {
    console.log(user)
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })

  }, [auth])

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
          <Route path="/anuncie" element={<Anuncie />} />
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
