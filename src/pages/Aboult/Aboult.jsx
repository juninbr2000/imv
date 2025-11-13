import React from 'react'
import { FaBuilding, FaHome, FaUserFriends, FaPhone, FaWhatsapp, FaArrowRight , FaClipboardList} from 'react-icons/fa'
import styles from './About.module.css'
import { useNavigate, Link } from 'react-router-dom'

const Aboult = () => {
  const navigate = useNavigate()

  window.scrollTo(0, 0)

  return (
    <div>
        <div className={styles.card}>
          <img src="Logo2.svg" alt="" />
          <h1>Ajudando você a encontrar um lar ideal</h1>
        </div>
        <div className={styles.aboult}>
          <h2>Sobre Nós</h2>
          <p>Imóveis Gentil agora é Luiza Gentil Corretora de Imóveis, iniciamos a nossa jornada no mercado de imóveis no ano de 2024, e estamos sempre em busca de facilitar a sua vida, desde a venda, compra ou aluguel do seu imóvel</p>
        </div>
        <div className={styles.service}>
          <h2>Nossos serviços</h2>
          <ul>
            <li>
              <div className={styles.icons}>
                <FaHome/>
              </div>
              <h3>Venda de imóveis</h3>
              <p>Oferecemos serviços completos para ajudá-lo a vender seu imóvel com facilidade e eficiência, estamos aqui para guiá-lo em cada etapa do processo.</p>
            </li>
            <li>
              <div className={styles.icons}>
                <FaBuilding/>
              </div>
              <h3>Aluguel de Imóveis</h3>
              <p>Se você está procurando alugar um imóvel. Estamos sempre dispostos a encontrar o imóvel perfeito para você.</p>
            </li>
            <li>
              <div className={styles.icons}>
                <FaClipboardList/>
              </div>
              <h3>Avaliação de Imóveis</h3>
              <p>Oferecemos serviços de avaliação de imóveis precisos e confiáveis para ajudá-lo a determinar o valor de mercado da sua propriedade.</p>
            </li>
          </ul>
        </div>
        <div className={styles.contacts}>
          <div>
            <h2>Quer entrar em contato</h2>
            <p>Estamos a disposição para tirar todas as suas duvidas.</p>
            <Link to={'https://wa.me/5535998990790'} className={styles.numb}> Por Whatsapp <FaWhatsapp/></Link>
            <p className={styles.numb2}>Ou</p>
            <button className='primary_btn' onClick={()=> navigate('/contato')}>Por Outros Contatos <FaArrowRight/></button>
          </div>
        </div>
    </div>
  )
}

export default Aboult