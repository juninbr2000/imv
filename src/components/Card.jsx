import React from 'react'
import { FaCarAlt, FaCamera, FaHome, FaWater, FaPlus, FaBed, FaShower } from "react-icons/fa"
import { BsArrowsAngleExpand } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'
import styles from './Card.module.css'

const Card = ({ venda }) => {
  const nanoseconds = venda.createDat.nanoseconds.toString();
  const tresdigitos = nanoseconds.substring(0, 3);
  const tempototal = venda.createDat.seconds + tresdigitos
  const date = new Date()
  const s = date.getTime()
  const tresdias = 259200000
  const navigate = useNavigate()
  return (
    <div className={styles.card_container} onClick={() => navigate(`/${venda.id}`)}>
        <div className={styles.card_images}>
            {venda.imagens !== undefined ? <img src={venda.imagens[0]} alt="" /> : <div className={styles.noPic}><FaCamera/></div>}
            {s - tempototal <= tresdias && <div className={styles.tag}><p><FaPlus/>Novo</p></div>}
        </div>
        <div className={styles.card_info}>
          <div className='price'>
            <h1>{venda.valor.toLocaleString('pt-br', {style: "currency", currency: "BRL"})}</h1>
            {venda.aluguel && <p className='aluguel'>/Mês</p>}
          </div>
            <h3>{venda.titulo}</h3>
            <div className={styles.fast_info}>
              <div>
                {venda.quartos > 0 && <p><FaBed/> {venda.quartos} Quartos</p>}
                {venda.banheiros > 0 && <p><FaShower/> {venda.banheiros} Banheiros</p>}
                {venda.area > 0 && (venda.quartos === 0 || venda.banheiros === 0) && <p><BsArrowsAngleExpand/> {venda.area} m²</p>}
              </div>
              <div>
                {venda.garagem && <p><FaCarAlt/> Garagem</p>}
                {venda.piscina && <p><FaWater/> Piscina</p>}
              </div>
            </div>
            
        </div>
        <div className={styles.button_area}>
          <Link to={`/${venda.id}`} className='primary_btn'>Mais Informações</Link>
        </div>
    </div>
  )
}

export default Card