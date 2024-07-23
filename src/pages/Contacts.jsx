import React from 'react'
import { FaClock, FaCalendar, FaPhone, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom'

import styles from './Contacts.module.css'

const Contacts = () => {
  return (
    <div className={styles.contact_container}>
        <div>
            <h3>Horário de Atendimento</h3>
            <p><FaCalendar/> de Segunda a Sexta</p>
            <p><FaClock/> das 8h00 às 16h00</p>
        </div>
        <div>
            <h4>Email:</h4>
            <p><FaEnvelope/> imoveisgentil.mg@gmail.com</p>
            <h4>Telefone:</h4>
            <p><FaPhone/> (35) 9 9899-0790</p>
            <p><FaPhone/> (35) 9 9168-1045</p>
            <Link to={'https://wa.me/5535998990790'} className={styles.wppBtn}>Entre em contato pelo Whatsapp <FaWhatsapp/></Link>
        </div>
        <div>
          <h4>Onde estamos:</h4>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29599.082617313965!2d-45.3702459746287!3d-21.977363767488516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cb190969bb9a2b%3A0x8fd3de5f1c54d721!2sLambari%2C%20MG%2C%2037480-000!5e0!3m2!1spt-BR!2sbr!4v1713375740284!5m2!1spt-BR!2sbr" width="100%" height="220" allowFullscreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
    </div>
  )
}

export default Contacts