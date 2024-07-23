import React, { useEffect, useState } from 'react';
import Search from '../components/Search';
import { useFetchDocuments } from '../hooks/useFetchDocuments';
import Card from '../components/Card';
import { FaPlus } from 'react-icons/fa';

const Home = () => {
    const [aluguel, setAluguel] = useState(false);
    const [location, setLocation] = useState('');
    const [sale, setSale] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    const { documents: venda, loading } = useFetchDocuments("venda", aluguel, location, sale);

    const handleFilterChange = (isAluguel, selectedLocation, isSale) => {
        setAluguel(isAluguel);
        setLocation(selectedLocation);
        setSale(isSale);
        setCurrentPage(1); // Reset page to 1 on filter change
    };

    console.log(location)
    console.log(sale)
    console.log(aluguel)

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
            <header className='header_style'>
                <h1>Te ajudando a encontrar seu Lar ideal!</h1>
                <p className='creditos'>
                    Foto de <a href="https://unsplash.com/pt-br/@webaliser?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Ярослав Алексеенко</a> na <a href="https://unsplash.com/pt-br/fotografias/white-and-brown-concrete-building-under-blue-sky-during-daytime-_TPTXZd9mOo?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
                </p>
            </header>
            <section className='search'>
                <Search onFilterChange={handleFilterChange} />
            </section>
            <section className='cards'>
                <h1 className='section-title'>Principais Resultados</h1>
                <div className='filter_container'>
                    {sale === true && <p className='filter' onClick={() => setSale(false)}>Venda <FaPlus/></p>}
                    {aluguel === true && <p className='filter' onClick={() => setAluguel(false)}>Aluguel <FaPlus/></p>}
                    {location !== '' && <p className='filter' onClick={() => setLocation("")}> {location} <FaPlus/></p>}
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
        </div>
    );
}

export default Home;
