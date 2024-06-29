import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    const scrolltoTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
    return (
        <div className='bg-orange-200 h-[7em] sm:h-[5em] mt-2 flex sm:gap-5 gap-2 justify-center items-center border-2 border-black text-[8px] sm:text-[20px] rounded-xl'>
            <Link to="/" className='hover:underline' onClick={() => scrolltoTop()}>About</Link>
            <Link to="/" className='hover:underline' onClick={() => scrolltoTop()}>FAQs</Link>
            <Link to="/" className='hover:underline' onClick={() => scrolltoTop()}>Contact Us</Link>
            <Link to="/" className='hover:underline' onClick={() => scrolltoTop()}>Careers</Link>
            <Link to="/" className='hover:underline' onClick={() => scrolltoTop()}>Store Locator</Link>
        </div>
    )
}

export default Footer