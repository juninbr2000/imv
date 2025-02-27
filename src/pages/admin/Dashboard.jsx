import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useAuthValue } from '../../context/AuthContext'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { useDeleteDocument } from '../../hooks/useDeleteDocuments'

import { FaCamera, FaTrashAlt, FaPenAlt, FaMoneyCheckAlt } from 'react-icons/fa'
import styles from './Dashboard.module.css'
import { getDocs, collection, setDoc, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../../firebase/config';

const Dashboard = () => {
    const { user } = useAuthValue()
    
    const [bairros, setBairros] = useState([]);
    const [local, setLocal] = useState('')
    const [searchTerm, setSearchTerm] = useState('');
    const [collectionType, setCollectionType] = useState('venda');
    const [alert, setAlert] = useState('')
    const navigate = useNavigate();
    
    const { deleteDocument, response } = useDeleteDocument(collectionType)
    const { documents: venda, loading } = useFetchDocuments(collectionType, [])

    const handleMarkAsSold = async (imovel) => {
      try {
        await setDoc(doc(db, "vendidos", imovel.id), imovel);
        await deleteDoc(doc(db, "venda", imovel.id));

        setAlert(`${imovel.titulo} foi marcado como vendido e movido para a coleção de vendidos.`);
      } catch (error) {
        console.error("Erro ao mover o imóvel para vendidos:", error);
        setAlert('Erro ao mover para Vendidos: ', error)
      }
    }

    const handleDelete = (id, titulo, imagens) => {
      const apaga = window.confirm(`Tem certeza que quer remover ${titulo}? Essa ação não poderá ser desfeita.`);
      if (apaga) {
        deleteDocument(id, imagens)
        setAlert('Imovel deletado com sucesso', response)
      } else {
        setAlert('Erro ao apagar o Documento', response)
        return
      }
    }

    const aVenda = venda ? venda.filter(imovel => imovel.venda) : [] 
    const ganhos = aVenda.reduce((total, imoveis) => {
      return total + (imoveis.valor * (5 / 100)) 
    }, 0) 

    useEffect(() => {
      const fetchBairros = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, collectionType)); // Busca da coleção correta
          const allBairros = querySnapshot.docs.map(doc => doc.data().local);
          const uniqueBairros = [...new Set(allBairros)];

          uniqueBairros.sort((a, b) => a.localeCompare(b, 'pt-br', { sensitivity: 'base' }));

          setBairros(uniqueBairros);
        } catch (error) {
          console.error('Erro ao buscar bairros:', error);
        }
      };

      fetchBairros();
    }, [collectionType]); // Atualiza quando a coleção muda

    useEffect(() => {
      setTimeout(() => {
        setAlert('')
      }, 5000)
    }, [alert])

    const filteredVenda = aVenda.filter((imovel) => {
      const matchesLocal = local ? imovel.local === local : true; // Verifica o local
      const matchesSearchTerm = imovel.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                imovel.titulo.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesLocal && matchesSearchTerm;
    });

    return (
      <div className={styles.dashboard_container}>
        <header className={styles.header}>
          <h1>Dashboard</h1>

          {collectionType === 'venda' && <div className={styles.geral_info}>
            <div className={styles.card_info}>
              <p>Total de imóveis</p>
              {venda && <h2>{venda.length}</h2>}
            </div>
            <div className={styles.card_info}>
              <p>Imóveis à venda</p>
              {venda && <h2>{aVenda.length}</h2>}
            </div>
            <div className={styles.card_info}>
              <p>Possíveis ganhos com vendas</p>
              {venda && <h2>{ganhos.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</h2>}
            </div>
          </div>}

          <form className={styles.search_form} onSubmit={(e) => e.preventDefault()}>
            <h3 className={styles.form_title}>Busque por Imóveis</h3>
            <div className={styles.collection_select}>
              <label>
                <input type="radio" checked={collectionType === 'venda'} onChange={() => setCollectionType('venda')} />
                <span>Disponíveis</span>
              </label>
              <label>
                <input type="radio" checked={collectionType === 'vendidos'} onChange={() => setCollectionType('vendidos')} />
                <span>Vendidos</span>
              </label>
            </div>
            <label className={styles.label_search}>
              <span>Id ou título: </span>
              <input type="text" placeholder='Digite o id ou o título aqui' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </label>
            <label className={styles.label_select}>
              <span>Localização: </span>
              <select name="bairro" onChange={(e) => setLocal(e.target.value)} value={local}>
                <option value="">Todas</option>
                {bairros.map((bairro, index) => (
                  <option key={index} value={bairro}>{bairro}</option>
                ))}  
              </select>
            </label>
            <button className={styles.bnt_search} type='submit'>Buscar</button>
            <p className={styles.divide}>ou</p>
            <Link to='/create' className={styles.add_btn}>Adicionar Imóvel</Link>
          </form>
        </header>
        <section className={styles.card_area}>
          {filteredVenda.length > 0 ? filteredVenda.map((casa) => (
            <div key={casa.id} className={styles.card_container}>
              {casa.imagens && casa.imagens.length > 0 ? (
                <div className={styles.image_card}>
                  <img src={casa.imagens[0]} className={styles.img}/>
                </div>
              ) : (
                <div className={styles.image_card}>
                  <FaCamera />
                </div>
              )}
              <Link to={`/${casa.id}`} className={styles.casa_info}>
                <h2>{casa.titulo}</h2>
                <div className='price'>
                  <h4 className={styles.h4}>{casa.valor.toLocaleString("pt-br", { style: 'currency', currency: "BRL" })}</h4>
                  {casa.aluguel && <p className='aluguel'>/Mês</p>}
                </div>
                {casa.endereco && <p>{casa.endereco}</p>}
                {casa.city && <p>{casa.city}</p>}
                <p className={styles.id}>ID: {casa.id}</p>
              </Link>
              <div className={styles.buttons_area}>
                <button className={styles.edit_btn} onClick={() => navigate(`/edit/${casa.id}`)}><FaPenAlt /></button>
                <button className={styles.delete_btn} onClick={() => handleDelete(casa.id, casa.titulo, casa.imagens)}><FaTrashAlt /></button>
                {collectionType === 'venda' && (
                  <button className={styles.sell_btn} onClick={() => handleMarkAsSold(casa)}><FaMoneyCheckAlt /></button>
                )}
              </div>
            </div>
          )) : (
            <div>
              <p>Nenhum resultado foi encontrado!</p>
            </div>
          )}
          <Link to="/create" className={styles.add}>Adicionar um Imóvel</Link>
        </section>    
        {alert !== '' && <p className={styles.alert}>{alert}</p> }
      </div>
    )
}

export default Dashboard
