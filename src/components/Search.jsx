import React, { useState, useEffect } from 'react';
import styles from './Search.module.css';
import { Link } from 'react-router-dom';
import { db } from '../firebase/config';
import { collection, getDocs } from 'firebase/firestore';

import { FaRegMap, FaSearch } from 'react-icons/fa';
import { BiCurrentLocation, BiBuildingHouse, BiMoney } from 'react-icons/bi';

const Search = ({ onFilterChange }) => {
  const [local, setLocal] = useState('');
  const [tipoImv, setTipoImv] = useState('');
  const [maxCost, setMaxCost] = useState('');
  const [isAluguel, setIsAluguel] = useState(false);
  const [isSale, setIsSale] = useState(false);
  const [tipos, setTipos] = useState([]);
  const [city, setCity] = useState('');
  const [filteredBairros, setFilteredBairros] = useState([]);
  const [listCity, setListCity] = useState([]);
  const [cityBairrosMap, setCityBairrosMap] = useState(new Map());
  const [loading, setLoading] = useState(false)

  const saleValue = [
    { value: 100000, text: 'até R$ 100.000,00' },
    { value: 250000, text: 'até R$ 250.000,00' },
    { value: 500000, text: 'até R$ 500.000,00' },
    { value: 750000, text: 'até R$ 750.000,00' },
    { value: 1000000, text: 'até R$ 1.000.000,00' },
    { value: 2500000, text: 'até R$ 2.500.000,00' },
    { value: 5000000, text: 'até R$ 5.000.000,00' },
  ];

  const aluguelValue = [
    { value: 1000, text: 'até R$ 1.000,00' },
    { value: 2500, text: 'até R$ 2.500,00' },
    { value: 5000, text: 'até R$ 5.000,00' },
  ];

  const getAllValues = [...aluguelValue, ...saleValue];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const querySnapshot = await getDocs(collection(db, 'venda'));
        const cityBairrosMap = new Map();

        querySnapshot.docs.forEach(doc => {
          const data = doc.data();
          const city = data.city || 'Cidade Desconhecida';
          const bairro = data.local || '';

          if (city && bairro) {
            if (!cityBairrosMap.has(city)) {
              cityBairrosMap.set(city, new Set());
            }
            cityBairrosMap.get(city).add(bairro);
          }
        });

        const cityList = Array.from(cityBairrosMap.keys()).sort((a, b) =>
          a.localeCompare(b, 'pt-br', { sensitivity: 'base' })
        );
        setListCity(cityList);

        setCityBairrosMap(cityBairrosMap);

        const allTypes = querySnapshot.docs.map(doc => doc.data().tipo);
        const uniqueTypes = [...new Set(allTypes)];
        setTipos(uniqueTypes);

        setLoading(false)
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        setLoading(false)
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (city && cityBairrosMap.has(city)) {
      const bairrosSet = cityBairrosMap.get(city);
      const bairrosList = Array.from(bairrosSet).sort((a, b) =>
        a.localeCompare(b, 'pt-br', { sensitivity: 'base' })
      );
      setFilteredBairros(bairrosList);
    } else {
      setFilteredBairros([]);
    }
  }, [city, cityBairrosMap]);

  const handleFilterChange = (e) => {
    e.preventDefault();
    onFilterChange(isAluguel, local, isSale, tipoImv, maxCost, city);
  };

  return (
    <div className={styles.form_container}>
      <div className={styles.container}>
        <div className={styles.logo}>
          {/* Seu código de logo aqui */}
          <h3 className={styles.subtitle}>Te ajudamos a encontrar o seu lar ideal</h3>
        </div>
        <form className={styles.form_area} onSubmit={handleFilterChange}>
          <h2 className={styles.title}>O que você Procura?</h2>
          <div className={styles.radio_container}>
            <label className={styles.label}>
              <input
                type="radio"
                name="venda"
                checked={!isAluguel && !isSale}
                onChange={() => {
                  setIsAluguel(false);
                  setIsSale(false);
                }}
              />
              <span>Todos</span>
            </label>
            <label className={styles.label}>
              <input
                type="radio"
                name="venda"
                onChange={() => {
                  setIsAluguel(false);
                  setIsSale(true);
                }}
              />
              <span>Comprar</span>
            </label>
            <label className={styles.label}>
              <input
                type="radio"
                name="venda"
                onChange={() => {
                  setIsAluguel(true);
                  setIsSale(false);
                }}
              />
              <span>Alugar</span>
            </label>
          </div>
          <div className={styles.select_area}>
            <label className={styles.select}>
              <span>
                <BiCurrentLocation /> Cidade
              </span>
              {loading ? (
                <div className={styles.loadingSelect}>
                  <p>Selecione</p>
                  <p>˅</p>
                </div>
              ) : <select name="city" onChange={(e) => setCity(e.target.value)} value={city}>
                <option value="">Selecione</option>
                {listCity.map((cidade, index) => (
                  <option key={index} value={cidade}>
                    {cidade}
                  </option>
                ))}
              </select>}
            </label>
            <label className={styles.select}>
              <span>
                <FaRegMap /> Localização
              </span>
              {loading ? (
                <div className={styles.loadingSelect}>
                  <p>Todas</p>
                  <p>˅</p>
                </div>
              ) : <select
                name="bairro"
                onChange={(e) => setLocal(e.target.value)}
                value={local}
                disabled={!city} // Desabilita o dropdown se nenhuma cidade for selecionada
              >
                <option value="">Todas</option>
                {filteredBairros.map((bairro, index) => (
                  <option key={index} value={bairro}>
                    {bairro}
                  </option>
                ))}
              </select>}
            </label>
          </div>
          <div className={styles.select_area}>
            <label className={styles.select}>
              <span>
                <BiBuildingHouse /> Tipo
              </span>
              <select name="tipo" onChange={(e) => setTipoImv(e.target.value)}>
                <option value="">Todos</option>
                {tipos.map((tipo, index) => (
                  <option key={index} value={tipo}>
                    {tipo}
                  </option>
                ))}
              </select>
            </label>
            <label className={styles.select}>
              <span>
                <BiMoney /> Valor
              </span>
              <select name="valor" onChange={(e) => setMaxCost(e.target.value)}>
                <option value="">Qualquer</option>
                {isSale &&
                  saleValue.map((preco, index) => (
                    <option key={index} value={preco.value}>
                      {preco.text}
                    </option>
                  ))}
                {!isSale && !isAluguel &&
                  getAllValues.map((preco, index) => (
                    <option key={index} value={preco.value}>
                      {preco.text}
                    </option>
                  ))}
                {isAluguel &&
                  aluguelValue.map((preco, index) => (
                    <option key={index} value={preco.value}>
                      {preco.text}
                    </option>
                  ))}
              </select>
            </label>
          </div>
          <button className="primary_btn" type="submit">
            <FaSearch /> Buscar
          </button>
        </form>

        <div className={styles.announce}>
          <h2>Quer anunciar seu imóvel?</h2>
          <Link to={"/anuncie"} className="secondary_btn">
            Anunciar meu Imóvel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Search;
