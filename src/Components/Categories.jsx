import React from 'react'
import { Link } from 'react-router-dom'

function Categories() {
    return (
        <div className="fixed top-[3.8rem] z-50 bg-white xl:w-[1165px] lg:w-[935px] md:w-[730px] sm:w-[500px] w-[260px] -translate-x-1/2 left-1/2 flex border-2 border-black mb-5 mt-4 flex-wrap h-[40px] text-[10px] md:text-lg sm:text-md">
            <Link to="/" className='border-l-0 border-t-0 border-b-0 border-r-2 h-full w-1/5 border-black flex items-center justify-center'>Home</Link>
            <Link to="/Electronics" className='border-l-0 border-t-0 border-b-0 border-r-2 h-full w-1/5 border-black flex justify-center items-center'>Electronics</Link>
            <Link to="/Furniture" className='border-l-0 border-t-0 border-b-0 border-r-2 h-full w-1/5 border-black flex justify-center items-center'>Furniture</Link>
            <Link to="/Kitchen" className='border-l-0 border-t-0 border-b-0 border-r-2 h-full w-1/5 border-black flex justify-center items-center'>Kitchen</Link>
            <Link to="/SkinCare" className='border-l-0 border-t-0 border-b-0 border-r-0 h-full w-1/5 border-black flex justify-center items-center'>Skincare</Link>
        </div>

    )
}

export default Categories