import { db } from "../firebase/config";
import { getFirestore, collection, query, where, getDocs, limit } from "firebase/firestore";

export async function getRecomendations(imovelId, valor, tipo) {
    try {
        const ImovelRef = collection(db, 'venda')
        const minValue = valor * 0.7 // 30% abaixo do valor do imovel original
        const maxValue = valor * 1.3 // 30% acima do valor do Imovel

        const q = query(ImovelRef, where('tipo', '==', tipo), where('valor', '<=', maxValue), where('valor', '>=', minValue), limit(5))

        const querySnapshot = await getDocs(q)

        const recomendations = []
        querySnapshot.forEach(doc => {
            if(doc.id !== imovelId){
                recomendations.push({ id: doc.id, ...doc.data() });
            }
        })

        return recomendations

    } catch (error) {
        console.error('Nao foi possivel encontrar recomendações', error)
        return []
    }
}