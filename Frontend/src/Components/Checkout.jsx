import React, { useState } from 'react';
import { useCart } from '../CartContext';
import { useAuth } from '../authContext';
import axios from 'axios';
import AddressForm from '../AddressForm'; // Import your AddressForm component
import { FaRegTrashCan } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

function Checkout() {
    const { setItemsRemoved, cartItems, setItemsAdded, quantity, setQuantity, calculateTotalCost } = useCart();
    const { userID } = useAuth();
    const navigate = useNavigate();
    const [validPay, setValidPay] = useState(false);
    const totalAmount = calculateTotalCost();
    const [toastVisible, setToastVisible] = useState(false); // State for toast visibility
    const [toastMessage, setToastMessage] = useState(''); // State for toast message

    const handlePayment = async () => {
        const orderUrl = 'http://localhost:8080/orders';
        const receiptId = `receipt_${userID}_${new Date().getTime()}`; // Dynamically generated receipt ID

        try {
            const { data } = await axios.post(orderUrl, {
                amount: totalAmount,
                currency: 'INR',
                receipt: receiptId
            });

            const options = {
                key: 'rzp_test_YI17fskUl7GuoV',
                amount: data.amount,
                currency: data.currency,
                name: 'Minimalistic Ecommerce',
                description: 'Test Transaction',
                image: 'https://example.com/your_logo',
                order_id: data.id,
                handler: function (response) {
                    setToastMessage(`Payment successfull!!`);
                    setToastVisible(true);

                    setTimeout(() => {
                        setToastVisible(false);
                    }, 2000);

                    navigate('/OrderDetails');

                },
                prefill: {
                    name: 'Madhav Maheshwari',
                    email: 'maheshwarimadhav166@gmail.com',
                    contact: '9548541855'
                },
                notes: {
                    address: 'Razorpay Corporate Office'
                },
                theme: {
                    color: '#FB923C'
                }
            };

            const rzp1 = new window.Razorpay(options);
            rzp1.on('payment.failed', function (response) {
                setToastMessage(`Payment failed! Error: ${response.error.description}`);
                setToastVisible(true);

                setTimeout(() => {
                    setToastVisible(false);
                }, 2000);
            });

            rzp1.open();
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };

    const handleAddInCart = async (productId, action, Quantity) => {
        let newQuantity = Quantity;

        if (action === 'increase') {
            newQuantity += 1;
        } else {
            newQuantity = Quantity >= 2 ? Quantity - 1 : Quantity;
        }

        try {
            const response = await axios.post('http://localhost:8080/quantityChange', {
                newQuantity,
                productId,
                userID
            });

            if (response.status === 200 && action === 'increase') {
                setItemsAdded(true);
            } else if (response.status === 200 && action === 'decrease') {
                setItemsRemoved(true);
            }
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    const handleCartItemRemoval = async (id) => {
        try {
            const removal = await axios.post('http://localhost:8080/cart/remove', {
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
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

    const handleCost = (quantity, price) => {
        return quantity * price;
    };

    return (
        <div className='relative h-screen w-full bg-orange-200 flex'>
            <div className={`absolute left-1/2 transform -translate-x-1/2 z-50 py-2 px-5 transition-all duration-1000 ${toastVisible ? 'top-32 opacity-100' : '-top-12 opacity-0'} bg-orange-300 rounded-md`}>
                {toastMessage}
            </div>
            <div className="w-2/3 bg-white my-5 mx-5 flex flex-col py-3 px-3">
                <h1 className='font-bold text-3xl'>Checkout Items</h1>
                <AddressForm validPay={validPay} setValidPay={setValidPay} />
                <button disabled={!validPay} className={`text-black rounded-md py-1 px-2 ${validPay ? 'bg-orange-200' : 'bg-gray-300'} ${validPay ? 'hover:bg-orange-400' : ''}`} onClick={handlePayment}>Pay Now</button>
            </div>
            <div className="w-1/3 bg-white mx-5 my-5 text-black px-5 flex flex-col xl:max-w-[1265px] lg:max-w-[1035px] md:max-w-[830px]">
                <div className="py-5">
                    <h1 className='font-bold text-xl'>Subtotal: &#x20B9;{calculateTotalCost()}</h1>
                </div>
                <div className='flex-col flex gap-5 overflow-y-scroll'>
                    {cartItems.map(item => (
                        <div id={item.key} className='flex gap-10' key={item.key}>
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
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Checkout;
