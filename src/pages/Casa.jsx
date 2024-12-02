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
        setVideoSelected(false)
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
          <svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M44 20C44 18.4087 43.3679 16.8826 42.2426 15.7574C41.1174 14.6321 39.5913 14 38 14M38 38C41.7861 37.9989 45.4754 36.804 48.5432 34.5852C51.6111 32.3665 53.9012 29.2369 55.0878 25.6416C56.2744 22.0463 56.2972 18.1683 55.1528 14.5593C54.0084 10.9503 51.7552 7.79408 48.7136 5.5395C45.672 3.28492 41.9969 2.04682 38.2111 2.0013C34.4253 1.95579 30.7216 3.10517 27.6266 5.28598C24.5317 7.46678 22.2033 10.568 20.9725 14.1484C19.7416 17.7288 19.6711 21.6062 20.771 25.229L20 26L2.879 43.121C2.31635 43.6835 2.00017 44.4464 2 45.242V53C2 53.7956 2.31607 54.5587 2.87868 55.1213C3.44129 55.6839 4.20435 56 5 56H11C11.7956 56 12.5587 55.6839 13.1213 55.1213C13.6839 54.5587 14 53.7956 14 53C14 52.2044 14.3161 51.4413 14.8787 50.8787C15.4413 50.3161 16.2044 50 17 50C17.7956 50 18.5587 49.6839 19.1213 49.1213C19.6839 48.5587 20 47.7956 20 47C20 46.2044 20.3161 45.4413 20.8787 44.8787C21.4413 44.3161 22.2044 44 23 44H24.758C25.5536 43.9998 26.3165 43.6837 26.879 43.121L32 38L32.771 37.229C34.4666 37.7419 36.2286 38.0017 38 38Z" stroke="#192436" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <p>Carregando...</p>
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
      navigate('/not-found')
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