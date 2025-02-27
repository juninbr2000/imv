import React from 'react'
import { FaCamera, FaCar, FaWater, FaCouch, FaBed, FaShower, FaTv, FaGlassMartini, FaUtensils, FaUmbrellaBeach, FaTree, FaPlus, FaCrown } from 'react-icons/fa';
import { BsArrowsAngleExpand } from 'react-icons/bs'
import { BiSolidWasher } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'
import styles from './Card.module.css'

const Card = ({ venda }) => {
  const nanoseconds = venda.createDat.nanoseconds.toString();
  const tresdigitos = nanoseconds.substring(0, 3);
  const tempototal = venda.createDat.seconds + tresdigitos
  const date = new Date()
  const s = date.getTime()
  const tresdias = 432000000
  const navigate = useNavigate()
  const caracteristicas = venda.caracteristicas || []

  const iconMap = {
    FaBed: <FaBed/>,
    FaShower: <FaShower/>,
    FaTv: <FaTv/>,
    FaGlassMartini: <FaGlassMartini/>,
    FaUtensils: <FaUtensils/>,
    FaUmbrellaBeach: <FaUmbrellaBeach/>,
    BiSolidWasher: <BiSolidWasher/>,
    FaWater: <FaWater/>,
    FaCar: <FaCar/>,
    FaCouch: <FaCouch/>,
    FaTree: <FaTree/>,
  }
  
  return (
    <div className={styles.card_container} onClick={() => navigate(`/${venda.id}`)}>
        <div className={styles.card_images}>
            {venda.imagens ? <img src={venda.imagens[0]} alt="" loading="lazy" width={280} height={200}/> : <div className={styles.noPic}><FaCamera/></div>}
            {s - tempototal <= tresdias && <div className={styles.tag}><p><FaPlus/>Novo</p></div>}
            {venda.exclusive && <div className={styles.tag}><p><FaCrown/> Exclusivo</p></div>}
        </div>
        <div className={styles.card_info}>
          <div className='price'>
            <h1>{venda.valor.toLocaleString('pt-br', {style: "currency", currency: "BRL"})}</h1>
            {venda.aluguel && <p className='aluguel'>/Mês</p>}
          </div>
            <h3>{venda.titulo}</h3>
            {venda.tipo === 'Terreno' ? (venda.area > 0 && <p style={{fontSize: '.9em', textAlign: 'center', marginTop: '10px'}}><BsArrowsAngleExpand/> {venda.area} m²</p>) : 
            (venda && caracteristicas.length > 0 ? <div className={styles.fast_inf}>
              {caracteristicas.filter(itens => itens.ativado === 'true').slice(0, 4).map(item => (
                <p key={item.id}>{iconMap[item.icon]} {item.quantidade} {item.name}</p>
              ))}
            </div>
            :
            <div className={styles.fast_info}>
              <div>
                {venda.quartos > 0 && <p><FaBed/> {venda.quartos} Quartos</p>}
                {venda.banheiros > 0 && <p><FaShower/> {venda.banheiros} Banheiros</p>}
                {venda.area > 0 && (venda.quartos === 0 || venda.banheiros === 0) && <p><BsArrowsAngleExpand/> {venda.area} m²</p>}
              </div>
              <div>
                {venda.garagem && <p><FaCar/> Garagem</p>}
                {venda.piscina && <p><FaWater/> Piscina</p>}
              </div>
            </div>)}
            
        </div>
        <div className={styles.button_area}>
          <Link to={`/${venda.id}`} className='primary_btn'>Mais Informações</Link>
        </div>
    </div>
  )
}

export default Card