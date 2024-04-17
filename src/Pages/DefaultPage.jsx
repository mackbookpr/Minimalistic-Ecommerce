import React from 'react'
import ImageSlider from '../Components/DefaultSlider';
import Electronics from "../Assets/Default/Electronics.jpg"
import Furniture from "../Assets/Default/Furniture.jpg"
import Kitchen from "../Assets/Default/Kitchen.jpg"
import SkinCare from "../Assets/Default/SkinCare.jpg"
import Footer from '../Components/Footer';
import Newsletter from '../Components/Newsletter';
import Trending from '../Components/Trending';

function DefaultPage() {

    const images = [
        { src: SkinCare, text: "Nourish Your Skin" }, { src: Kitchen, text: "Elevate Your Cooking" }, { src: Electronics, text: "Elevate your home experience" }, { src: Furniture, text: "Live Comfortably" },
    ];
    return (

        <div class="xl:max-w-[1265px] lg:max-w-[1035px] md:max-w-[830px] m-auto px-9 py-2">
            <ImageSlider images={images} />
            <Trending/>
            <Newsletter />
            <Footer />
        </div >



    )
}

export default DefaultPage