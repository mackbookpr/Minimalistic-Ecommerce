import React from 'react';
import { useAuth } from '../authContext';
import { useCart } from '../CartContext';
import axios from 'axios';
import { RxCross1 } from "react-icons/rx";
import { FaRegTrashCan } from "react-icons/fa6";
import { Link } from 'react-router-dom';

function Cart({ shoppingCart, setShoppingCart }) {
    const { userID } = useAuth();
    const { setItemsRemoved, cartItems, setItemsAdded, quantity, setQuantity, calculateTotalCost } = useCart();

    const handleAddInCart = async (productId, action, Quantity) => {
        let newQuantity = Quantity;

        if (action === 'increase') {
            newQuantity += 1;
        }
        else {
            newQuantity = (Quantity >= 2 ? Quantity - 1 : Quantity);
        }
        const response = await axios.post('https://minimalistic-ecommerce.onrender.com/quantityChange', {
            newQuantity, productId, userID
        });
        if (response.status === 200 && action === 'increase') {
            setItemsAdded(true);
        }
        else if (response.status === 200 && action === 'decrease') {
            setItemsRemoved(true);
        }
    };

    const handleCartItemRemoval = async (id) => {
        try {
            const removal = await axios.post('https://minimalistic-ecommerce.onrender.com/cart/remove', {
                userId: userID,
                productId: id
            });
            if (removal.status === 200) {
                setItemsRemoved(true);
                const timer = setTimeout(() => {
                    setItemsRemoved(false);
                }, 10);

                return () => clearTimeout(timer);
            }
        }
        catch (err) {
            console.log(err.message);
        }
    };

    const handleCost = (quantity, price) => {
        return quantity * price;
    };

    const toggleShoppingCart = () => {
        setShoppingCart(!shoppingCart);
    };

    return (
        <div className="-right-7 text-black absolute w-auto top-0 h-[100vh] bg-orange-50 px-5 flex flex-col justify-between z-20 xl:max-w-[1265px] lg:max-w-[1035px] md:max-w-[830px]" style={{ width: shoppingCart ? 'auto' : 0, transition: 'width 5s' }}>
            <div className="flex py-5 gap-2">
                <button className="text-xl" onClick={toggleShoppingCart}><RxCross1 /></button>
                <h1 className='font-bold text-xl'>Subtotal: &#x20B9;{calculateTotalCost()}</h1>
            </div>
            <div className='overflow-y-scroll flex-col flex gap-5'>
                {
                    cartItems.map(item => (
                        <div id={item.key} className='flex gap-5' key={item.key}>
                            <img src={item.imgUrl} className="h-[90px] w-[90px] object-cover" alt="" />
                            <div className="flex flex-col items-start gap-2 text-sm">
                                <div className="flex justify-between w-full">
                                    <h1>{item.Name}</h1>
                                    <button className="text-lg" onClick={() => handleCartItemRemoval(item.productId)}><FaRegTrashCan /></button>
                                </div>
                                <div className='flex gap-2 text-sm'>
                                    <h1 className='text-md'>Quantity</h1>
                                    <button className='py-0.5 px-2 bg-black text-white text-sm rounded-full' onClick={() => { handleAddInCart(item.productId, "decrease", item.quantity) }}>-</button>
                                    <h1 className='flex justify-center items-center w-[3em]'>{item.quantity}</h1>
                                    <button className='py-0.5 px-1.5 rounded-full bg-black text-white text-sm' onClick={() => { handleAddInCart(item.productId, "increase", item.quantity) }}>+</button>
                                </div>
                                <h1>&#x20B9;{handleCost(item.quantity, item.price)}</h1>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className='flex justify-between py-5 gap-5'>
                <button className='rounded-xl bg-orange-400 py-2 px-3 text-md' onClick={toggleShoppingCart}>Continue Browsing</button>
                <Link to="/checkout"><button className='px-3 py-2 text-md rounded-xl bg-orange-400'>Checkout Items</button></Link>
            </div>
        </div>
    );
}

export default Cart;
