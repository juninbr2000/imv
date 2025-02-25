import React from 'react'
import styles from './LoadingCasa.module.css'

const LoadingCasa = () => {
  return (
    <div>
        <div className={styles.Image}></div>
        <div className={styles.content}>
            <span className={styles.title}></span>
            <span className={styles.value}></span>
            <span className={styles.local}></span>
            <div className={styles.items}>
              <span className={styles.item}></span>
              <span className={styles.item}></span>
              <span className={styles.item}></span>
              <span className={styles.item}></span>
              <span className={styles.item}></span>
              <span className={styles.item}></span>
            </div>
            <span className={styles.description}></span>
        </div>
    </div>
  )
}

export default LoadingCasa