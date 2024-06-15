import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userID, setUserID] = useState(null);
    const [username, setUserName] = useState(null);

    useEffect(() => {
        const fetchID = async () => {
            try {
                const response = await axios.get('http://localhost:8080/valid', {
                    withCredentials: true
                });
                if (response.data.valid && response.data.id) {
                    setUserID(response.data.id);
                    setUserName(response.data.username);
                } else {
                    setUserID(null);
                }
                console.log(response.data.id);
            } catch (error) {
                console.error('Error fetching user ID:', error);
                setUserID(null);
            }
        };
        fetchID();
    }, []);

    return (
        <AuthContext.Provider value={{ userID, username, setUserID, setUserName }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
