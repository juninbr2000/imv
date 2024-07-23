import {
    getAuth,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from 'firebase/auth'

import { useState, useEffect } from 'react'

export const useAuthentication = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    // cleanup
    // deal with memory leak

    const [cancelled, setCancelled] = useState(false)

    const auth = getAuth()

    function checkIfIsCancelled() {
        if(cancelled){
            return
        }
    }

    //logout

    const logout = () => {

        checkIfIsCancelled()

        signOut(auth)

    }

    //login

    const login = async(data) => {

        checkIfIsCancelled()

        setLoading(true)
        setError(false)

        try {
            
            await signInWithEmailAndPassword(auth, data.email, data.password)
            setLoading(false)

        } catch (error) {
            
            let systemErrorMessage;

            if(error.message.includes("invalid-credential")){
                systemErrorMessage = "Por favor confira se o email e a senha estão corretos."
            } else if(error.message.includes('wrong-password')){
                systemErrorMessage = "Senha incorreta."
            } else {
                systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde"
            }

            console.log(error)

            setError(systemErrorMessage)
            setLoading(false)

        }

    }


    useEffect(() =>{
        return () => setCancelled(true);
    }, []);

    return {
        auth,
        error,
        loading,
        logout,
        login,
    };
}