import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Trending() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await axios.get('http://localhost:8080/api/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }

        fetchProducts();
    }, []);

    return (
        <div>
            <h1 className='text-xl mt-14 mb-10 font-semibold'>Trending Now</h1>
            <div className="grid lg:grid-cols-4 xl:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-2 mt-5">
                {products.map(product => (
                    <Link key={product.id} to={`/${product.category}/${product.id}`}>
                        <div className="cursor-pointer relative border-gray-500 hover:border-black transition-all duration-400 border-2 sm:h-[280px] h-[362px]">
                            <img src={"http://localhost:8080/Public/" + product.category + "/" + product.imgName + ".png"} alt={product.name} className='object-cover w-[565px] h-[300px] sm:h-[220px] sm-[345px]' />
                            <div className="px-2">{product.name}</div>
                            <div className="px-2 mb-2">&#x20B9;{product.price}</div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Trending;
