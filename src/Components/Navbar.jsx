import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { CiShoppingCart } from "react-icons/ci";
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

    const texts = ['Furniture Items', 'Kitchen Items', 'Skincare Items', 'Electronics Products'];
    const totalQuantity = cartItems.reduce((total, item) => total + item.Quantity, 0);

    const [shoppingCart, setShoppingCart] = useState(false);
    const [cartWidth, setCartWidth] = useState(0);

    const toggleShoppingCart = () => {
        setShoppingCart(!shoppingCart);
        setCartWidth(shoppingCart ? 0 : 'auto');
    }

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
    const [searchInput, setSearchInput] = useState("");
    const [filteredItems, setFilteredItems] = useState([]);

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setSearchInput(inputValue);
        if (!inputValue) setFilteredItems([]);

        const firstCharFilteredItems = texts.filter(item => {
            return item.charAt(0).toLowerCase() === inputValue.charAt(0).toLowerCase();
        });

        if (firstCharFilteredItems.length === 0) return [];

        const FilteredItems = firstCharFilteredItems.filter(item => {
            return item.toLowerCase().includes(inputValue.toLowerCase());
        });
        setFilteredItems(FilteredItems);
    };

    return (
        <section className='fixed top-0 w-full bg-white z-50'>
            <section className='xl:max-w-[1265px] lg:max-w-[1035px] md:max-w-[830px] m-auto shadow-lg py-3 flex items-center justify-between h-[70px] gap-10 px-12 bg-white relative'>
                <h1 className={`text-lg text-orange-400 font-bold md:text-2xl`}><Link to="/">Minimalistic Ecommerce</Link></h1>
                <div className='flex gap-24 justify-between text-orange-400 items-center'>
                    <div className={`flex items-center justify-end gap-2 md:gap-5`}>
                        <div className={`text-md gap-3 items-center bg-orange-200 sm:py-1 py-0 md:px-2 px-2 w-[17em] relative hidden sm:flex`}>
                            <button><FaSearch color='black' className='text-md' /></button>
                            <input type="search" name="Search" value={searchInput} onChange={handleInputChange} placeholder={'Search for ' + (typedText + '|')} autoComplete='off' className={`Input bg-orange-200 focus:outline-none w-full`} />
                            {searchInput && (
                                <div className="absolute bg-orange-100 w-full -bottom-4 left-0 translate-y-1/2 shadow-md">
                                    {filteredItems.map((item, index) => (
                                        <Link to={`/${filteredItems[0].split(' ')[0]}`}><div key={index} className="px-4 py-1 cursor-pointer">{item}</div></Link>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className='relative'>
                            <button><CiShoppingCart size={32} color='orange' onClick={toggleShoppingCart} /></button>
                            <h1 className='absolute -top-2 -right-2'>{totalQuantity}</h1>
                        </div>
                    </div>
                </div>
                {shoppingCart && (
                    <div className="right-0 absolute w-auto top-0 h-[100vh] bg-orange-50 px-5 flex flex-col justify-between z-20 xl:max-w-[1265px] lg:max-w-[1035px] md:max-w-[830px]" style={{ width: cartWidth, transition: 'width 5s' }}>
                        <div className="flex justify-between py-5">
                            <h1 className='text-xl'>Your Shopping Cart ({totalQuantity})</h1>
                            <button className="text-xl" onClick={toggleShoppingCart}><RxCross1 /></button>
                        </div>
                        <div className='overflow-y-scroll flex-col flex gap-5'>
                            {cartItems.map(item => (
                                <div className="flex items-center justify-center">
                                    <div className="w-1/3 relative">
                                        <img src={getImageName(item.name)} className="object-cover h-[130px] w-[130px] border-2 border-gray-500 hover:border-black" alt="" />
                                    </div>
                                    <div className="flex flex-col justify-center w-2/3 gap-5">
                                        <div className="flex gap-5 justify-between px-7">
                                            <h1 className='md:text-md text-sm font-bold'>Quantity</h1>
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
                            ))}
                        </div>
                        <div className='flex justify-between py-5 gap-5'>
                            <button className='rounded-xl bg-orange-400 py-2 px-3 text-md' onClick={toggleShoppingCart}>Continue Browsing</button>
                            <button className='px-3 py-2 text-md rounded-xl bg-orange-400'>Checkout Items</button>
                        </div>
                    </div>
                )}
            </section>
        </section>
    );
}

export default Navbar;
