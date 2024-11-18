import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";

export const useFetchDocument = ( docCollection, id ) => {

    const [document, setDocument] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    //deal with memory leak
    const [cancelled, setCancelled] = useState(false)

    useEffect(() => {
        const loadDocument = async () => {
          setLoading(true); // Inicia o loading
          setError(null); // Reseta erros anteriores
    
          try {
            const docRef = doc(db, docCollection, id);
            const docSnap = await getDoc(docRef);
    
            if (docSnap.exists()) {
              setDocument(docSnap.data());
            } else {
              setDocument(null); // Se não encontrar, reseta o documento
            }
          } catch (error) {
            console.error("Erro ao buscar documento:", error);
            setError(error.message);
          } finally {
            setLoading(false); // Finaliza o loading
          }
        };
    
        if (id) {
          loadDocument();
        }
      }, [docCollection, id]);

    useEffect(() => {
        return () => setCancelled(true) 
    })


    return { document, loading, error }
}