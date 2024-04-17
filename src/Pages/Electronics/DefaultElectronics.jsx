import React from 'react'
import Products from "../../Data/data.json"
import { useState } from 'react';
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";
import { useEffect } from 'react';
import BlackComputer from "../../Assets/Electronics/BlackComputer.png"
import BlueRefrigerator from "../../Assets/Electronics/BlueRefrigerator.png"
import OrangeCCTVs from "../../Assets/Electronics/OrangeCCTVs.png"
import WhiteDefibrillator from "../../Assets/Electronics/WhiteDefibrillator.png"
import { Link } from 'react-router-dom';
import Footer from "../../Components/Footer";
import Newsletter from '../../Components/Newsletter';
import Trending from '../../Components/Trending';

function DefaultElectronics() {

  const [colorDropDown, setColorDropDown] = useState(false);
  const [sortByDropDown, setSortByDropDown] = useState(false);
  const [selectedColor, setSelectedColor] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleColor = (color) => {
    const newSelectedColor = [...selectedColor];
    if (!newSelectedColor.includes(color.toLowerCase())) {
      newSelectedColor.push(color.toLowerCase());
    } else {
      newSelectedColor.splice(selectedColor.indexOf(color.toLowerCase()), 1);
    }
    setSelectedColor(newSelectedColor);
  };

  const toggleSortOrder = (order) => {
    setSortOrder(order);
  };

  useEffect(() => {

    const products = Products.filter(Product => Product.category === "Electronics");

    const filteredProducts = products.filter(product =>
      selectedColor.length === 0 || (selectedColor.includes(product.color.toLowerCase()))
    );

    const FilteredProducts = filteredProducts.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });

    setFilteredProducts(FilteredProducts);
  }, [selectedColor, sortOrder]);

  return (
    <>
      <div className='max-w-[1180px] flex justify-between border border-t-black border-b-black border-l-0 border-r-0 items-center sticky m-auto z-10'>
        <div className='flex items-center'>
          <h1 className='text-md border border-r-black py-2 border-l-0 pe-5'>Filter</h1>
          <div className="relative">
            <button><h1 className='text-md border border-r-black py-2 border-l-0 pe-10 ps-5 flex items-center gap-3' onClick={() => setColorDropDown(!colorDropDown)}>Color {colorDropDown ? <FaAngleDown /> : <FaAngleUp />}</h1></button>
            {colorDropDown &&
              (<div className="absolute left-0 top-12 flex flex-col w-full rounded-lg bg-orange-300">
                <button className='border border-b-0 border-r-0 border-l-0 flex items-center justify-between px-5' onClick={() => handleColor('Blue')}>
                  <div className='rounded-full bg-blue-500 w-5 h-5' ></div>
                  Blue
                </button>
                <button className='border border-b-0 border-r-0 border-l-0 flex items-center justify-between px-5' onClick={() => handleColor('Black')}>
                  <div className='rounded-full bg-black w-5 h-5' ></div>
                  Black
                </button>
                <button className='border border-b-0 border-r-0 border-l-0 flex items-center justify-between px-5' onClick={() => handleColor('Orange')}>
                  <div className='rounded-full bg-orange-500 w-5 h-5' ></div>
                  Orange
                </button>
                <button className='border border-b-0 border-r-0 border-l-0 flex items-center justify-between px-5' onClick={() => handleColor('White')}>
                  <div className='rounded-full bg-white w-5 h-5' ></div>
                  White
                </button>
              </div>)
            }
          </div>
        </div>
        <div className='relative'>
          <button><h1 className='text-md border border-l-black border-r-0 py-2 border-l-0 flex items-center gap-3' onClick={() => setSortByDropDown(!sortByDropDown)}>Sort By {sortByDropDown ? <FaAngleDown /> : <FaAngleUp />}</h1></button>
          {sortByDropDown &&
            (<div className="absolute -left-12 top-12 flex flex-col w-[150px] rounded-lg bg-orange-300">
              <button className='border border-b-0 border-r-0 border-l-0' onClick={() => toggleSortOrder('asc')}>Price:Low to High</button>
              <button className='border border-t-black border-b-0 border-r-0 border-l-0' onClick={() => toggleSortOrder('desc')}>Price:High to Low</button>
            </div>)
          }
        </div>
      </div>
      <div className='m-auto max-w-[1210px] px-4 my-1 flex flex-col'>
        <div className='grid grid-cols-6 gap-5 mt-5'>
          {filteredProducts.map(item => (
            <Link to={`/Electronics/${item.id}`} key={item.id} className='relative'>
              <div className='relative border-2 border-gray-500 hover:border-black'>
                {item.imgName === 'BlackComputer' && <img src={BlackComputer} alt="" />}
                {item.imgName === 'BlueRefrigerator' && <img src={BlueRefrigerator}alt="" />}
                {item.imgName === 'OrangeCCTVs' && <img src={OrangeCCTVs}alt="" />}
                {item.imgName === 'WhiteDefibrillator' && <img src={WhiteDefibrillator}alt="" />}
              </div>
              <div className='flex flex-col items-center'>Price:{item.price}</div>
            </Link>
          ))}
        </div>
        <Trending/>
        <Newsletter />
        <Footer />
      </div >
    </>
  )
}

export default DefaultElectronics;