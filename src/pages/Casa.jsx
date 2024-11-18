import { useParams, useNavigate, Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react';

import { useFetchDocument } from '../hooks/useFetchDocument';
import { getRecomendations } from '../hooks/useFetchRecomendations'

import { FaCamera, FaCar, FaWater, FaCouch, FaPhone, FaEnvelope, FaBed, FaShower, FaArrowLeft, FaArrowRight, FaTv, FaGlassMartini, FaUtensils, FaUmbrellaBeach, FaTree, FaImage, FaVideo, FaVideoSlash } from 'react-icons/fa';
import { BsArrowsAngleExpand } from 'react-icons/bs'
import { BiSolidWasher } from 'react-icons/bi'

import styles from './Casa.module.css'
import WhatsappBtn from '../components/WhatsappBtn';
import Card from '../components/Card';

const Casa = () => {

    const { id } = useParams();
    const { document: venda , loading} = useFetchDocument("venda", id) 
    const [currentIndex, setCurrentIndex] = useState(0)
    const [videoSelected, setVideoSelected] = useState(false)
    const navigate = useNavigate()
    const [embedUrl, setEmbedUrl] = useState('')
    const [recomendado, setRecomendado] = useState([])
    const [carac, setCarac] = useState([])
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

    useEffect(() => {
      window.scrollTo(0, 0)

      setCarac([])
      setCurrentIndex(0)
      setRecomendado([])

      if(venda){
        if(venda.video){
          setEmbedUrl(getEmbedUrl(venda.video))
        }

        //altera as meta tags para facilitar buscas por mecanismos
        setCarac(venda.caracteristicas || [])
        document.title = `${venda.venda === true ? 'Vende-se ': 'Aluga-se '}${venda.titulo} | Imóveis Gentil`

        const MetaDescription = document.querySelector('meta[name="description"]')
        if(MetaDescription) {
          MetaDescription.setAttribute('content', `Valor: ${venda.valor.toLocaleString('pt-br', {'style': 'currency', 'currency': 'BRL'})}. Sobre o Imovel: ${venda.descricao}.`)
        }

        //Busca Imoveis com tipo e valor
        getRecomendations(id, venda.valor, venda.tipo)
        .then(data => setRecomendado(data))
        .catch(error => console.error("Erro ao carregar recomendações:", error));

        return () => {
          //retorna os valores padroes das meta tags
          document.title = 'Imóveis Gentil | Lambari MG';
          if(MetaDescription){
            MetaDescription.setAttribute('content', 'Bem-vindo à Imóveis Gentil. Somos especialistas em encontrar o lar perfeito para você e sua família. Com uma abordagem gentil e personalizada, oferecemos uma ampla seleção de propriedades que atendem às suas necessidades e estilo de vida. Deixe-nos ajudá-lo a encontrar o lar dos seus sonhos com a gentileza e a expertise que você merece.')
          }
        };
      }
    }, [id, venda])

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

    if(!venda && loading === false){
      navigate('not-found')
    }

    const getEmbedUrl = (url) => {
      const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{11})/);
      return match ? `https://www.youtube.com/embed/${match[1]}` : null;
    };
    
    // if(!loading){
    //   window.scrollTo(0, 0)
    // }

  return (
    <div>
        {venda && <div className={styles.casa_container}>
          <div className={styles.imagens_container}>
            {venda.imagens !== undefined && !videoSelected ? 
              <img src={venda.imagens[currentIndex]} alt="" />
              :
              <div className={styles.noPic}>
                <iframe width="560" height="315" 
                  src={`${embedUrl}?autoplay=1&mute=1&rel=0`} 
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  referrerPolicy="strict-origin-when-cross-origin" 
                  allowFullScreen>
                </iframe>
              </div>
            }
            <div className={styles.change_image}>
              {venda.imagens !== undefined && !videoSelected && venda.imagens.map((imagem, index)=> <label  className={styles.image_label} key={index}>
                <input type='radio' name='images' value={index} checked={index === currentIndex} onChange={() => setCurrentIndex(index)}/>
                <span></span>
                </label>)}
                {venda.imagens !== undefined &&!videoSelected && <div className={styles.control}>
                  <button onClick={() => prevImage()}><FaArrowLeft/></button>
                  <button onClick={() => nextImage()}><FaArrowRight/></button>
                </div>}
                {venda.video ? <div className={styles.midiaControl}>
                  <button onClick={() => setVideoSelected(false)} className={styles.btnImageVideo}><FaImage/>{venda.imagens.length} Fotos</button>
                  <button onClick={() => setVideoSelected(true)}className={styles.btnImageVideo}><FaVideo/> Video</button>
                </div>
                :
                <div className={styles.midiaControl}>
                  <button onClick={() => setVideoSelected(false)} className={styles.btnImageVideo}><FaImage/> {venda.imagens.length} Fotos</button>
                  <button className={styles.btnImageVideo} disabled><FaVideoSlash/> Video</button>
                </div>
                }
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
            
            {venda.caracteristicas !== undefined ? <div className={styles.caracteristicasCont}>
              {carac.filter(itens => itens.ativado === 'true').map(item => (
                <div key={item.id} className={styles.itens}>
                  <p>{iconMap[item.icon]} {item.quantidade} {item.name}</p>
                </div>
              ))}
                {venda.area > 0 && <p style={{textAlign: 'center', width: '100%', marginTop: '20px'}}><BsArrowsAngleExpand/>Area: {venda.area}m²</p>}           
            </div>
            :
            <div className={styles.fast_info}>
              <div>
                {venda.quartos > 0 && <p><FaBed/> {venda.quartos} Quartos</p>}
                {venda.banheiros > 0 && <p><FaShower/> {venda.banheiros} Banheiros</p>}
                {venda.area > 0 && <p><BsArrowsAngleExpand/>Area: {venda.area}m²</p>}           
              </div>
              <div>
                {venda.piscina && <p><FaWater/> Piscina</p>}
                {venda.garagem ? <p><FaCar/> Garagem</p> : ''}
              </div>
            </div>}
            {venda.descricao && venda.descricao !== "" && <>
            <h2 className={styles.title}>Descrição</h2>
            {venda.descricao.split('\n').map((line, index) => (
              <p key={index} className={styles.description}>
                {line}
                <br/>
              </p>
            )) }
            </>}
            <Link to={'/contato'} className={styles.link}>Agende já uma visita! &gt;</Link>
          </div>
        </div>}
        <div className={styles.contact}>
          <h2>Contato</h2>
          <h4><FaPhone/> Telefone: <span>(35) 9 9899-0790</span></h4>
          <h4><FaEnvelope/> Email: <span>imoveisgentil.mg@gmail.com</span> </h4> 
        </div>

        {recomendado.length > 0 && <div className={styles.recomendations}>
          <h2>Você Pode se Interessar</h2>
          <div className={styles.recomendado_container}>
            {recomendado && recomendado.length > 0 ? recomendado.map((recomend) => <Card key={recomend.id} venda={recomend}></Card>) : <p>Nenhuma recomendaçao encontrada</p>}
          </div>
        </div>}

        {venda && <WhatsappBtn mensagem={`https://imoveisgentil.com.br/${id} %0A%0AID: ${id} %0A%0A *_Não Apague os Dados Acima_* %0A---------------------------------%0AOlá! O imóvel: ${venda.titulo}%0A•Valor: ${venda.valor.toLocaleString('pt-br',{'style': 'currency', 'currency': 'BRL'})},%0A•Localização: ${venda.endereco},%0AAinda está disponivel?`}/>}
    </div>
  )
}

export default Casa