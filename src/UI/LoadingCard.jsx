import React from 'react'
import styles from './LoadingCard.module.css'

const LoadingCard = () => {
  return (
    <div className={styles.container}>
        <span className={styles.image}></span>
        <div className={styles.info}>
            <span className={styles.value}></span>
            <span className={styles.title}></span>
            <div className={styles.items}>
                <span className={styles.item}></span>
                <span className={styles.item}></span>
                <span className={styles.item}></span>
                <span className={styles.item}></span>
            </div>
            <p className={styles.loading_btn}></p>
        </div>
    </div>
  )
}

export default LoadingCard