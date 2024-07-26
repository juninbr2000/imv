import React, { useEffect, useState } from 'react';
import styles from './CookieConcet.module.css'

const CookieConset = () => {
    const [isVisible, setIsVisible] = useState('false');

    useEffect(( ) => { 
        const cookeisAccepted = localStorage.getItem('cookiesAccepted');
        if(!cookeisAccepted){
            setIsVisible(true)
        }
    }, [])

    const acceptCookies = () => {
        localStorage.setItem('cookiesAccepted', 'true')
        setIsVisible(false)
    }

    if(!isVisible) return null;

    return (
        <div className={styles.cookieBanner}>
            <p>Utilizamos cookies para melhorar sua experiência no nosso site. Ao continuar navegando você concorda com a nossa politica de privacidade.</p>
            <button onClick={acceptCookies} className={styles.acceptButton}>Aceitar</button>
        </div>
    )
}

export default CookieConset