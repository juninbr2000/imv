import { useParams, useNavigate, Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react';

import { useFetchDocument } from '../../hooks/useFetchDocument';
import { getRecomendations } from '../../hooks/useFetchRecomendations'

import { FaCar, FaWater, FaCouch, FaPhone, FaEnvelope, FaBed, FaShower, FaArrowLeft, FaArrowRight, FaTv, FaGlassMartini, FaUtensils, FaUmbrellaBeach, FaTree, FaImage, FaVideo, FaVideoSlash } from 'react-icons/fa';
import { BsArrowsAngleExpand } from 'react-icons/bs'
import { BiSolidWasher } from 'react-icons/bi'

import styles from './Casa.module.css'
import WhatsappBtn from '../../components/WhatsappBtn';
import Card from '../../components/Card';
import LoadingCasa from '../../UI/LoadingCasa';
import MidiaControl from '../../components/Media/MediaControl';

const Casa = () => {

    const { id } = useParams();
    const { document: venda , loading} = useFetchDocument("venda", id) 
    const navigate = useNavigate()
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
      setRecomendado([])

      if(venda){

        //altera as meta tags para facilitar buscas por mecanismos
        setCarac(venda.caracteristicas || [])
        document.title = `${venda.venda === true ? 'Vende-se ': 'Aluga-se '}${venda.titulo} | Luiza Gentil Corretora de Imóveis`

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
          document.title = 'Luiza Gentil | Corretora de Imóveis';
          if(MetaDescription){
            MetaDescription.setAttribute('content', 'Somos especialistas em encontrar o lar perfeito para você e sua família. Com uma abordagem gentil e personalizada, oferecemos uma ampla seleção de propriedades que atendem às suas necessidades e estilo de vida. Deixe-nos ajudá-lo a encontrar o lar dos seus sonhos com a gentileza e a expertise que você merece.')
          }
        };
      }
    }, [id, venda])

    if(loading){
        return <LoadingCasa />
    }

    if(!venda && loading === false){
      navigate('*')
    }
    
  return (
    <div>
        {venda && <div className={styles.casa_container}>
          <MidiaControl imagens={venda.imagens} video={venda.video} />
          <div className={styles.casa_info_cont}>
            <h1 className={styles.title}>{venda.titulo}</h1>
              
            <div className='price'>
              <h2>{venda.valor.toLocaleString("pt-br", {style: 'currency', currency: 'BRL'})}</h2>
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