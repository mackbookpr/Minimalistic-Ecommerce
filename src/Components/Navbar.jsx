import React from 'react';
import { MdWbSunny } from "react-icons/md";
import { FaMoon } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { CiShoppingCart } from "react-icons/ci";
import { FaComputer } from "react-icons/fa6";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleDarkMode, toggleLightMode } from '../Actions/ToogleDarkMode';

function Navbar() {
    const newSearchStyles = {
        position: 'fixed',
        left: 0,
        width: '100%',
        height: '10em',
    };
    const dispatch = useDispatch();
    const [isDark, setIsDark] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [search, setSearch] = useState(false);

    const handleDarkMode = () => {
        dispatch(toggleDarkMode());
        setIsDark(true);
    }

    const handleLightMode = () => {
        dispatch(toggleLightMode());
        setIsDark(false);
    }

    const handleVisibilityChange = () => {
        setIsVisible(!isVisible);
    }

    return (
        <section className='sticky w-full top-0'>
            <section className='max-w-[1300px] m-auto shadow-lg py-5 rounded-xl px-5 flex justify-between items-center'>
                {search ? <h1 className='sm:text-2xl text-lg text-orange-400 font-bold z-50'><Link to="/">VogueVibesIndia</Link></h1> : <h1 className='sm:text-2xl text-lg text-orange-400 font-bold'><Link to="/">VogueVibesIndia</Link></h1>}
                <section className='lg:flex gap-10 text-2xl hidden font-semibold text-orange-400 items-center'>
                    <Link to="/MenPage">Men</Link>
                    <Link to="/WomenPage">Women</Link>
                    <Link to="/KidsPage">Kids</Link>
                </section>
                <div className={`flex gap-5 items-center ${search ? 'search-active' : ''}`} style={search ? newSearchStyles : {}}>
                    <div className='text-xl gap-3 hidden sm:flex items-center rounded-xl bg-orange-200 py-1.5 px-2' >
                        <button><FaSearch color='black' /></button>
                        <input type="search" name="Search" id="" placeholder='Search' className='bg-orange-200 focus:outline-none' onChange={() => setSearch(true)} style={search ? { width: '30em',} : { width: '10em' }} />
                    </div>
                    <div className='relative flex items-center'>
                        <button onClick={handleVisibilityChange}>
                            {isDark ? <FaMoon color='orange' /> : <MdWbSunny color='orange' size={32} />}
                        </button>
                        {
                            (isVisible) &&
                            <ul className="absolute top-9 border-solid bg-white -left-10">
                                <div className="flex flex-col gap-1 bg-white rounded-xl shadow-md w-full pt-3">
                                    <li className='shadow-md flex items-center px-4 gap-2' onClick={handleLightMode}>
                                        <MdWbSunny color='orange' size={20} />
                                        <button className='block sm:text-lg text-md'>Light</button>
                                    </li>
                                    <li className='shadow-md flex items-center px-5 gap-2' onClick={handleDarkMode}>
                                        <FaMoon color='orange' />
                                        <button className='block sm:text-lg text-md'>Dark</button>
                                    </li>
                                    <li className='shadow-md flex items-center px-5 gap-2'>
                                        <FaComputer color='orange' />
                                        <button className='block sm:text-lg text-md'>System</button>
                                    </li>
                                </div>
                            </ul>
                        }
                    </div>
                    <button><CiShoppingCart size={32} color='orange' /></button>
                </div>


            </section>
        </section >
    );
}
export default Navbar;
