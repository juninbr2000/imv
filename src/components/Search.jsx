import React, { useState, useEffect } from 'react'
import styles from './Search.module.css'
import { useNavigate } from 'react-router-dom'
import { db } from '../firebase/config';
import { collection, getDocs } from 'firebase/firestore';

import { FaRegMap, FaLocationArrow, FaSearch} from 'react-icons/fa'

const Search = ({onFilterChange}) => {

    const [local, setLocal] = useState('')
    const [isAluguel, setIsAluguel] = useState(false)
    const [isSale, setIsSale] = useState(false)
    const [bairros, setBairros] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBairros = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'venda'));
                const allBairros = querySnapshot.docs.map(doc => doc.data().local);
                const uniqueBairros = [...new Set(allBairros)];
                setBairros(uniqueBairros);
            } catch (error) {
                console.error('Erro ao buscar bairros:', error);
            }
        };

        fetchBairros();
    }, []);

    
    const handleFilterChange = (e) => {
        e.preventDefault();
        onFilterChange(isAluguel, local, isSale);
    };

  return (
    <div className={styles.form_container}>
        <form onSubmit={handleFilterChange}>
            <div className={styles.radio_container}>
                <label className={styles.label}>
                    <input type="radio" name='venda' checked={!isAluguel && !isSale} onChange={() => {
                        setIsAluguel(false)
                        setIsSale(false)
                    }} />
                    <span>Todos</span>
                </label>
                <label className={styles.label}>
                    <input type="radio" name='venda' onChange={() => {
                        setIsAluguel(false)
                        setIsSale(true)
                    }} />
                    <span>A Venda</span>
                </label>
                <label className={styles.label}>
                    <input type="radio" name='venda' onChange={() => {
                        setIsAluguel(true)
                        setIsSale(false)
                    }} />
                    <span>Aluga-se</span>
                </label>
            </div>
            <div className={styles.form_container_select}>
            <label className={styles.select}>
                <span><FaRegMap/> Cidade</span>
                <select name="city" >
                    <option value="lambari">Lambari - MG</option>
                </select>
            </label>
            <label className={styles.select }>
                <span><FaLocationArrow/> Localização</span>
                <select name="bairro" onChange={(e) => setLocal(e.target.value)} value={local} >
                    <option value="">Todas</option>
                    {bairros.map((bairro, index) => (
                        <option key={index} value={bairro}>{bairro}</option>
                    ))}
                </select>
            </label>
            <button className='primary_btn' type='submit'><FaSearch/> Buscar</button>
            </div>
        </form>
    </div>
  )
}

export default Search