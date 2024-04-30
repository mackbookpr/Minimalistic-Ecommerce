import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa6";

const ImageSlider = ({ images }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const extractImageName = (src) => src.split('/').slice(-1)[0].split('.')[0];

    return (
        <Slider {...settings}>
            {images.map((image, index) => (
                <div key={index} className='relative'>
                    <img
                        src={image.src}
                        alt={`image-${index}`}
                        className={`max-h-[30em] w-full object-cover z-10`}
                    />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center md:gap-5 gap-1">
                        <p className='md:text-[40px] font-semibold text-[22px] text-black filter contrast-150 '>{image.text}</p>
                        <Link to={`/${extractImageName(image.src)}`}>
                            <button className='md:py-2 md:px-5 px-2 py-1 bg-orange-400 text-white rounded-md md:text-sm text-[10px]'>Shop Now</button>
                        </Link>
                    </div>
                </div>
            ))}
        </Slider>
    );
};

export default ImageSlider;
