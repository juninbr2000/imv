import React, { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'

import {FaBars} from 'react-icons/fa'
import { BiX } from 'react-icons/bi'

import { useAuthentication } from "../../hooks/useAuthentication"
import { useAuthValue } from "../../context/AuthContext"

import styles from "./NavBar.module.css"

const NavBar = () => {

  const {user} = useAuthValue();
  const {logout} = useAuthentication()
  const [menuOpen, setMenuOpen] = useState(false)

  const IsMenuOpen = () => {
    setMenuOpen(!menuOpen)
  }
  const windowSize = window.innerWidth

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 788 || windowSize > 787) {
        setMenuOpen(true);
      } else {
        setMenuOpen(false);
      }
    };

    handleResize()

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className={styles.nav_container}>
        <div className={styles.logo}>
          <Link to={"/"} aria-label='Inicio'>
            <img src="Logo.svg" alt="Luiza gentil & Edson Gentil Corretores de Imoveis" />
          </Link>
        </div>
            
        <button className={styles.btn_menu} onClick={IsMenuOpen} aria-label='menu'>
          {menuOpen === false ? <FaBars/> : <BiX/>}
        </button>
        {menuOpen === true && (
          <div className={styles.menu}>
            <ul>
              <li><NavLink to='/'className={({isActive}) => isActive ? styles.active : '' } >Inicio</NavLink></li>
              <li><NavLink to='/sobre' className={({isActive}) => isActive ? styles.active : '' }>Sobre Nós</NavLink></li>
              <li><NavLink to='/contato' className={({isActive}) => isActive ? styles.active : '' }>Contato</NavLink></li>
              {user && <li><NavLink to='/dashboard' className={({isActive}) => isActive ? styles.active : '' }>Dashboard</NavLink></li>}
              {user && <li><button onClick={logout} className={styles.logout}>Sair</button></li>}
            </ul>
          </div>
        )}
    </nav>
  )
}

export default NavBar