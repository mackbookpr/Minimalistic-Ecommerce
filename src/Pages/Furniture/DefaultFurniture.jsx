import React from 'react'
import {useState,useEffect} from 'react';

function DefaultFurniture() {

  // const [colorDropDown, setColorDropDown] = useState(false);
  // const [sortByDropDown, setSortByDropDown] = useState(false);
  // const [selectedColor, setSelectedColor] = useState([]);
  // const [sortOrder, setSortOrder] = useState('asc');
  // const [filteredProducts, setFilteredProducts] = useState(Products);

  // const handleColor = (color) => {
  //   const newSelectedColor = [...selectedColor];
  //   if (!newSelectedColor.includes(color.toLowerCase())) {
  //     newSelectedColor.push(color.toLowerCase());
  //   } else {
  //     newSelectedColor.splice(selectedColor.indexOf(color.toLowerCase()), 1);
  //   }
  //   setSelectedColor(newSelectedColor);
  // };

  // const toggleSortOrder = (order) => {
  //   setSortOrder(order);
  // };

  // useEffect(() => {
  //   const filteredProducts = Products.filter(product =>
  //     selectedColor.length === 0 || selectedColor.includes(product.color.toLowerCase())
  //   );

  //   const FilteredProducts = filteredProducts.sort((a, b) => {
  //     if (sortOrder === 'asc') {
  //       return a.price - b.price;
  //     } else {
  //       return b.price - a.price;
  //     }
  //   });

  //   setFilteredProducts(FilteredProducts);
  // }, [selectedColor, sortOrder]);

  return (
    <>
      {/* <div className='max-w-[1238px] flex justify-between border border-t-black border-b-black border-l-0 border-r-0 items-center sticky m-auto z-50'>
        <div className='flex items-center'>
          <h1 className='text-xl border border-r-black py-2 border-l-0 pe-5 px-1.5'>Filter</h1>
          <div className="relative">
            <button><h1 className='text-xl border border-r-black py-2 border-l-0 pe-10 ps-5 flex items-center gap-3' onClick={() => setColorDropDown(!colorDropDown)}>Color {colorDropDown ? <FaAngleDown /> : <FaAngleUp />}</h1></button>
            {colorDropDown &&
              (<div className="absolute left-0 top-12 flex flex-col w-full rounded-lg bg-orange-300">
                <button className='border border-b-0 border-r-0 border-l-0 flex items-center justify-between px-5 text-lg' onClick={() => handleColor('Blue')}>
                  <div className='rounded-full bg-blue-500 w-5 h-5' ></div>
                  Blue
                </button>
                <button className='border border-b-0 border-r-0 border-l-0 flex items-center justify-between text-lg px-5' onClick={() => handleColor('Black')}>
                  <div className='rounded-full bg-black w-5 h-5' ></div>
                  Black
                </button>
                <button className='border border-b-0 border-r-0 border-l-0 flex items-center justify-between text-lg px-5' onClick={() => handleColor('Orange')}>
                  <div className='rounded-full bg-orange-500 w-5 h-5' ></div>
                  Orange
                </button>
                <button className='border border-b-0 border-r-0 border-l-0 flex items-center justify-between text-lg px-5' onClick={() => handleColor('White')}>
                  <div className='rounded-full bg-white w-5 h-5' ></div>
                  White
                </button>
              </div>)
            }
          </div>
        </div>
        <div className='relative'>
          <button><h1 className='text-xl border border-l-black border-r-0 py-2 border-l-0 pe-2 flex items-center gap-3' onClick={() => setSortByDropDown(!sortByDropDown)}>Sort By {sortByDropDown ? <FaAngleDown /> : <FaAngleUp />}</h1></button>
          {sortByDropDown &&
            (<div className="absolute -left-12 top-12 flex flex-col w-[150px] rounded-lg bg-orange-300">
              <button className='border border-b-0 border-r-0 border-l-0' onClick={() => toggleSortOrder('asc')}>Price:Low to High</button>
              <button className='border border-t-black border-b-0 border-r-0 border-l-0' onClick={() => toggleSortOrder('desc')}>Price:High to Low</button>
            </div>)
          }
        </div>
      </div>
      <div className='m-auto max-w-[1270px] px-4 my-1 flex flex-col'>
        <div className='grid grid-cols-4 gap-5 mt-5'>
          {filteredProducts.map(item => (
            <div key={item.id} className='relative'>
              <div className='relative'>
                {item.imgName === 'BlackComputer' && <img src={BlackComputer} className="rounded-t-xl" alt="" />}
                {item.imgName === 'BlueRefrigerator' && <img src={BlueRefrigerator} className="rounded-t-xl" alt="" />}
                {item.imgName === 'OrangeCCTVs' && <img src={OrangeCCTVs} className="rounded-t-xl" alt="" />}
                {item.imgName === 'WhiteDefibrillator' && <img src={WhiteDefibrillator} className="rounded-t-xl" alt="" />}
                <div className="absolute bg-black w-full left-0 top-0 h-full opacity-40 rounded-t-xl"></div>
              </div>
              <div className='flex flex-col items-center'>Price:{item.price}</div>
            </div>
          ))}
        </div>
      </div> */}
    </>
  )
}

export default DefaultFurniture