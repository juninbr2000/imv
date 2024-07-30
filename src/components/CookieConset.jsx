import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie'
import styles from './CookieConcet.module.css'

const CookieConset = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(( ) => { 
        const cookiesAccepted = Cookies.get('cookiesAccepted');
        if(!cookiesAccepted){
            setIsVisible(true)
        }
    }, [])

    const acceptCookies = () => {
        Cookies.set('cookiesAccepted', 'true', {expires: 30})
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