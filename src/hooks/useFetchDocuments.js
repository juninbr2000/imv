import { useState, useEffect, cloneElement } from "react";
import { db } from "../firebase/config";
import { 
    collection, 
    query, 
    orderBy, 
    onSnapshot, 
    where,
    limit,
} from "firebase/firestore";

export const useFetchDocuments = (docCollection, aluguel, location, venda, tipoImv, cost, itemsPerPage, city) => {
    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const [hasMore, setHasMore] = useState(true);

    const [cancelled, setCancelled] = useState(false);

    useEffect(() => {
        async function loadData() {
            if (cancelled) return;

            setLoading(true);
            const collectionRef = await collection(db, docCollection);

            try {
                // Construindo a query com base nas condições
                const conditions = [];

                if (city) {
                    conditions.push(where('city', '==', city));
                }
                if (venda) {
                    conditions.push(where('venda', '==', venda));
                }
                if (aluguel) {
                    conditions.push(where('aluguel', '==', aluguel));
                }
                if (location) {
                    conditions.push(where('local', '==', location));
                }
                if (tipoImv) {
                    conditions.push(where('tipo', '==', tipoImv));
                }
                if (cost) {
                    conditions.push(where('valor', '<=', cost));
                }

                let orderConditions = [];
                if (cost) {
                    orderConditions.push(orderBy('valor', 'desc')); // Ordena pelo valor em ordem decrescente
                }
                orderConditions.push(orderBy('createDat', 'desc')); // Ordena pela data de criação

                const q = query(collectionRef, ...conditions, ...orderConditions, limit(itemsPerPage));

                // Executando a consulta e atualizando o estado
                await onSnapshot(q, (querySnapshot) => {
                    setDocuments(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
                    setHasMore(querySnapshot.docs.length === itemsPerPage);
                });

                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        }

        loadData();

        // return () => setCancelled(true);
    }, [docCollection, aluguel, location, venda, tipoImv, cost, itemsPerPage, city]);

    return { documents, loading, hasMore, error };
};