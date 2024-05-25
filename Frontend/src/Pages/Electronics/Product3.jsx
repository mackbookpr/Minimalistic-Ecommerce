import React, { useState, useEffect } from 'react';
import { useCart } from "../../CartContext";
import { v4 as uuidv4 } from 'uuid';
import { useMediaQuery } from 'react-responsive';
import Categories from '../../Components/Categories';
import Trending from "../../Components/Trending";
import Newsletter from "../../Components/Newsletter";
import Footer from "../../Components/Footer";

function Product3() {
  const { addToCart } = useCart();
  const [Quantity, setQuantity] = useState(1);
  const [cost, setCost] = useState(1000);
  const [Background, setBackground] = useState('');

  useEffect(() => {
    setCost(Quantity * 1000);
  }, [Quantity]);

  function scrollToTop() {
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    scrollToTop();
  }, []);

  const increment = () => {
    setQuantity(prev => prev + 1);
  };

  const decrement = () => {
    setQuantity(prev => prev >= 2 ? prev - 1 : prev);
  };

  const handleAddToCart = () => {
    addToCart({
      id: uuidv4(),
      name: "OrangeCCTVs",
      price: 1000,
      category:'Electronics',
      imgName:'OrangeCCTVs',
      Quantity: Quantity,
      cost: cost,
      productName: "SunnyWatch Security"
    });
  };

  const handleMouseEnter = () => {
    setBackground('#FB923C');
  };

  const handleMouseLeave = () => {
    setBackground('');
  };

  const isLargeScreen = useMediaQuery({ minWidth: 1024 });
  const containerClass = isLargeScreen ? 'flex flex-row' : 'flex flex-col';

  return (
    <>
      <Categories />
      <div className='pt-[8rem]'>
        <h1 className='absolute lg:text-5xl md:text-2xl font-bold flex left-1/2 justify-center -translate-x-1/2 z-10'>SunnyWatch Security</h1>
        <div className={`${containerClass} gap-5`}>
          <div className="lg:w-1/2 w-full mt-16 lg:mb-8 mb-2 relative md:h-[550px] lg:h-[380px] h-[400px]">
            <img src={`http://localhost:8080/Public/Electronics/OrangeCCTVs.png`} alt="" className='w-full h-full object-cover border-2 border-black' />
          </div>
          <div className="lg:w-1/2 w-full bg-orange-200 lg:py-40 py-10 h-auto px-3 flex text-lg flex-col gap-10 border border-black lg:h-[440px] justify-center">
            <p>SunnyWatch Security: The pinnacle of modern security innovation. Their sleek design seamlessly integrates into any environment. Offering advanced surveillance capabilities, they ensure unparalleled protection.</p>

            <div className="flex justify-between items-center sm:flex-row flex-col gap-2">
              <h1 className='md:text-3xl text-md font-bold'>Quantity</h1>
              <div className='flex'>
                <button className='px-4 py-2 bg-black text-white text-3xl' onClick={decrement}>-</button>
                <h1 className='flex justify-center items-center w-[3em]'>{Quantity}</h1>
                <button className='px-4 py-2 bg-black text-white' onClick={increment}>+</button>
              </div>
              <h1>&#x20B9;{cost}</h1>
            </div>
            <div className="flex justify-between">
              <button className='xl:py-2 xl:px-20 lg:px-12 lg:py-1 border py-2 px-3 border-black' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{ background: Background }} onClick={handleAddToCart}>Add to Cart</button>
              <button className='xl:py-2 xl:px-20 lg:px-12 lg:py-1 px-3 py-2 border border-black bg-orange-400'>Buy Now</button>
            </div>
          </div>
        </div>
        <div className="flex gap-5 mt-5 md:flex-nowrap flex-wrap justify-center">
          <div className="sm:w-1/3 w-full bg-orange-300 h-[80px] flex items-center justify-center md:text-lg text-sm font-semibold">Weight:1kgs</div>
          <div className="sm:w-1/3 w-full  bg-orange-300 h-[80px] flex items-center justify-center md:text-lg text-sm font-semibold">Texture:Matte</div>
          <div className="sm:w-1/3 w-full bg-orange-300 h-[80px] flex items-center justify-center md:text-lg text-sm font-semibold">Size:4inch x 6inch</div>
        </div>
        <Trending />
        <Newsletter />
        <Footer />
      </div>
    </>
  );
}

export default Product3