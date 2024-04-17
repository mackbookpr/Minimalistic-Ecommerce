import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { CiShoppingCart } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross1 } from "react-icons/rx";
import { useEffect } from 'react';
import { useCart } from '../CartContext';
import Computer from "../Assets/Electronics/BlackComputer.png"
import BlueRefrigerator from "../Assets/Electronics/BlueRefrigerator.png"
import OrangeCCTVs from "../Assets/Electronics/OrangeCCTVs.png"
import WhiteDefibrillator from "../Assets/Electronics/WhiteDefibrillator.png"
import BlackSkinCare from "../Assets/SkinCare/BlackSkinCare.jpeg"
import BlueSkinCare from "../Assets/SkinCare/BlueSkinCare.png"
import OrangeSkinCare from "../Assets/SkinCare/OrangeSkinCare.jpeg"
import WhiteSkinCare from "../Assets/SkinCare/WhiteSkinCare.png"

function Navbar() {

    const { cartItems, updateCartItemQuantity, removeFromCart } = useCart();

    const handleRemovalShoppingCart = (ID) => {
        removeFromCart(ID);
    }

    const getImageName = (name) => {
        switch (name) {
            case "BlackByte Computer":
                return Computer;
            case "Blue Refrigerator":
                return BlueRefrigerator;
            case "OrangeCCTVs":
                return OrangeCCTVs;
            case "WhiteDefibrillator":
                return WhiteDefibrillator;
            case "BlackSkinCare":
                return BlackSkinCare;
            case "BlueSkinCare":
                return BlueSkinCare;
            case "OrangeSkinCare":
                return OrangeSkinCare;
            case "WhiteSkinCare":
                return WhiteSkinCare;
            default:
                return BlueRefrigerator;

        }
    }

    const texts = ['Furniture', 'Kitchen Items', 'Skincare Items', 'Electronic Products'];
    const totalQuantity = cartItems.reduce((total, item) => total + item.Quantity, 0);


    const [shoppingCart, handleShoppingCart] = useState(false);

    const typingSpeed = 50;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [typedText, setTypedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentText = texts[currentIndex];
        let interval;

        if (!isDeleting) {
            interval = setInterval(() => {
                setTypedText((prevText) => {
                    const nextText = prevText.length === currentText.length
                        ? prevText
                        : currentText.slice(0, prevText.length + 1);
                    if (nextText === currentText) {
                        clearInterval(interval);
                        setIsDeleting(true);
                    }
                    return nextText;
                });
            }, typingSpeed);
        } else {
            interval = setInterval(() => {
                setTypedText((prevText) => prevText.slice(0, prevText.length - 1));
                if (typedText === '') {
                    clearInterval(interval);
                    setTimeout(() => {
                        setIsDeleting(false);
                        setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
                    }, 1000);
                }
            }, typingSpeed);
        }

        return () => clearInterval(interval);

    }, [typedText, currentIndex, isDeleting]);

    const handleIncrementQuantity = (id) => {
        updateCartItemQuantity(id, 1); // Increment quantity by 1
    };

    const handleDecrementQuantity = (id, quantity) => {
        if (quantity >= 2) {
            updateCartItemQuantity(id, -1); // Decrement quantity by 1
        }
    };


    const [hide, setHide] = useState(true);
    const [hamburger, setHamburger] = useState();
    const [isVisible, setIsVisible] = useState(false);
    const [search, setSearch] = useState(false);
    const [value, setValue] = useState("");
    const [query, setQuery] = useState('');
    const onInput = (e) => setValue(e.target.value);

    const onClear = () => {
        setValue("");
        setSearch(false);
    };

    const handleSearchInputChange = (e) => {
        setSearch(true);
        setQuery(e.target.value);
    }

    return (
        <section className='sticky w-full top-0 z-50'>
            <section className='xl:max-w-[1265px] lg:max-w-[1035px] md:max-w-[830px] m-auto shadow-lg py-3 flex items-center justify-between h-[70px] gap-10 px-10 bg-white relative'>
                <h1 className={`text-xl text-orange-400 font-bold`}><Link to="/">Minimalistic Ecommerce</Link></h1>
                <div className='flex gap-24 justify-between text-orange-400 items-center'>
                    <div className={`flex items-center justify-end gap-2 md:gap-5`}>
                        <div className={`text-md gap-3 flex items-center rounded-xl bg-orange-200 py-1 md:px-2 px-1 w-[17em]`}>
                            <button><FaSearch size="17" color='black' onClick={() => setSearch(true)} /></button>
                            <input type="search" name="Search" value={value} onInput={onInput} placeholder={'Search for ' + (typedText + '|')} autoComplete='off' className={`Input bg-orange-200 focus:outline-none w-full`} onChange={handleSearchInputChange}
                            />
                        </div>
                        <div className='relative'>
                            <button><CiShoppingCart size={32} color='orange' onClick={() => handleShoppingCart(true)} /></button>
                            <h1 className='absolute -top-2 -right-2'>{totalQuantity}</h1>
                        </div>
                    </div>
                    {/* {!search && (<button className='lg:block xl:hidden' onClick={() => setHamburger(true)}><RxHamburgerMenu /></button>)}
                    {hamburger && (
                        <div className="xl:hidden absolute items-end flex flex-col top-0 h-[100vh] md:w-[300px] sm:w-[250px] w-[200px] right-0 z-50 justify-start py-7 bg-orange-200 gap-5 px-5">
                            <button onClick={() => setHamburger(false)} className=''><RxCross1 size={25} /></button>
                        </div>
                    )} */}
                </div>
                {shoppingCart && (
                    <div className="right-0 absolute w-[25rem] top-0 h-[100vh] bg-orange-50 px-5 flex flex-col justify-between z-20">
                        <div className="flex justify-between py-5">
                            <h1 className='text-xl'>Your Shopping Cart ({totalQuantity})</h1>
                            <button className="text-xl" onClick={() => handleShoppingCart(false)}><RxCross1 /></button>
                        </div>
                        <div className='overflow-y-scroll flex-col flex gap-5'>
                            {/* <div className='px-5'>{totalQuantity}</div> */}
                            {
                                cartItems.map(item => (
                                    <div className="flex items-center justify-center">
                                        <div className="w-1/3 relative">
                                            <img src={getImageName(item.name)} className="object-cover h-[130px] w-[130px] border-2 border-gray-500 hover:border-black" alt="" />
                                        </div>
                                        <div className="flex flex-col justify-center w-2/3 gap-5">
                                            <div className="flex gap-5 justify-center">
                                                <h1 className='text-md font-bold'>Quantity</h1>
                                                <button className=' bg-black text-white px-2 py-1' onClick={() => handleDecrementQuantity(item.id, item.Quantity)}>-</button>
                                                <h1 className='flex items-center justify-center'>{item.Quantity}</h1>
                                                <button className='px-1 py-1 bg-black text-white' onClick={() => handleIncrementQuantity(item.id)}>+</button>
                                            </div>
                                            <div className="flex justify-between">
                                                <h1 className='flex justify-start px-7'>&#x20B9;{item.cost}</h1>
                                                <button className="text-md px-7" onClick={() => handleRemovalShoppingCart(item.id)}><RxCross1 /></button>
                                            </div>
                                            <div>
                                                <h1 className='px-7'>{item.productName}</h1>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className='flex justify-between py-5'>
                            <button className='px-5 py-3 rounded-full bg-orange-400' onClick={() => handleShoppingCart(false)}>Continue Browsing</button>
                            <button className='px-7 py-3 rounded-full bg-orange-400'>Checkout Items</button>
                        </div>

                    </div>)}
            </section>
        </section>
    );
}
export default Navbar;
