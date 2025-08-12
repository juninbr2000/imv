import React, { useState, useEffect } from 'react'

import { useAuthentication } from '../../../hooks/useAuthentication';

import { FaLock, FaEnvelope } from 'react-icons/fa'
import styles from './Login.module.css'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const {login, error: AuthError, loading} = useAuthentication()

    const handleSubmit = async (e) => {
        e.preventDefault()

        setError("")

        const user = {
            email,
            password,
        }
    
        const res = await login(user)
    }

    useEffect(()=>{
        if(AuthError){
            setError(AuthError)
        }
    })

  return (
    <div>
        <form onSubmit={handleSubmit} className={styles.form_container}>
            <p className={styles.header_msg}>Em caso de duvidas entre em contato com a administração da pagina.</p>
            <label className={styles.label_input}>
                <span><FaEnvelope/> Email: </span>
                <input type="email" placeholder='Email do administrador' value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label className={styles.label_input}>
                <span><FaLock/> Senha: </span>
                <input type="password" placeholder='Senha do administrador' value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            {!loading && <button className='primary_btn'>Acessar</button>}
            {loading && <button className='primary_btn' disabled>Aguarde...</button>}
            {error && <p className='error'>{error}</p>}
        </form>
    </div>
  )
}

export default Login