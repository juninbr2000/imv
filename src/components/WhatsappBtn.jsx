import React from 'react'
import { Link } from 'react-router-dom'
import { FaWhatsapp } from 'react-icons/fa'
import styles from './WhatsappBtn.module.css'

const WhatsappBtn = ({mensagem}) => {

  if(mensagem){
    const configMSG = mensagem.replace(/ /g, '%20')
    return (
      <Link to={`https://wa.me/5535998990790?text=${configMSG}`} text='Agendar por whatsapp' target='_blank' className={styles.stlBtn}>
          <FaWhatsapp/>
      </Link>
    )
  } else {  
    return (
      <Link to={`https://wa.me/5535998990790`} target='_blank' text="Converse com a gente" className={styles.stlBtn}>
        <FaWhatsapp/>
    </Link>
  )
  }
}

export default WhatsappBtn