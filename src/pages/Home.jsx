import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Search from '../components/Search';
import { useFetchDocuments } from '../hooks/useFetchDocuments';
import Card from '../components/Card';
import { FaPlus } from 'react-icons/fa';
import { Analytics } from "@vercel/analytics/react"
import { useSearchParams } from 'react-router-dom';
import LoadingCard from '../UI/LoadingCard';

const Home = () => {
    const [aluguel, setAluguel] = useState(false);
    const [location, setLocation] = useState('');
    const [sale, setSale] = useState(false);
    const [tipo, setTipo] = useState('')
    const [cost, setCost] = useState('')
    const [city, setCity] = useState('')
    const [firstLoad, setFirstLoad] = useState(true);

    const [itemsPerPage, setItemsPerPage] = useState(12);
    const [searchParams, setSearchParams] = useSearchParams();

    const filterParams = useMemo(() => ({
        aluguel, location, sale, tipo, cost: parseFloat(cost) || 0, city
    }), [aluguel, location, sale, tipo, cost, city]);

    const { documents: venda, loading, hasMore } = useFetchDocuments("venda", filterParams, itemsPerPage);

    const handleFilterChange = useCallback((isAluguel, selectedLocation, isSale, tipoImv, maxCost, city) => {
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
    });

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
    
    useEffect(() => {
        if (!loading) {
            setFirstLoad(false);
        }
    }, [loading]);


    const loadMore = () => {
        setItemsPerPage(prev => prev + 10)
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
                    {loading || firstLoad ? (
                        <>
                            <LoadingCard />
                            <LoadingCard />
                            <LoadingCard />
                            <LoadingCard />
                            <LoadingCard />
                            <LoadingCard />
                            <LoadingCard />
                            <LoadingCard />
                            <LoadingCard />
                            <LoadingCard />
                            <LoadingCard />
                            <LoadingCard />
                        </>        
                    ) : venda.length > 0 ? (
                            venda.map((casa) => <Card key={casa.id} venda={casa} />)
                        ) : (
                            <h4>Nenhum imóvel correspondente à sua busca foi encontrado</h4>
                        )
                    }
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
