import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
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
import Anuncie from "./pages/Anuncie";

function App() {

  const [user, setUser] = useState(undefined)
  const {auth} = useAuthentication()

  
  // const loadingUser = user === undefined

  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })

  }, [auth])

  // if(loadingUser) {
  //   return <div className="spinner">
  //     <svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
  //       <path d="M44 20C44 18.4087 43.3679 16.8826 42.2426 15.7574C41.1174 14.6321 39.5913 14 38 14M38 38C41.7861 37.9989 45.4754 36.804 48.5432 34.5852C51.6111 32.3665 53.9012 29.2369 55.0878 25.6416C56.2744 22.0463 56.2972 18.1683 55.1528 14.5593C54.0084 10.9503 51.7552 7.79408 48.7136 5.5395C45.672 3.28492 41.9969 2.04682 38.2111 2.0013C34.4253 1.95579 30.7216 3.10517 27.6266 5.28598C24.5317 7.46678 22.2033 10.568 20.9725 14.1484C19.7416 17.7288 19.6711 21.6062 20.771 25.229L20 26L2.879 43.121C2.31635 43.6835 2.00017 44.4464 2 45.242V53C2 53.7956 2.31607 54.5587 2.87868 55.1213C3.44129 55.6839 4.20435 56 5 56H11C11.7956 56 12.5587 55.6839 13.1213 55.1213C13.6839 54.5587 14 53.7956 14 53C14 52.2044 14.3161 51.4413 14.8787 50.8787C15.4413 50.3161 16.2044 50 17 50C17.7956 50 18.5587 49.6839 19.1213 49.1213C19.6839 48.5587 20 47.7956 20 47C20 46.2044 20.3161 45.4413 20.8787 44.8787C21.4413 44.3161 22.2044 44 23 44H24.758C25.5536 43.9998 26.3165 43.6837 26.879 43.121L32 38L32.771 37.229C34.4666 37.7419 36.2286 38.0017 38 38Z" stroke="#192436" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
  //     </svg>
  //   </div>
  // }

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
