import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import ImageSlider from '../Components/DefaultSlider';
import Electronics from "../Assets/Default/Electronics.jpg"
import Furniture from "../Assets/Default/Furniture.jpg"
import Kitchen from "../Assets/Default/Kitchen.jpg"
import SkinCare from "../Assets/Default/SkinCare.jpg"
import Footer from '../Components/Footer';
import Newsletter from '../Components/Newsletter';
import Trending from '../Components/Trending';
import Inspiration from '../Components/Inspiration';

function DefaultPage() {

    // const [cookies, setCookies] = useState('');

    // useEffect(() => {
    //     async function fetchCookies() {
    //         try {
    //             const response = await axios.get('http://localhost:8080/', {
    //                 withCredentials: true
    //             });
    //             setCookies(response.data.cookies);
    //         } catch (error) {
    //             console.error('Error fetching Cookies:', error);
    //         }
    //     }

    //     fetchCookies();
    // }, []);

    const images = [
        { src: SkinCare, text: "Revive skin" }, { src: Kitchen, text: "Refine food" }, { src: Electronics, text: "New Home" }, { src: Furniture, text: "Live Well" },
    ];
    return (

        <div class="xl:max-w-[1265px] lg:max-w-[1035px] md:max-w-[830px] m-auto px-12 pt-20 pb-2">
            <ImageSlider images={images} />
            <Trending />
            <Newsletter />
            <Footer />
            <Inspiration />
        </div >



    )
}

export default DefaultPage