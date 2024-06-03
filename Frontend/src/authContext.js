import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();  // Use PascalCase for context

export const AuthProvider = ({ children }) => {
    const [userID, setUserID] = useState(null);
    const[username,setUserName] = useState(null);

    useEffect(() => {
        async function fetchID() {
            try {
                const response = await axios.get('http://localhost:8080', {
                    withCredentials: true
                });
                if (response.data.valid && response.data.id) {
                    setUserID(response.data.id);
                    setUserName(response.data.username);
                } else {
                    setUserID(null);
                }
            } catch (error) {
                console.error('Error fetching user ID:', error);
                setUserID(null);
            }
        }

        fetchID();
    }, []);

    return (
        <AuthContext.Provider value={{ userID }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);  // Return the context value
};
