import React, { useState, useEffect } from 'react';
import WhiteSkinCare from "../../Assets/SkinCare/WhiteSkinCare.png";
import { useCart } from "../../CartContext";
import { v4 as uuidv4 } from 'uuid';

function Product4() {
    const { addToCart } = useCart();
    const [Quantity, setQuantity] = useState(1);
    const [cost, setCost] = useState(500);
    const [Background, setBackground] = useState('');

    useEffect(() => {
        setCost(Quantity * 500);
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
            name: 'WhiteSkinCare',
            price: 500,
            Quantity: Quantity,
            cost: cost,
            productName:'Crisp Glow'
        });
    };

    const handleMouseEnter = () => {
        setBackground('#FB923C');
    };

    const handleMouseLeave = () => {
        setBackground('');
    };
    return (
        <>
            <h1 className='absolute text-5xl font-bold flex left-1/2 justify-center -translate-x-1/2 z-10'>Crisp Glow</h1>
            <div className="w-1/2 mt-16 mb-8 relative">
                <img src={WhiteSkinCare} alt="" className='w-full h-full object-cover border-2 border-black' />
            </div>
            <div className="w-1/2 bg-orange-200 py-40 px-5 flex text-lg flex-col gap-10 border border-black">
                <p>Crisp Glow: Our WhiteSkinCare line embraces purity and radiance, blending natural extracts to brighten and refine your complexion. With potent brightening agents like pearl extract, it diminishes dark spots and evens skin tone, revealing a luminous, flawless look. </p>

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
        </>
    )
}

export default Product4