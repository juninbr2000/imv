import React from 'react'
import styles from './DestaqueCard.module.css'
import { FaArrowRight } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const DestaqueCard = () => {
  const navigate = useNavigate()
  return (
    <div className={styles.destaqueCard}> 
        <div className={styles.content}>
            <h2>Js Residencial</h2>
            <p>Lotes apartir de R$ 264.000,00</p>
            <button className={styles.btn} onClick={() => navigate('/js-residencial')}>Ver mais <FaArrowRight /></button>
        </div>
        <p className={styles.widget}>Lançamento</p>
    </div>
  )
}

export default DestaqueCard