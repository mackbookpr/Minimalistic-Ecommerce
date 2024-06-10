import React, { useState, useEffect } from 'react';
import { FaSearch } from "react-icons/fa";
import Avatar from 'react-avatar';
import { Link, useLocation } from 'react-router-dom';
import { CiShoppingCart } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";
import { FaRegTrashCan } from "react-icons/fa6";
import { useAuth } from '../authContext';
import { useCart } from '../CartContext';
import axios from 'axios';

const Navbar = () => {
    const { userID, username, setUserID, setUserName } = useAuth();
    const { itemsAdded, setItemsAdded, itemsRemoved, setItemsRemoved, cartItems, setCartItems, quantity, setQuantity, cost, setCost } = useCart();
    const location = useLocation();


    const texts = ['Furniture Items', 'Kitchen Items', 'Skincare Items', 'Electronics Products'];
    const typingSpeed = 50;

    const [shoppingCart, setShoppingCart] = useState(false);
    const [cartWidth, setCartWidth] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [typedText, setTypedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [filteredItems, setFilteredItems] = useState([]);

    const toggleShoppingCart = () => {
        setShoppingCart(!shoppingCart);
        setCartWidth(shoppingCart ? 0 : 'auto');
    };

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

    const handleLogOut = async () => {
        try {
            await axios.post('http://localhost:8080/logout', {}, { withCredentials: true });
            setUserName(null);
            setUserID(null);
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setSearchInput(inputValue);
        if (!inputValue) setFilteredItems([]);

        const firstCharFilteredItems = texts.filter(item => {
            return item.charAt(0).toLowerCase() === inputValue.charAt(0).toLowerCase();
        });

        if (firstCharFilteredItems.length === 0) return [];

        const filteredItems = firstCharFilteredItems.filter(item => {
            return item.toLowerCase().includes(inputValue.toLowerCase());
        });
        setFilteredItems(filteredItems);
    };

    return (
        (location.pathname !== '/Register' && location.pathname !== '/LoginPage') ? (
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
                                            <Link to={`/${filteredItems[0].split(' ')[0]}`} key={index}><div className="px-4 py-1 cursor-pointer">{item}</div></Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                            {userID && <h1>Hello {username}</h1>}
                            {userID && (
                                <button>
                                    <Avatar name={`${username}`} round="50px" size="40px" />
                                </button>
                            )}
                            {!userID && <Link to="/Register" className='py-1 px-1.5 bg-orange-300 text-white rounded-md'>Register</Link>}
                            {!userID && <Link to="/LoginPage" className='py-1 px-1.5 bg-orange-300 text-white rounded-md'>Login</Link>}
                            {userID && <button className='py-1 px-1.5 bg-orange-300 text-white rounded-md' onClick={handleLogOut}>Log Out</button>}
                            <div className='relative'>
                                <button><CiShoppingCart size={32} color='orange' onClick={toggleShoppingCart} /></button>
                                {userID && <h1 className='absolute -right-5 -top-3'>{quantity}</h1>}
                            </div>
                        </div>

                        {shoppingCart && (
                            <div className="right-0 text-black absolute w-auto top-0 h-[100vh] bg-orange-50 px-5 flex flex-col justify-between z-20 xl:max-w-[1265px] lg:max-w-[1035px] md:max-w-[830px]" style={{ width: cartWidth, transition: 'width 5s' }}>
                                <div className="flex py-5">
                                    <button className="text-xl" onClick={toggleShoppingCart}><RxCross1 /></button>
                                </div>
                                <div className='overflow-y-scroll flex-col flex gap-5'>
                                    {
                                        cartItems.map(item => (
                                            <div id={item.key} className='flex gap-5'>
                                                <img src={item.imgUrl} className="h-[90px] w-[90px] object-cover" alt="" />
                                                <div className="flex flex-col items-start gap-2">
                                                    <div className="flex justify-between w-full">
                                                        <h1>{item.Name}</h1>
                                                        <button className="text-lg"><FaRegTrashCan /></button>
                                                    </div>
                                                    <div className='flex gap-2'>
                                                        <h1 className='text-md'>Quantity</h1>
                                                        <button className='py-1 px-2 bg-black text-white text-sm rounded-full'>-</button>
                                                        <h1 className='flex justify-center items-center w-[3em]'>{item.quantity}</h1>
                                                        <button className='py-1 px-1.5 rounded-full bg-black text-white text-sm'>+</button>
                                                    </div>
                                                    <h1>&#x20B9;{cost}</h1>
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
                    </div>
                </section>
            </section>
        ) : null
    );
};

export default Navbar;
