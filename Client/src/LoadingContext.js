import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [defaultImages, setDefaultImages] = useState([]);
    const [trendingProducts, setTrendingProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const defaultImagesResponse = await axios.get('https://minimalistic-ecommerce.onrender.com/defaultImages');
                const trendingProductsResponse = await axios.get('https://minimalistic-ecommerce.onrender.com/api/products');
                console.log(defaultImagesResponse.data);
                setDefaultImages(defaultImagesResponse.data);
                setTrendingProducts(trendingProductsResponse.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <LoadingContext.Provider value={{ isLoading, defaultImages, trendingProducts }}>
            {children}
        </LoadingContext.Provider>
    );
};

export const useLoading = () => useContext(LoadingContext); 