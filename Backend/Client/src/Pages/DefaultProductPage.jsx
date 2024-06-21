import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Categories from '../Components/Categories';
import Trending from '../Components/Trending';
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import Footer from '../Components/Footer';
import Newsletter from '../Components/Newsletter';

function DefaultProductPage() {
    const { category } = useParams();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [colorDropDown, setColorDropDown] = useState(false);
    const [sortByDropDown, setSortByDropDown] = useState(false);
    const [selectedColor, setSelectedColor] = useState([]);
    const [sortOrder, setSortOrder] = useState('asc');
    const handleColor = (color) => {
        const newSelectedColor = [...selectedColor];
        if (!newSelectedColor.includes(color.toLowerCase())) {
            newSelectedColor.push(color.toLowerCase());
        } else {
            newSelectedColor.splice(newSelectedColor.indexOf(color.toLowerCase()), 1);
        }
        setSelectedColor(newSelectedColor);
    };

    const toggleSortOrder = (order) => {
        setSortOrder(order);
    };

    function scrollToTop() {
        window.scrollTo(0, 0);
    }

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await axios.get('http://localhost:8080/api/products');
                const products = response.data.filter(product => product.category.toLowerCase() === category.toLowerCase());
                setProducts(products);
                setFilteredProducts(products); // Initialize filteredProducts with all products
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }

        fetchProducts();
        scrollToTop();
    }, [category]);

    useEffect(() => {
        let filtered = products;

        if (selectedColor.length > 0) {
            filtered = filtered.filter(product =>
                selectedColor.includes(product.color.toLowerCase())
            );
        }

        if (sortOrder === 'asc') {
            filtered = filtered.sort((a, b) => a.price - b.price);
        } else {
            filtered = filtered.sort((a, b) => b.price - a.price);
        }

        setFilteredProducts(filtered);
    }, [selectedColor, sortOrder, products]);


    return (
        <>
            <Categories />
            <div className='pt-12 pb-2'>
                <div className='text-[10px] md:text-lg sm:text-md lg:gap-0 gap-2 xl:w-[1850px] w-[95vw] mt-20 flex justify-between border-none lg:border-2 border-t-black border-b-black border-l-black border-r-black items-center sticky m-auto z-10'>
                    <div className='flex items-center'>
                        <div className="relative">
                            <button><h1 className='text-md border-2 rounded-xl border-r-black border-b-black border-t-black py-2 border-l-black md:px-5 px-1 flex items-center gap-3' onClick={() => { setColorDropDown(!colorDropDown); setSortByDropDown(false); }}>Color {colorDropDown ? <FaAngleDown /> : <FaAngleUp />}</h1></button>
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
                    <div className='relative border-2 border-l-black border-r-black border-b-black border-t-black rounded-xl'>
                        <button><h1 className='text-md px-2  py-2 border-l-0 flex items-center gap-3' onClick={() => { setSortByDropDown(!sortByDropDown); setColorDropDown(false); }}>Sort By {sortByDropDown ? <FaAngleDown /> : <FaAngleUp />}</h1></button>
                        {sortByDropDown &&
                            (<div className="absolute -left-12 top-12 flex flex-col w-[150px] rounded-lg bg-orange-300 z-10">
                                <button className='border border-b-0 border-r-0 border-l-0' onClick={() => toggleSortOrder('asc')}>Price:Low to High</button>
                                <button className='border border-t-black border-b-0 border-r-0 border-l-0' onClick={() => toggleSortOrder('desc')}>Price:High to Low</button>
                            </div>)
                        }
                    </div>
                </div>
                <div className='m-auto w-[95vw] rounded-xl flex flex-col xl:w-[1850px]'>
                    <div className='grid lg:grid-cols-4 xl:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-5 mt-5'>
                        {filteredProducts.map(item => (
                            <Link to={`/${category}/${item.id}`}>
                                <div key={item.id} className='rounded-xl relative border-2 border-gray-500 hover:border-black flex flex-col gap-2 cursor-pointer'>
                                    <img src={item.imageURL} alt={item.name} className="object-cover w-[565px] h-[300px] sm:h-[220px] sm-[345px] rounded-xl"/>
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
                </div >
            </div>
        </>
    )
}

export default DefaultProductPage