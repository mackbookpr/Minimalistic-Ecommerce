import React, { useState, useEffect } from 'react';
import { FaSearch } from "react-icons/fa";
import { Link, useLocation } from 'react-router-dom';
import { CiShoppingCart } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";
import { useAuth } from '../authContext';

const Navbar = () => {
    const { userID } = useAuth();
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
                            {/* {userID ? <h1>Hello {userID}</h1> : <h1></h1>} */}
                            <Link to="/Register" className='py-1 px-1.5 bg-orange-300 text-white rounded-md'>Register</Link>
                            <Link to="/LoginPage" className='py-1 px-1.5 bg-orange-300 text-white rounded-md'>Login</Link>
                            <div className='relative'>
                                <button><CiShoppingCart size={32} color='orange' onClick={toggleShoppingCart} /></button>
                            </div>
                        </div>
                    </div>
                    {shoppingCart && (
                        <div className="right-0 absolute w-auto top-0 h-[100vh] bg-orange-50 px-5 flex flex-col justify-between z-20 xl:max-w-[1265px] lg:max-w-[1035px] md:max-w-[830px]" style={{ width: cartWidth, transition: 'width 5s' }}>
                            <div className="flex justify-between py-5">
                                <button className="text-xl" onClick={toggleShoppingCart}><RxCross1 /></button>
                            </div>
                            <div className='overflow-y-scroll flex-col flex gap-5'>
                                {/* Cart items rendering logic here */}
                            </div>
                            <div className='flex justify-between py-5 gap-5'>
                                <button className='rounded-xl bg-orange-400 py-2 px-3 text-md' onClick={toggleShoppingCart}>Continue Browsing</button>
                                <button className='px-3 py-2 text-md rounded-xl bg-orange-400'>Checkout Items</button>
                            </div>
                        </div>
                    )}
                </section>
            </section>
        ) : null
    );
}

export default Navbar;
