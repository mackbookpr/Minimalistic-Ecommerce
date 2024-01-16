import React from 'react'
import Filter from '../assets/Filter.webp'
import { FaAngleDown } from "react-icons/fa6";

function MenSection() {
  return (
    <>
    <div className="container m-auto flex justify-between">
      <h2 className='font-bold text-[1.2em]'>Men's ethnic wear</h2>
      <div className='flex gap-5 items-center'>
        <button className='font-bold text-[1.2em]'><span>Filters</span> <img src={Filter} className="h-[1.5em] w-[1.5em] inline" alt="Filters" /></button>
        <button className='font-bold text-[1.2em]'><span>Sort by</span><FaAngleDown style={{fontSize:'1em',display:'inline'}}/></button >
      </div>
    </div>
    </>
  )
}

export default MenSection