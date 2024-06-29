import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useMediaQuery } from 'react-responsive';
import Trending from "../Components/Trending";
import Newsletter from "../Components/Newsletter";
import Footer from "../Components/Footer";
import Categories from '../Components/Categories';
import { useAuth } from '../authContext';
import { useCart } from '../CartContext';

function ProductPage() {

    const [products, setProducts] = useState([]);
    const { ID } = useParams();
    const [Quantity, setQuantity] = useState(1);
    const [cost, setCost] = useState();
    const { userID } = useAuth();
    const [price, setPrice] = useState();
    const [message, setMessage] = useState("");
    const { itemsAdded, setItemsAdded } = useCart();

    const increment = () => {
        setQuantity(prev => prev + 1);
    }
    const decrement = () => {
        Quantity >= 2 ? setQuantity(prev => prev - 1) : setQuantity(prev => prev);
    }

    useEffect(() => {
        setCost(Quantity * price);
    }, [price, Quantity]);

    const handleAddToCart = async (product) => {
        if (userID) {
            try {
                const response = await axios.post('https://minimalistic-ecommerce.onrender.com/cart/add', {
                    Name: product.name,
                    userId: userID,
                    productId: product.id,
                    quantity: Quantity,
                    price: product.price,
                    imgUrl: product.imageURL
                });
                if (response.status === 200) {
                    setItemsAdded(true);
                    const timer = setTimeout(() => {
                        setItemsAdded(false);
                    }, 10);
                    setMessage("Item added successfully!!")
                    return () => clearTimeout(timer);
                } else {
                    console.error('Error adding to cart:', response.data);
                }
            } catch (error) {
                console.error('Error adding to cart:', error);
            }
        } else {
            setMessage("Please Log In first!");
            setItemsAdded(true);
            const timer = setTimeout(() => {
                setItemsAdded(false);
            }, 1000);
            return () => clearTimeout(timer);
        }
    };


    useEffect(() => {
        setItemsAdded(false);
    }, [])

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await axios.get('https://minimalistic-ecommerce.onrender.com/api/products');
                setProducts(response.data.filter(product => product.id.toString() === ID));
                setPrice(price);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }

        fetchProducts();
    }, [ID, products]);

    useEffect(() => {
        if (products.length > 0) {
            const { price } = products[0];
            setPrice(price);
        }
    }, [products]);


    const [Background, setBackground] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
        setQuantity(1);
    }, [ID]);

    const handleMouseEnter = () => {
        setBackground('#FB923C');
    };

    const handleMouseLeave = () => {
        setBackground('');
    };

    const isLargeScreen = useMediaQuery({ minWidth: 1024 });
    const containerClass = isLargeScreen ? 'flex flex-row' : 'flex flex-col';

    return (
        <div className='xl:w-[1870px] w-[95vw] rounded-xl h-[500px] m-auto gap-10 flex-col px-2'>
            <Categories />
            {
                products.map((product) => (
                    <div key={product.id} className='pt-[8rem] pb-2'>
                        <h1 className='absolute lg:text-5xl md:text-2xl text-sm font-bold flex left-1/2 justify-center -translate-x-1/2 z-10 '>{product.name}</h1>
                        <div className={`${containerClass} gap-5`}>
                            <div className="lg:w-1/2 w-full mt-16 lg:mb-8 mb-2 relative md:h-[550px] lg:h-[580px] h-[400px]">
                                <img src={product.imageURL} alt="" className='w-full h-full object-cover border-2 border-black' />
                            </div>
                            <div className="lg:w-1/2 w-full bg-orange-200 lg:py-40 py-10 h-auto px-2 flex md:text-2xl flex-col gap-10 border border-black lg:h-[640px] justify-center">
                                <p className='sm:text-left text-center'>{product.description}</p>

                                <div className="flex justify-between items-center sm:flex-row flex-col gap-2">
                                    <h1 className='md:text-3xl text-md font-bold'>Quantity</h1>
                                    <div className='flex'>
                                        <button className='sm:px-4 sm:py-2 py-1 px-2 bg-black text-white text-3xl' onClick={decrement}>-</button>
                                        <h1 className='flex justify-center items-center w-[3em]'>{Quantity}</h1>
                                        <button className='sm:px-4 sm:py-2 py-1 px-2 bg-black text-white' onClick={increment}>+</button>
                                    </div>
                                    <h1>&#x20B9;{cost}</h1>
                                </div>

                                <div className="flex justify-between">
                                    <button className='xl:py-2 xl:px-20 lg:px-12 lg:py-1 border py-2 px-3 border-black' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{ background: Background }} onClick={() => handleAddToCart(product)}>Add to Cart</button>
                                    <button className='xl:py-2 xl:px-20 lg:px-12 lg:py-1 px-3 py-2 border border-black bg-orange-400'>Buy Now</button>
                                </div>
                            </div>
                        </div>

                        <Trending />
                        <Newsletter />
                        <Footer />
                        <div className={`absolute left-1/2 -translate-x-1/2 z-50 py-2 px-5 ${itemsAdded === false ? '-top-12 opacity-0' : 'top-32'} transition-all duration-1000 bg-orange-300 rounded-md`}>{message}</div>
                    </div>
                ))
            }
        </div>
    );
}

export default ProductPage;