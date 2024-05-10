"use client"
import { createContext, useContext, useState, useEffect } from 'react';
import 'firebase/auth';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useAuth } from './config';

const FirebaseContext = createContext();

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const [admin, setAdmin] = useState(null);
    const auth = useAuth()

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
                setAdmin(firebaseUser);
                setLoading(false)
            });
            return () => unsubscribe();
        }
    }, [auth]);

    return (
        <FirebaseContext.Provider value={{ admin, loading }}>
            {children}
        </FirebaseContext.Provider>
    );
};
