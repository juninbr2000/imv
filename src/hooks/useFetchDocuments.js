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
    const [documents, setDocuments] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        async function loadData() {

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

                if(conditions.length > 0){
                    const q = query(collectionRef, ...conditions, ...orderConditions, limit(itemsPerPage)); 

                    await onSnapshot(q, (querySnapshot) => {
                        setDocuments(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
                        setHasMore(querySnapshot.docs.length === itemsPerPage);
                    });

                    setLoading(true)
                } else {
                    const q = query(collectionRef, ...orderConditions, limit(itemsPerPage)) 
                    
                    await onSnapshot(q, (querySnapshot) => {
                        setDocuments(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
                        setHasMore(querySnapshot.docs.length === itemsPerPage);
                    });

                    setLoading(true)
                }

            } catch (error) {
                setError(error.message);
                setLoading(false);
            }

            if( documents.length > 0){
                setLoading(false)
            }
        }

        loadData();

        // return () => setCancelled(true);
    }, [docCollection, aluguel, location, venda, tipoImv, cost, itemsPerPage, city]);

    useEffect(() => {
        if( documents.length > 0 ){
            setLoading(false)
        }
    }, [documents]);

    return { documents, loading, hasMore, error };
};