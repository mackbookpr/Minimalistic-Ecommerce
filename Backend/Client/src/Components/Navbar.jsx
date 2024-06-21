import React, { useState, useEffect } from 'react';
import { FaSearch } from "react-icons/fa";
import Avatar from 'react-avatar';
import { Link, useLocation } from 'react-router-dom';
import { CiShoppingCart } from "react-icons/ci";
import { useAuth } from '../authContext';
import { useCart } from '../CartContext';
import axios from 'axios';
import Cart from './Cart';
import { useLoading } from '../LoadingContext';

const Navbar = () => {
    const { userID, username, setUserID, setUserName, url } = useAuth();
    const { isLoading } = useLoading();
    const { setItemsRemoved, cartItems, setItemsAdded, quantity, setQuantity, calculateTotalCost } = useCart();
    const location = useLocation();

    const texts = ['Furniture Items', 'Kitchen Items', 'Skincare Items', 'Electronics Products'];
    const typingSpeed = 50;

    const [shoppingCart, setShoppingCart] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [typedText, setTypedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [filteredItems, setFilteredItems] = useState([]);

    const toggleShoppingCart = () => {
        setShoppingCart(!shoppingCart);
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

    const pathNames = ['/Register', '/LoginPage', '/checkout', '/orders', 'ErrorPage'];

    return (
        ((!pathNames.includes(location.pathname)) && (isLoading === false)) ? (
            <section className='fixed top-0 w-full bg-white z-50'>
                <section className='rounded-xl xl:w-[1850px] w-[95vw] m-auto shadow-lg py-3 flex items-center justify-between h-[70px] gap-10 bg-white relative px-5'>
                    <h1 className={`sm:text-lg text-[15px] text-orange-400 font-bold md:text-2xl`}><Link to="/">Minimalistic Ecommerce</Link></h1>
                    <div className='flex gap-24 justify-between text-orange-400 items-center'>
                        <div className={`flex items-center justify-end gap-2 md:gap-5`}>
                            <div className={`text-md gap-3 items-center bg-orange-200 sm:py-1 py-0 md:px-2 px-2 w-[17em] relative hidden lg:flex`}>
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
                                    {/* {url !== '' ? <img src={url} alt="" /> : <Avatar name={`${username}`} round="50px" size="40px" />} */}
                                </button>
                            )}
                            {!userID && <Link to="/Register" className='md:py-1 md:px-1.5 py-0.5 px-0.5 md:text-[16px] text-[10px]  bg-orange-300 text-white rounded-md'>Register</Link>}
                            {!userID && <Link to="/LoginPage" className='md:py-1 md:px-1.5 py-0.5 px-0.5 md:text-[16px] text-[10px] bg-orange-300 text-white rounded-md'>Login</Link>}
                            {userID && <button className='py-1 px-1.5 md:text-[16px] text-[14px] bg-orange-300 text-white rounded-md' onClick={handleLogOut}>Log Out</button>}
                            <div className='relative'>
                                <button><CiShoppingCart size={32} color='orange' onClick={toggleShoppingCart} /></button>
                                {userID && <h1 className='absolute -right-4 -top-2'>{quantity}</h1>}
                            </div>
                        </div>

                        {shoppingCart && (
                            <Cart shoppingCart={shoppingCart} setShoppingCart={setShoppingCart} />
                        )}
                    </div>
                </section>
            </section>
        ) : null
    );
};

export default Navbar;
