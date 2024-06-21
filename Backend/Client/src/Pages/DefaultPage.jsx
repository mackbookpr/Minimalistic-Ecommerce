// src/Pages/DefaultPage.jsx
import React from 'react';
import ImageSlider from '../Components/DefaultSlider';
import Footer from '../Components/Footer';
import Newsletter from '../Components/Newsletter';
import Trending from '../Components/Trending';
import { useLoading } from '../LoadingContext';

function DefaultPage() {
    const { defaultImages } = useLoading();

    return (
        <div className="xl:max-w-[1950px] lg:max-w-[1650px] md:max-w-[1300px] m-auto md:px-12 px-4 pt-20 pb-2">
            <ImageSlider images={defaultImages} />
            <Trending />
            <Newsletter />
            <Footer />
        </div>
    );
}

export default DefaultPage;
