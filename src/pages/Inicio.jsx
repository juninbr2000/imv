import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Inicio = () => {
    const [password, setpassword] = useState('')
    const [erro, seterro] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        if(password.value === 'frangoAMilanesa007'){
            navigate('/home')
        } else {
            seterro('nao é essa')
        }
    }
    

  return (
    <div style={{display: 'flex', position: 'fixed', width: '100vw', height: '100vh', backgroundColor: '#fefefe', alignItems: 'center', justifyContent: 'center'}}>
        <form onSubmit={handleSubmit}>
            <label>
                <span>senha de acesso:</span>
                <input type="password" value={password} onChange={(e) => setpassword(e.target.value)}/>
            </label>
            <button className='send' type='submit'>Entrar</button>
            {erro !== '' && <p>{erro}</p>}
        </form>

    </div>
  )
}

export default Inicio