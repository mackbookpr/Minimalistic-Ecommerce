import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(() => {
        // Initialize isLoading based on whether data is already in local storage
        const hasData = localStorage.getItem('defaultImages') && localStorage.getItem('trendingProducts');
        return !hasData;
    });
    const [defaultImages, setDefaultImages] = useState(() => {
        // Initialize state from local storage if available
        const storedDefaultImages = localStorage.getItem('defaultImages');
        return storedDefaultImages ? JSON.parse(storedDefaultImages) : [];
    });
    const [trendingProducts, setTrendingProducts] = useState(() => {
        // Initialize state from local storage if available
        const storedTrendingProducts = localStorage.getItem('trendingProducts');
        return storedTrendingProducts ? JSON.parse(storedTrendingProducts) : [];
    });

    useEffect(() => {
        if (!isLoading) return; // Skip fetching if data is already loaded from local storage

        const fetchData = async () => {
            try {
                const [defaultImagesResponse, trendingProductsResponse] = await Promise.all([
                    axios.get('https://minimalistic-ecommerce.onrender.com/defaultImages'),
                    axios.get('https://minimalistic-ecommerce.onrender.com/api/products'),
                ]);
                const defaultImagesData = defaultImagesResponse.data;
                const trendingProductsData = trendingProductsResponse.data;

                setDefaultImages(defaultImagesData);
                setTrendingProducts(trendingProductsData);

                // Store data in local storage
                localStorage.setItem('defaultImages', JSON.stringify(defaultImagesData));
                localStorage.setItem('trendingProducts', JSON.stringify(trendingProductsData));

                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [isLoading]);

    return (
        <LoadingContext.Provider value={{ isLoading, defaultImages, trendingProducts }}>
            {children}
        </LoadingContext.Provider>
    );
};

export const useLoading = () => useContext(LoadingContext);
