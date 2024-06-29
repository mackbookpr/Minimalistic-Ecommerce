import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa6";

const ImageSlider = ({ images }) => {
    // State to track whether screen is mobile or not
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    // Slider settings
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    // Function to extract image name from URL
    const extractImageName = (src) => src.split('/').slice(-1)[0].split('.')[0];

    // Function to handle window resize
    const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
    };

    // Effect to handle window resize event listener
    useEffect(() => {
        window.addEventListener('resize', handleResize);

        // Clean up function to remove event listener when component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []); // Empty dependency array to run this effect only once

    return (
        isMobile ? (
            <div className='grid grid-cols-2 grid-rows-2 gap-2'>
                {images.map((image, index) => (
                    <div key={index} className='relative'>
                        <img
                            src={image.src}
                            alt={`image-${index}`}
                            className='sm:h-[37em] h-[25em] w-full object-cover z-10 rounded-xl'
                        />
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center md:gap-5 gap-1">
                            <p className='text-md md:text-3xl sm:text-md text-[12px] text-black font-semibold'>{image.text}</p>
                            <Link to={`/${extractImageName(image.src)}`}>
                                <button className='sm:px-4 px-1 sm:py-2 py-1 bg-orange-400 text-white rounded-md text-[8px]'>Shop Now</button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            <Slider {...settings}>
                {images.map((image, index) => (
                    <div key={index} className='relative'>
                        <img
                            src={image.src}
                            alt={`image-${index}`}
                            className='h-[52em] w-full object-cover z-10 rounded-xl'
                        />
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center md:gap-5 gap-1">
                            <p className='text-xl md:text-3xl sm:text-2xl text-black font-semibold'>{image.text}</p>
                            <Link to={`/${extractImageName(image.src)}`}>
                                <button className='px-4 py-2 bg-orange-400 text-white rounded-md text-md'>Shop Now</button>
                            </Link>
                        </div>
                    </div>
                ))}
            </Slider>
        )
    );
};

export default ImageSlider;
