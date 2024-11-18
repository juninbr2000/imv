import React from 'react'
import { FaClock, FaCalendar, FaPhone, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom'

import styles from './Contacts.module.css'

const Contacts = () => {

  window.scrollTo(0, 0)

  return (
    <div className={styles.contact_container}>
        <h1 className={styles.main_title}><span>Entre em Contato</span> com a Gente</h1>
        <div className={styles.local_cont}>
          <div className={styles.local_info}>
            <h3>Nosso Horario de Atendimento:</h3>
            <p><FaCalendar/> Segunda a Sexta</p>
            <p><FaClock/> 08:00 - 16:00</p>
          </div>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29599.082617313965!2d-45.3702459746287!3d-21.977363767488516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cb190969bb9a2b%3A0x8fd3de5f1c54d721!2sLambari%2C%20MG%2C%2037480-000!5e0!3m2!1spt-BR!2sbr!4v1713375740284!5m2!1spt-BR!2sbr" width="100%" height="220" allowFullScreen="" loading="eager" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <div className={styles.card_container}>
          <div className={styles.card}>
            <h2>Nosso Email</h2>
            <p>Você pode entrar em contato conosco pelo nosso email</p>
            <p className={styles.destaque}><FaEnvelope/> imoveisgentil.mg@gmail.com</p>
          </div>
          <div className={styles.card}>
            <h2>Nosso Telefone</h2>
            <p>Caso prefira, você tambem pode nos contatar pelo nosso Telefone</p>
            <p className={styles.destaque}><FaPhone/> +55 35 9 9899-0790</p>
          </div>
          <div className={styles.card}>
            <h2>Nosso Whatsapp</h2>
            <p>Também atendemos por Whatsapp. Basta clicar no botão abaixo</p>
            <Link className={styles.destaque} to={"https://wa.me/5535998990790"} target='_blank'><FaWhatsapp/> Converse com a Gente &gt;</Link>
          </div>
        </div>
    </div>
  )
}

export default Contacts