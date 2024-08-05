import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useAuthValue } from '../../context/AuthContext'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { useDeleteDocument } from '../../hooks/useDeleteDocuments'

import { FaCamera, FaTrashAlt, FaPenAlt, FaInfo } from 'react-icons/fa'
import styles from './Dashboard.module.css'
import { average } from 'firebase/firestore'


const Dashboard = () => {

    const { user } = useAuthValue()
    const {documents: venda, loading} = useFetchDocuments("venda")
    const { deleteDocument, response } = useDeleteDocument("venda")
    const navigate = useNavigate();


    const handleDelete = (id, titulo, imagens) => {
      const apaga = window.confirm(`tem certeza que quer remover ${titulo}? essa ação nao podera ser desfeita.`)
      if(apaga){
        deleteDocument(id, imagens)
      } else {
        return
      }
    }

    const aVenda = venda ? venda.filter(imovel => imovel.venda) : [] 
    const ganhos = aVenda.reduce((total, imoveis) => {
      return total + (imoveis.valor * (5 / 100)) 
   }, 0) 

  return (
    <div className={styles.dashboard_container}>
        <header className={styles.header}>
          {user.dispalyName ? <h1>Olá, {user.dispalyName}!</h1> : <h1>Olá! Bem Vindo(a)</h1>}

          <div className={styles.geralInfo}>
            <div>
              <p>Total de imoveis</p>
              {venda && <h2>{venda.length}</h2>}
            </div>
            <div>
              <p>Imoveis a venda</p>
              {venda && <h2>{aVenda.length}</h2>}
            </div>
            <div>
              <p>Possiveis ganhos com vendas</p>
              {venda && <h2>{ganhos.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</h2>}
            </div>
          </div>

          <div className={styles.fast_actions}>
            <h5>Lista de Imoveis</h5>
            <button className={styles.button_add} onClick={() => navigate('/create')}>+ Imoveis</button>
          </div>
        </header>
        <section className={styles.card_area}>
          {venda ? venda.map((casa) => <div key={casa.id} className={styles.card_container}>
            {casa.imagens && casa.imagens.length > 0 ? <div className={styles.image_card}>
                <img src={casa.imagens[0]} className={styles.img}/>
              </div>
            :
              <div className={styles.image_card} >
                <FaCamera />
              </div>
            }
            <Link to={`/${casa.id}`} className={styles.casa_info}>
              <h2>{casa.titulo}</h2>
              <div className='price'>
                <h4 className={styles.h4}>{casa.valor.toLocaleString("pt-br", {style: 'currency', currency: "BRL"})}</h4>
                {casa.aluguel && <p className='aluguel'>/Mes</p>}
              </div>
              {casa.endereco && <p>{casa.endereco}</p>}
              <p>ID: {casa.id}</p>
            </Link>
            <div className={styles.buttons_area}>
              <button className={styles.edit_btn} onClick={() => navigate(`/edit/${casa.id}`)}><FaPenAlt /></button>
              <button className={styles.delete_btn} onClick={() => handleDelete(casa.id, casa.titulo, casa.imagens)}><FaTrashAlt /></button>
            </div>
          </div>) : (<div>
            <p>nenhum resultado foi encontrado!</p>
          </div>)}
          <Link to="/create" className={styles.add}>Adicionar um Imovel</Link>
        </section>    
    </div>
  )
}

export default Dashboard