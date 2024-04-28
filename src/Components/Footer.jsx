import React from 'react'

function Footer() {
    return (
        <div className='bg-orange-200 h-[7em] sm:h-[5em] mt-2 flex sm:gap-5 gap-2 justify-center items-center border-2 border-black text-[12px] sm:text-[20px]'>
            <a href="#" className='hover:underline'>About</a>
            <a href="#" className='hover:underline'>FAQs</a>
            <a href="#" className='hover:underline'>Contact Us</a>
            <a href="#" className='hover:underline'>Careers</a>
            <a href="#" className='hover:underline'>Store Locator</a>
        </div>
    )
}

export default Footer