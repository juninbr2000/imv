import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';

import { useFetchDocument } from '../hooks/useFetchDocument';

import { FaCamera, FaCarAlt, FaWater, FaHome, FaPhone, FaEnvelope, FaBed, FaShower, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { BsArrowsAngleExpand } from 'react-icons/bs'

import styles from './Casa.module.css'
import WhatsappBtn from '../components/WhatsappBtn';

const Casa = () => {

    const { id } = useParams();
    const { document: venda , loading} = useFetchDocument("venda", id)
    const [i, setI]= useState(0)
    const [currentIndex, setCurrentIndex] = useState(0)
    const navigate = useNavigate()

    if(loading){
        return <div className="spinner">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        </div>;
    }

    const nextImage = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % venda.imagens.length)
    }
    
    const prevImage = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? venda.imagens.length - 1 : prevIndex - 1
      )
    }

    if(venda === undefined){
      navigate('not-found')
    }

    if(!loading){
      window.scrollTo(0, 0)
    }

  return (
    <div>
        {venda && <div className={styles.casa_container}>
          <div className={styles.imagens_container}>
            {venda.imagens !== undefined ? <img src={venda.imagens[currentIndex]} alt="" /> : <div className={styles.noPic}><div className={styles.line}></div><FaCamera/></div>}
            <div className={styles.change_image}>
              {venda.imagens !== undefined && venda.imagens.map((imagem, index)=> <label  className={styles.image_label} key={index}>
                <input type='radio' name='images' value={index} checked={index === currentIndex} onChange={() => setCurrentIndex(index)}/>
                <span></span>
                </label>)}
                {venda.imagens !== undefined && <div className={styles.control}>
                  <button onClick={() => prevImage()}><FaArrowLeft/></button>
                  <button onClick={() => nextImage()}><FaArrowRight/></button>
                </div>}
            </div>
          </div>   
          <div className={styles.casa_info_cont}>
            <h2 className={styles.title}>{venda.titulo}</h2>
              
            <div className='price'>
              <h1>{venda.valor.toLocaleString("pt-br", {style: 'currency', currency: 'BRL'})}</h1>
              {venda.aluguel && <p className='aluguel'>/ Mês</p>}
            </div>
            {venda.endereco ? <p className={styles.address}><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.75 7.5C15.75 12.75 9 17.25 9 17.25C9 17.25 2.25 12.75 2.25 7.5C2.25 5.70979 2.96116 3.9929 4.22703 2.72703C5.4929 1.46116 7.20979 0.75 9 0.75C10.7902 0.75 12.5071 1.46116 13.773 2.72703C15.0388 3.9929 15.75 5.70979 15.75 7.5Z" stroke="#818181" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 9.75C10.2426 9.75 11.25 8.74264 11.25 7.5C11.25 6.25736 10.2426 5.25 9 5.25C7.75736 5.25 6.75 6.25736 6.75 7.5C6.75 8.74264 7.75736 9.75 9 9.75Z" stroke="#818181" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>{venda.endereco}</p> : <p><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.75 7.5C15.75 12.75 9 17.25 9 17.25C9 17.25 2.25 12.75 2.25 7.5C2.25 5.70979 2.96116 3.9929 4.22703 2.72703C5.4929 1.46116 7.20979 0.75 9 0.75C10.7902 0.75 12.5071 1.46116 13.773 2.72703C15.0388 3.9929 15.75 5.70979 15.75 7.5Z" stroke="#818181" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 9.75C10.2426 9.75 11.25 8.74264 11.25 7.5C11.25 6.25736 10.2426 5.25 9 5.25C7.75736 5.25 6.75 6.25736 6.75 7.5C6.75 8.74264 7.75736 9.75 9 9.75Z" stroke="#818181" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg> Endereço indisponivel</p>}
            
            <div className={styles.fast_info}>
              <div>
                {venda.quartos > 0 && <p><FaBed/> {venda.quartos} Quartos</p>}
                {venda.banheiros > 0 && <p><FaShower/> {venda.banheiros} Banheiros</p>}
                {venda.area > 0 && <p><BsArrowsAngleExpand/>Area: {venda.area}m²</p>}           
              </div>
              <div>
                {venda.piscina && <p><FaWater/> Piscina</p>}
                {venda.garagem ? <p><FaCarAlt/> Garagem</p> : ''}
              </div>
            </div>
            {venda.descricao && venda.descricao !== "" && <>
            <h2 className={styles.title}>Descrição</h2>
            <p className={styles.description}>{venda.descricao}</p>
            </>}
            <h4>Agende já uma visita!</h4>
          </div>
        </div>}
        <div className={styles.contact}>
          <h2>Contato</h2>
          <h4><FaPhone/> Telefone: <span>(35) 9 9899-0790</span></h4>
          <h4><FaEnvelope/> Email: <span>imoveisgentil.mg@gmail.com</span> </h4> 
        </div>
        {venda && <WhatsappBtn mensagem={`Olá, o imovel: ${venda.titulo}, localizado em: ${venda.endereco}, ainda está disponivel?`}/>}
    </div>
  )
}

export default Casa