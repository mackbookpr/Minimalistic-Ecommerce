import React, { useState, useEffect } from 'react';
import BlackComputer from "../../Assets/Electronics/BlackComputer.png";
import { useCart } from "../../CartContext";
import { v4 as uuidv4 } from 'uuid';
import { useMediaQuery } from 'react-responsive';
import Trending from "../../Components/Trending";
import Newsletter from "../../Components/Newsletter";
import Footer from "../../Components/Footer";

function Product1() {
    const { addToCart } = useCart();
    const [Quantity, setQuantity] = useState(1);
    const [cost, setCost] = useState(10000);
    const [Background, setBackground] = useState('');

    useEffect(() => {
        setCost(Quantity * 10000);
    }, [Quantity]);

    const increment = () => {
        setQuantity(prev => prev + 1);
    };

    const decrement = () => {
        setQuantity(prev => prev >= 2 ? prev - 1 : prev);
    };

    const handleAddToCart = () => {
        addToCart({
            id: uuidv4(),
            name: 'BlackByte Computer',
            price: 9000,
            Quantity: Quantity,
            cost: cost,
            productName: "ShadowTech PC"
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
            <h1 className='absolute text-5xl font-bold flex left-1/2 justify-center -translate-x-1/2 z-10'>ShadowTech PC</h1>
            <div className={`${containerClass} gap-5`}>
                <div className="lg:w-1/2 w-full mt-16 lg:mb-8 mb-2 relative lg:h-[400px] h-[550px]">
                    <img src={BlackComputer} alt="" className='w-full h-full object-cover border-2 border-black' />
                </div>
                <div className="lg:w-1/2 w-full bg-orange-200 lg:py-40 py-10 px-5 flex text-lg flex-col gap-10 border border-black lg:h-[500px] h-[450px]">
                    <p>Our ShadowTech PC is designed to fit perfectly in any space, whether it's placed against a wall or tucked away in a corner. With its sleek design and powerful performance, it's the perfect choice for anyone looking for a stylish and efficient computer.</p>

                    <div className="flex justify-between items-center">
                        <h1 className='text-3xl font-bold'>Quantity</h1>
                        <div className='flex'>
                            <button className='px-4 py-2 bg-black text-white text-3xl' onClick={decrement}>-</button>
                            <h1 className='flex justify-center items-center w-[3em]'>{Quantity}</h1>
                            <button className='px-4 py-2 bg-black text-white' onClick={increment}>+</button>
                        </div>
                        <h1>&#x20B9;{cost}</h1>
                    </div>

                    <div className="flex justify-between">
                        <button className='py-2 px-10 border border-black' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{ background: Background }} onClick={handleAddToCart}>Add to Cart</button>
                        <button className='py-2 px-10 border border-black bg-orange-400'>Buy Now</button>
                    </div>
                </div>
            </div>

            <div className="flex gap-5 mt-5">
                <div className="w-1/3 bg-orange-300 h-[80px]">f</div>
                <div className="w-1/3 bg-orange-300 h-[80px]">sdf</div>
                <div className="w-1/3 bg-orange-300 h-[80px]">sdf</div>
            </div>
            <Trending/>
            <Newsletter/>
            <Footer/>
        </>
    );
}

export default Product1;
