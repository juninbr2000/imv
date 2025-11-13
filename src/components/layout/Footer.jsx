import React from 'react'
import { FaFacebook, FaInstagram, FaTelegram, FaYoutube, FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

const Footer = () => {
  return (
    <div className={styles.footer_container}>
        <div className={styles.logo_info}>
          <img src="Logo2.svg" alt="" />
          <div>
              <h3>Luiza Messias Gentil</h3>
              <p>Creci: MG 56928</p>
              <h3>Edson Gentil</h3>
              <p>Creci: MG 63061</p>
          </div>
        </div>
        <div className={styles.contact}>
            <Link to='/'>Inicio <FaArrowRight/></Link>
            <Link to='/contato'>Contato <FaArrowRight/></Link>
            <Link to='/sobre'>Sobre Nós <FaArrowRight/></Link>
            <Link to='/anuncie'>Anuncie seu imóvel <FaArrowRight/></Link>
            <p>Todas as imagens neste site foram publicadas com autorização dos proprietarios*</p>
        </div>
        <div className={styles.social}>
            <h3>Nossas Redes Sociais:</h3>
            <Link to='https://www.facebook.com/share/3FDMxtVPRnZD7dKJ/?mibextid=qi20mg' target='_blank' aria-label='facebook'><FaFacebook/></Link>
            <Link to='https://www.instagram.com/luiza_mgcorretora/?next=%2F' target='_blank' aria-label='instagram'><FaInstagram/></Link>
            <Link to='https://youtube.com/@imoveisgentil' target='_blank' aria-label='youtube'><FaYoutube/></Link>
            <Link to='https://t.me/Imoveisgentil' target='_blank' aria-label='telegram'><FaTelegram/></Link>
        </div>
        {/* <h4 className={styles.copy}>Imoveis-Gentil ©2025</h4> */}
        <div className={styles.credit}>
            <p>Feito por <Link to='https://juninbr2000.github.io/portfolio/' target='_blank' >&lt;Edson Junior/&gt;</Link></p>
        </div>
    </div>
  )
}

export default Footer