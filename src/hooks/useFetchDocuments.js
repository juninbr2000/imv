import { useState, useEffect, cloneElement } from "react";
import { db } from "../firebase/config";
import { 
    collection, 
    query, 
    orderBy, 
    onSnapshot, 
    where 
} from "firebase/firestore";

export const useFetchDocuments = ( docCollection, aluguel, location, venda) => {

    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

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
                
                if (location && aluguel) {
                    q = await query(collectionRef, where("local", "==", location), where('aluguel', '==', aluguel), orderBy('createDat', 'desc'))
                } else if (venda && location) {
                    q = await query(collectionRef, where('local', '==', location), where('venda', '==', venda), orderBy('createDat', 'desc'))
                } else if (location) {
                    q = await query(collectionRef, where("local", "==", location), orderBy('createDat', 'desc'))
                } else if(aluguel) {
                    q = await query(collectionRef, where('aluguel', '==', aluguel), orderBy('createDat', 'desc'))
                } else if(venda){
                    q = await query(collectionRef, where('venda', '==', venda ), orderBy('createDat', 'desc'));
                } else {
                    q = await query(collectionRef, orderBy('createDat', 'desc'));
                }
                
                await onSnapshot(q, (querySnapshot) => {
                    setDocuments(
                        querySnapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }))
                    )
                })

                setLoading(false)
                
            } catch (error) {
                setError(error.message)
                
                setLoading(false)
            }
        }
        
        loadData()
    }, [docCollection, aluguel, location, venda])

//    useEffect(() => {
//        return () => setCancelled(true);
//    }, []);

    return {documents, loading, error}
}