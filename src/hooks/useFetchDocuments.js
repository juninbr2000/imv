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

export const useFetchDocuments = ( docCollection, aluguel, location, venda, tipoImv, cost, itemsPerPage) => {

    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)
    const [hasMore, setHasMore] = useState(true)

    //deal with memory leak

    const [cancelled, setCancelled] = useState(false)

    useEffect(() => {

        async function loadData(){
            if(cancelled) {
                return
            }

            setLoading(true)

            const collectionRef = await collection(db, docCollection)

            
            try {
                
                let q;
                //dashboar
                
                if (venda && location && tipoImv && cost) {
                    q = await query(collectionRef, 
                                    where('venda', '==', venda), 
                                    where('local', '==', location), 
                                    where('tipo', '==', tipoImv), 
                                    where('valor', '<=', cost), 
                                    orderBy('valor', 'desc'));
                } else if (aluguel && location && tipoImv && cost) {
                    q = await query(collectionRef, 
                                    where('aluguel', '==', aluguel), 
                                    where('local', '==', location), 
                                    where('tipo', '==', tipoImv), 
                                    where('valor', '<=', cost), 
                                    orderBy('valor', 'desc'));
                } else if (venda && location && tipoImv) {
                    q = await query(collectionRef, 
                                    where('venda', '==', venda), 
                                    where('local', '==', location), 
                                    where('tipo', '==', tipoImv), 
                                    orderBy('createDat', 'desc'));
                } else if (aluguel && location && tipoImv) {
                    q = await query(collectionRef, 
                                    where('aluguel', '==', aluguel), 
                                    where('local', '==', location), 
                                    where('tipo', '==', tipoImv), 
                                    orderBy('createDat', 'desc'));
                } else if (venda && location && cost) {
                    q = await query(collectionRef, 
                                    where('venda', '==', venda), 
                                    where('local', '==', location), 
                                    where('valor', '<=', cost), 
                                    orderBy('valor', 'desc'));
                } else if (aluguel && location && cost) {
                    q = await query(collectionRef, 
                                    where('aluguel', '==', aluguel), 
                                    where('local', '==', location), 
                                    where('valor', '<=', cost), 
                                    orderBy('valor', 'desc'));
                } else if (location && tipoImv && cost) {
                    q = await query(collectionRef, 
                                    where('local', '==', location), 
                                    where('tipo', '==', tipoImv), 
                                    where('valor', '<=', cost), 
                                    orderBy('valor', 'desc'));
                } else if (location && venda && tipoImv) {
                    q = await query(collectionRef, 
                                    where('local', '==', location), 
                                    where('venda', '==', venda), 
                                    where('tipo', '==', tipoImv), 
                                    orderBy('createDat', 'desc'));
                } else if (location && aluguel && tipoImv) {
                    q = await query(collectionRef, 
                                    where('local', '==', location), 
                                    where('aluguel', '==', aluguel), 
                                    where('tipo', '==', tipoImv), 
                                    orderBy('createDat', 'desc'));
                } else if (location && venda) {
                    q = await query(collectionRef, 
                                    where('local', '==', location), 
                                    where('venda', '==', venda), 
                                    orderBy('createDat', 'desc'));
                } else if (location && aluguel) {
                    q = await query(collectionRef, 
                                    where('local', '==', location), 
                                    where('aluguel', '==', aluguel), 
                                    orderBy('createDat', 'desc'));
                } else if (location && tipoImv) {
                    q = await query(collectionRef, 
                                    where('local', '==', location), 
                                    where('tipo', '==', tipoImv), 
                                    orderBy('createDat', 'desc'));
                } else if (venda && tipoImv) {
                    q = await query(collectionRef, 
                                    where('venda', '==', venda), 
                                    where('tipo', '==', tipoImv), 
                                    orderBy('createDat', 'desc'));
                } else if (aluguel && tipoImv) {
                    q = await query(collectionRef, 
                                    where('aluguel', '==', aluguel), 
                                    where('tipo', '==', tipoImv), 
                                    orderBy('createDat', 'desc'));
                } else if (tipoImv && cost) {
                    q = await query(collectionRef, 
                                    where('tipo', '==', tipoImv), 
                                    where('valor', '<=', cost), 
                                    orderBy('valor', 'desc'));
                } else if (tipoImv) {
                    q = await query(collectionRef, 
                                    where('tipo', '==', tipoImv), 
                                    orderBy('createDat', 'desc'));
                } else if (location) {
                    q = await query(collectionRef, 
                                    where('local', '==', location), 
                                    orderBy('createDat', 'desc'));
                } else if (cost) {
                    q = await query(collectionRef, 
                                    where('valor', '<=', cost), 
                                    orderBy('valor', 'desc'));
                } else if (aluguel) {
                    q = await query(collectionRef, 
                                    where('aluguel', '==', aluguel), 
                                    orderBy('createDat', 'desc'));
                } else if (venda) {
                    q = await query(collectionRef, 
                                    where('venda', '==', venda), 
                                    orderBy('createDat', 'desc'));
                } else {
                    q = await query(collectionRef, 
                                    orderBy('createDat', 'desc'),
                                    limit(itemsPerPage));
                }
                
                await onSnapshot(q, (querySnapshot) => {
                    setDocuments(
                        querySnapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }))
                    )

                    setHasMore(querySnapshot.docs.length === itemsPerPage);
                })

                setLoading(false)
                
            } catch (error) {
                setError(error.message)
                
                setLoading(false)
            }
        }
        
        loadData()
    }, [docCollection, aluguel, location, venda, tipoImv, cost, itemsPerPage])

//    useEffect(() => {
//        return () => setCancelled(true);
//    }, []);

    return {documents, loading, hasMore, error}
}