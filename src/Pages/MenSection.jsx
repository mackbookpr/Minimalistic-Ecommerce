import React, { useEffect } from 'react'
import FilterImage from '../assets/Filter.webp'
import { FaAngleDown } from "react-icons/fa6";
import FortWorth from "../assets/Men/FortWorth/FortWorth.webp"
import Dhoti1 from "../assets/Men/Dhoti/Dhoti1.webp"
import Lungi from "../assets/Men/Lungi/Lungi.webp"
import Filter from '../Components/Filter';
import { useSelector } from 'react-redux';

function MenSection() {
  const isDarkMode = useSelector(state => state.theme.isDarkMode);
  return (
    <>
      <div className="max-w-[1230px] px-5 py-5 m-auto flex justify-between">
        <h2 className='font-bold text-xl'>Men's ethnic wear</h2>
        <div className='flex gap-5 items-center'>
          <button className='font-bold text-xl'><span>Filters</span> <img src={FilterImage} className="h-[1.5em] w-[1.5em] inline" alt="Filters" /></button>
          <button className='font-bold text-xl'><span>Sort by</span><FaAngleDown style={{ fontSize: '1em', display: 'inline' }} /></button >
        </div>
      </div>
      <div className="flex max-w-[1230px] m-auto gap-24">
        <Filter />
        <div className="grid max-w-[1030px] grid-cols-4 gap-5">
          <div className="flex flex-col gap-2">
            <div className="relative py-[2.6em]" id="kurta1" style={{ backgroundColor: isDarkMode ? 'white' : '' }}>
              <img src={FortWorth} alt="FortWorth Kurta" className='w-full object-cover' />
              <div className="overlay"></div>
            </div>
            <div className="px-2 py-2">
              <h1 className='text-lg'>Men's Fortworth Kurta</h1>
              <h1>MRP: &#8377; 1395</h1>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="relative py-5" id="dhoti1" style={{ backgroundColor: isDarkMode ? 'white' : '' }}>
              <img src={Dhoti1} alt="FortWorth Kurta" className='w-full object-cover' />
              <div className="overlay"></div>
            </div>
            <div className="px-2 py-2">
              <h1 className='text-lg'>Men's Dhoti</h1>
              <h1>MRP: &#8377; 500</h1>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="kurta relative py-5" style={{ backgroundColor: isDarkMode ? 'white' : '' }}>
              <img src={Lungi} alt="FortWorth Kurta" className='w-full object-cover' />
              <div className="overlay"></div>
            </div>
            <div className="px-2 py-2">
              <h1 className='text-lg'>Men's Fortworth Kurta</h1>
              <h1>MRP: &#8377; 1395</h1>
            </div>
          </div>
          {/* <div className="flex flex-col gap-2">
            <div className="kurta relative py-5">
              <img src={FortWorth} alt="FortWorth Kurta" className='w-full' />
              <div className="overlay"></div>
            </div>
            <div className="px-2 py-2">
              <h1 className='text-lg'>Men's Fortworth Kurta</h1>
              <h1>MRP: &#8377; 1395</h1>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="kurta relative py-5">
              <img src={FortWorth} alt="FortWorth Kurta" className='w-full object-cover' />
              <div className="overlay"></div>
            </div>
            <div className="px-2 py-2">
              <h1 className='text-lg'>Men's Fortworth Kurta</h1>
              <h1>MRP: &#8377; 1395</h1>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="kurta relative py-5">
              <img src={FortWorth} alt="FortWorth Kurta" className='w-full' />
              <div className="overlay"></div>
            </div>
            <div className="px-2 py-2">
              <h1 className='text-lg'>Men's Fortworth Kurta</h1>
              <h1>MRP: &#8377; 1395</h1>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="kurta relative py-5">
              <img src={FortWorth} alt="FortWorth Kurta" className='w-full object-cover' />
              <div className="overlay"></div>
            </div>
            <div className="px-2 py-2">
              <h1 className='text-lg'>Men's Fortworth Kurta</h1>
              <h1>MRP: &#8377; 1395</h1>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="kurta relative py-5">
              <img src={FortWorth} alt="FortWorth Kurta" className='w-full' />
              <div className="overlay"></div>
            </div>
            <div className="px-2 py-2">
              <h1 className='text-lg'>Men's Fortworth Kurta</h1>
              <h1>MRP: &#8377; 1395</h1>
            </div>
          </div> */}
        </div>
      </div>
    </>
  )
}
export default MenSection