import React from 'react'
import { Link } from 'react-router-dom'
import { FaWhatsapp } from 'react-icons/fa'
import styles from './WhatsappBtn.module.css'

const WhatsappBtn = ({mensagem}) => {

    const configMSG = mensagem.replace( / /g , '%20')

  return (
    <Link to={`https://wa.me/5535998990790?text=${configMSG}`} className={styles.stlBtn}>
        <FaWhatsapp/>
    </Link>
  )
}

export default WhatsappBtn