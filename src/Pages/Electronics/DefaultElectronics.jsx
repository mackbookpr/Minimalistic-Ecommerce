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
import Categories from '../../Components/Categories';
import Inspiration from '../../Components/Inspiration';

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

  function scrollToTop() {
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <>
      <Categories />
      <div className='pt-12 pb-2'>
        <div className='text-[10px] md:text-lg sm:text-md lg:flex-row lg:gap-0 gap-2 flex-col xl:w-[1165px] lg:w-[945px] md:w-[730px] sm:w-[500px] w-[260px] mt-20 flex justify-between border-none lg:border-2 border-t-black border-b-black border-l-black border-r-black items-center sticky m-auto z-10'>
          <div className='flex items-center'>
            <h1 className='text-md border-2 border-black border-r-0 py-2 border-l-2 border-b-black border-t-black ps-2 md:pe-5 px-1'>Filter</h1>
            <div className="relative">
              <button><h1 className='text-md border-2 border-r-black border-b-black border-t-black py-2 border-l-black md:px-5 px-1 flex items-center gap-3' onClick={() => { setColorDropDown(!colorDropDown); setSortByDropDown(false); }}>Color {colorDropDown ? <FaAngleDown /> : <FaAngleUp />}</h1></button>
              {colorDropDown &&
                (<div className="absolute -left-14 md:left-0 md:top-12 top-10 flex flex-col md:w-[150px] w-[120px] rounded-lg bg-orange-300 z-50">
                  <button className='border border-b-0 border-r-0 border-l-0 flex items-center justify-between px-5 text-sm py-2' onClick={() => handleColor('Blue')}>
                    <div className='rounded-full bg-blue-500 w-5 h-5' ></div>
                    Blue
                  </button>
                  <button className='border border-b-0 border-r-0 border-l-0 flex items-center justify-between px-5 text-sm py-2' onClick={() => handleColor('Black')}>
                    <div className='rounded-full bg-black w-5 h-5' ></div>
                    Black
                  </button>
                  <button className='border border-b-0 border-r-0 border-l-0 flex items-center justify-between px-5 text-sm py-2' onClick={() => handleColor('Orange')}>
                    <div className='rounded-full bg-orange-500 w-5 h-5' ></div>
                    Orange
                  </button>
                  <button className='border border-b-0 border-r-0 border-l-0 flex items-center justify-between px-5 text-sm py-2' onClick={() => handleColor('White')}>
                    <div className='rounded-full bg-white w-5 h-5' ></div>
                    White
                  </button>
                </div>)
              }
            </div>
          </div>
          <div className='relative border-2 border-l-black border-r-black border-b-black border-t-black'>
            <button><h1 className='text-md px-2  py-2 border-l-0 flex items-center gap-3' onClick={() => { setSortByDropDown(!sortByDropDown); setColorDropDown(false); }}>Sort By {sortByDropDown ? <FaAngleDown /> : <FaAngleUp />}</h1></button>
            {sortByDropDown &&
              (<div className="absolute -left-12 top-12 flex flex-col w-[150px] rounded-lg bg-orange-300 z-10">
                <button className='border border-b-0 border-r-0 border-l-0' onClick={() => toggleSortOrder('asc')}>Price:Low to High</button>
                <button className='border border-t-black border-b-0 border-r-0 border-l-0' onClick={() => toggleSortOrder('desc')}>Price:High to Low</button>
              </div>)
            }
          </div>
        </div>
        <div className='m-auto lg:max-w-[950px] md:max-w-[750px] xl:max-w-[1200px] xl:px-5 lg:px-1 md:px-2 px-12 my-1 flex flex-col'>
          <div className='grid lg:grid-cols-4 xl:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-5 mt-5'>
            {filteredProducts.map(item => (
              <Link to={`/Electronics/${item.id}`}>
                <div key={item.id} className='relative border-2 border-gray-500 hover:border-black flex flex-col gap-2 cursor-pointer'>
                  {item.imgName === 'BlackComputer' && <img src={BlackComputer} className="object-cover w-[565px] h-[300px] sm:h-[220px] sm-[345px]" alt="" />}
                  {item.imgName === 'BlueRefrigerator' && <img src={BlueRefrigerator} className="object-cover w-[565px] h-[300px] sm:h-[220px] sm-[345px]" alt="" />}
                  {item.imgName === 'OrangeCCTVs' && <img src={OrangeCCTVs} className="object-cover w-[565px] h-[300px] sm:h-[220px] sm-[345px]" alt="" />}
                  {item.imgName === 'WhiteDefibrillator' && <img src={WhiteDefibrillator} className="object-cover w-[565px] h-[300px] sm:h-[220px] sm-[345px]" alt="" />}
                  <div>
                    <h1 className='px-2'>{item.name}</h1>
                    <h1 className='px-2 mb-2'>Price:{item.price}</h1>
                  </div>
                </div>
              </Link>

            ))}
          </div>
          <Trending />
          <Newsletter />
          <Footer />
          <Inspiration />
        </div >
      </div>
    </>
  )
}

export default DefaultElectronics;