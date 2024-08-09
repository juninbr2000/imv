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

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    const { documents: venda, loading } = useFetchDocuments("venda", aluguel, location, sale, tipo, parseFloat(cost));

    const handleFilterChange = (isAluguel, selectedLocation, isSale, tipoImv, maxCost) => {
        setAluguel(isAluguel);
        setLocation(selectedLocation);
        setSale(isSale);
        setTipo(tipoImv);
        setCost((maxCost));
        setCurrentPage(1); // Reset page to 1 on filter change
    };

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [currentPage])

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

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = venda ? venda.slice(indexOfFirstItem, indexOfLastItem) : [];

    const totalPages = venda ? Math.ceil(venda.length / itemsPerPage) : 1;

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

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
                    {currentItems.length > 0 ? currentItems.map((casa) => <Card key={casa.id} venda={casa} />) : <h4>Nenhum imóvel correspondente à sua busca foi encontrado</h4>}
                </div>
                <div className='pagination'>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            className={index + 1 === currentPage ? 'active' : ''}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </section>
            <Analytics />
        </div>
    );
}

export default Home;
