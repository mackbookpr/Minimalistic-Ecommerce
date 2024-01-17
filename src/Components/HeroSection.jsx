import React from 'react';
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Background from "../assets/Background/Background.webp";

function HeroSection() {
  // const imagePaths = [MANQ, FortWorth, Gown];

  // const [currentIndex, setCurrentIndex] = useState(0);

  // const nextSlide = () => {
  //   setCurrentIndex((prevIndex) => (prevIndex + 1) % imagePaths.length);
  // };

  // const prevSlide = () => {
  //   setCurrentIndex((prevIndex) => (prevIndex - 1 + imagePaths.length) % imagePaths.length);
  // };
  return (
    <div className="max-w-[1230px] py-4 m-auto flex relative">
      <div className="absolute z-10 h-[33em] w-full">
        <div className="flex-col flex gap-3 justify-center h-full items-center text-center">
          <h1 className='text-[3em] text-orange-100 font-bold mt-[4em]'>Discover Handcrafted Indian Attire for Timeless Style</h1>
          <p className='text-[1.2em] text-white text-center'>
            Drap yourself in timeless elegance. Explore Indian handcrafts, where tradition meets exquisite detail, transcending fleeting trends.</p>
          <div>
            <button className='rounded-full bg-orange-300 px-4 py-2 text-white'>Shop Now</button>
          </div>
        </div>
      </div>
      <div className="w-full relative">
        <img src={Background} className="h-[33em] object-cover rounded-t-[15px] rounded-b-[15px] w-full" alt="" />
        <div className="absolute top-0 bg-black bg-opacity-50 w-full h-full rounded-t-[15px] rounded-b-[15px]">
        </div>
      </div>
      {/* <div className="image-carousel flex">
        <button className="left-carousel-button absolute" onClick={prevSlide}>
          <FaAngleLeft />
        </button>
        <img src={imagePaths[currentIndex]} alt={`${currentIndex + 1}`} />
        <button className="right-carousel-button absolute" onClick={nextSlide}>
          <FaAngleRight />
        </button>
      </div> */}
    </div>
  )
}
export default HeroSection



