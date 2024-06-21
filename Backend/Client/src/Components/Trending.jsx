// src/Components/Trending.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useLoading } from '../LoadingContext';

function Trending() {
    const { trendingProducts } = useLoading();

    return (
        <div>
            <h1 className='text-xl mt-14 mb-10 font-semibold'>Trending Now</h1>
            <div className="grid lg:grid-cols-4 xl:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-2 mt-5">
                {trendingProducts.map(product => (
                    <Link key={product.id} to={`/${product.category}/${product.id}`}>
                        <div className="rounded-xl cursor-pointer relative border-gray-500 hover:border-black transition-all duration-400 border-2 sm:h-[350px] h-[370px]">
                            <img src={product.imageURL} alt={product.name} className='object-cover w-[565px] h-[280px] sm:h-[280px] rounded-xl' />
                            <div className="px-2">{product.name}</div>
                            <div className="px-2 mb-2">&#x20B9;{product.price}</div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Trending;
