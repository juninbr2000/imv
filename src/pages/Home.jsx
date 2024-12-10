import React, { useEffect, useState } from 'react';
import Search from '../components/Search';
import { useFetchDocuments } from '../hooks/useFetchDocuments';
import Card from '../components/Card';
import { FaPlus } from 'react-icons/fa';
import { Analytics } from "@vercel/analytics/react"
import { useSearchParams } from 'react-router-dom';

const Home = () => {
    const [aluguel, setAluguel] = useState(false);
    const [location, setLocation] = useState('');
    const [sale, setSale] = useState(false);
    const [tipo, setTipo] = useState('')
    const [cost, setCost] = useState('')
    const [city, setCity] = useState('')

    const [itemsPerPage, setItemsPerPage] = useState(15);
    const [searchParams, setSearchParams] = useSearchParams();

    const { documents: venda, loading, hasMore } = useFetchDocuments("venda", aluguel, location, sale, tipo, parseFloat(cost), itemsPerPage, city); //voltar para venda

    const handleFilterChange = (isAluguel, selectedLocation, isSale, tipoImv, maxCost, city) => {
        setAluguel(isAluguel);
        setLocation(selectedLocation);
        setSale(isSale);
        setTipo(tipoImv);
        setCost((maxCost));
        setCity(city);

        const params = new URLSearchParams()
        if (isAluguel) params.set("aluguel", "true");
        if (selectedLocation) params.set("location", selectedLocation);
        if (isSale) params.set("sale", "true");
        if (tipoImv) params.set("tipo", tipoImv);
        if (maxCost) params.set("cost", maxCost);
        if (city) params.set("city", city);

        setSearchParams(params);
    };

    const handleRemoveCity = () => {
        setCity("");
        searchParams.delete("city");
        setSearchParams(searchParams); // Atualiza a URL removendo o parâmetro
    };

    const handleRemoveSale = () => {
        setSale(false);
        searchParams.delete("sale");
        setSearchParams(searchParams);
    };

    const handleRemoveAluguel = () => {
        setAluguel(false);
        searchParams.delete('aluguel')
        setSearchParams(searchParams)
    }
    //location, type, cost
    const handleRemoveLocation = () => {
        setLocation('');
        searchParams.delete('location');
        setSearchParams(searchParams)
    }

    const handleRemoveType = () => {
        setTipo('')
        searchParams.delete('tipo');
        setSearchParams(searchParams)
    }

    const handleRemoveCost = () => {
        setCost('')
        searchParams.delete('cost')
        setSearchParams(searchParams)
    }

    useEffect(() => {
        // Sincroniza o estado dos filtros com a URL ao carregar a página
        setAluguel(searchParams.get("aluguel") === "true");
        setLocation(searchParams.get("location") || '');
        setSale(searchParams.get("sale") === "true");
        setTipo(searchParams.get("tipo") || '');
        setCost(searchParams.get("cost") || '');
        setCity(searchParams.get("city") || '');
    }, [searchParams]);

    if (loading) {
        return (
            <div className="spinner">
                <svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M44 20C44 18.4087 43.3679 16.8826 42.2426 15.7574C41.1174 14.6321 39.5913 14 38 14M38 38C41.7861 37.9989 45.4754 36.804 48.5432 34.5852C51.6111 32.3665 53.9012 29.2369 55.0878 25.6416C56.2744 22.0463 56.2972 18.1683 55.1528 14.5593C54.0084 10.9503 51.7552 7.79408 48.7136 5.5395C45.672 3.28492 41.9969 2.04682 38.2111 2.0013C34.4253 1.95579 30.7216 3.10517 27.6266 5.28598C24.5317 7.46678 22.2033 10.568 20.9725 14.1484C19.7416 17.7288 19.6711 21.6062 20.771 25.229L20 26L2.879 43.121C2.31635 43.6835 2.00017 44.4464 2 45.242V53C2 53.7956 2.31607 54.5587 2.87868 55.1213C3.44129 55.6839 4.20435 56 5 56H11C11.7956 56 12.5587 55.6839 13.1213 55.1213C13.6839 54.5587 14 53.7956 14 53C14 52.2044 14.3161 51.4413 14.8787 50.8787C15.4413 50.3161 16.2044 50 17 50C17.7956 50 18.5587 49.6839 19.1213 49.1213C19.6839 48.5587 20 47.7956 20 47C20 46.2044 20.3161 45.4413 20.8787 44.8787C21.4413 44.3161 22.2044 44 23 44H24.758C25.5536 43.9998 26.3165 43.6837 26.879 43.121L32 38L32.771 37.229C34.4666 37.7419 36.2286 38.0017 38 38Z" stroke="#192436" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
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
            <article className='destaques'>
                
            </article>
            <section className='cards'>
                <h1 className='section-title'>Principais Resultados</h1>
                <div className='filter_container'>
                    {city !== "" && <p className='filter' onClick={() => handleRemoveCity()}>{city} <FaPlus/></p>}
                    {sale === true && <p className='filter' onClick={() => handleRemoveSale()}>Venda <FaPlus/></p>}
                    {aluguel === true && <p className='filter' onClick={() => handleRemoveAluguel()}>Aluguel <FaPlus/></p>}
                    {location !== '' && <p className='filter' onClick={() => handleRemoveLocation()}> {location} <FaPlus/></p>}
                    {tipo !== '' && <p className='filter' onClick={() => handleRemoveType()}> {tipo} <FaPlus/></p>}
                    {cost !== '' && <p className='filter' onClick={() => handleRemoveCost()}>Até {parseFloat(cost).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})} <FaPlus/></p>}
                </div>
                <div className='card-area'>
                    {loading ? (
                        <div className="spinner">  
                            <svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M44 20C44 18.4087 43.3679 16.8826 42.2426 15.7574C41.1174 14.6321 39.5913 14 38 14M38 38C41.7861 37.9989 45.4754 36.804 48.5432 34.5852C51.6111 32.3665 53.9012 29.2369 55.0878 25.6416C56.2744 22.0463 56.2972 18.1683 55.1528 14.5593C54.0084 10.9503 51.7552 7.79408 48.7136 5.5395C45.672 3.28492 41.9969 2.04682 38.2111 2.0013C34.4253 1.95579 30.7216 3.10517 27.6266 5.28598C24.5317 7.46678 22.2033 10.568 20.9725 14.1484C19.7416 17.7288 19.6711 21.6062 20.771 25.229L20 26L2.879 43.121C2.31635 43.6835 2.00017 44.4464 2 45.242V53C2 53.7956 2.31607 54.5587 2.87868 55.1213C3.44129 55.6839 4.20435 56 5 56H11C11.7956 56 12.5587 55.6839 13.1213 55.1213C13.6839 54.5587 14 53.7956 14 53C14 52.2044 14.3161 51.4413 14.8787 50.8787C15.4413 50.3161 16.2044 50 17 50C17.7956 50 18.5587 49.6839 19.1213 49.1213C19.6839 48.5587 20 47.7956 20 47C20 46.2044 20.3161 45.4413 20.8787 44.8787C21.4413 44.3161 22.2044 44 23 44H24.758C25.5536 43.9998 26.3165 43.6837 26.879 43.121L32 38L32.771 37.229C34.4666 37.7419 36.2286 38.0017 38 38Z" stroke="#192436" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    ) : (
                        venda && venda.length > 0 ? (
                            venda.map((casa) => <Card key={casa.id} venda={casa} />)
                        ) : (
                            <h4>Nenhum imóvel correspondente à sua busca foi encontrado</h4>
                        )
                    )}
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
