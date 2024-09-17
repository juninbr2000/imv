import React, { useEffect, useState } from 'react';
import Search from '../components/Search';
import { useFetchDocuments } from '../hooks/useFetchDocuments';
import Card from '../components/Card';
import { FaPlus } from 'react-icons/fa';
import { Analytics } from "@vercel/analytics/react"

const Home = () => {
    const [aluguel, setAluguel] = useState(false);
    const [location, setLocation] = useState('');
    const [sale, setSale] = useState(false);
    const [tipo, setTipo] = useState('')
    const [cost, setCost] = useState('')

    const [itemsPerPage, setItemsPerPage] = useState(12);

    const { documents: venda, loading, hasMore } = useFetchDocuments("venda", aluguel, location, sale, tipo, parseFloat(cost), itemsPerPage);

    const handleFilterChange = (isAluguel, selectedLocation, isSale, tipoImv, maxCost) => {
        setAluguel(isAluguel);
        setLocation(selectedLocation);
        setSale(isSale);
        setTipo(tipoImv);
        setCost((maxCost));
    };

    // useEffect(() => {
    //     window.scrollTo(0, 0)
    // }, [])

    if (loading) {
        return (
            <div className="spinner">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
            </div>
        );
    }

    const loadMore = () => {
        setItemsPerPage(itemsPerPage + 10)
    }    

    return (
        <div className='container'>
            <section className='search'>
                <Search onFilterChange={handleFilterChange} />
            </section>
            <section className='cards'>
                <h1 className='section-title'>Principais Resultados</h1>
                <div className='filter_container'>
                    {sale === true && <p className='filter' onClick={() => setSale(false)}>Venda <FaPlus/></p>}
                    {aluguel === true && <p className='filter' onClick={() => setAluguel(false)}>Aluguel <FaPlus/></p>}
                    {location !== '' && <p className='filter' onClick={() => setLocation("")}> {location} <FaPlus/></p>}
                    {tipo !== '' && <p className='filter' onClick={() => setLocation("")}> {tipo} <FaPlus/></p>}
                    {cost !== '' && <p className='filter' onClick={() => setCost('')}>Até {parseFloat(cost).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})} <FaPlus/></p>}
                </div>
                <div className='card-area'>
                    {venda && venda.length > 0 ? venda.map((casa) => <Card key={casa.id} venda={casa} />) : <h4>Nenhum imóvel correspondente à sua busca foi encontrado</h4>}
                </div>
                <div className='pagination'>
                    {hasMore === true ? 
                    <button onClick={loadMore}>Carregar Mais Propriedades</button>
                    :
                    <p>Exibindo todos os {venda.length} imóveis</p>
                    }
                </div>
            </section>
            <Analytics />
        </div>
    );
}

export default Home;
