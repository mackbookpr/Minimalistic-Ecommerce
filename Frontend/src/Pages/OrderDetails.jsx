import React from 'react';
import { useLocation } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import { useCart } from '../CartContext';

function OrderDetails() {
  const { cartItems ,calculateTotalCost} = useCart();
  const handleCost = (quantity, price) => {
    return quantity * price;
  };
  return (
    <div className="flex flex-col items-center py-10 px-5">
      <div className="flex flex-col items-center bg-orange-100 p-5 rounded-md shadow-lg">
        <h1 className="text-xl font-bold text-orange-600 mt-2">Order placed successfully!</h1>

        <svg className="tick mt-5" viewBox="0 0 24 24">
          <path d="M7 13l4 4 10-10" />
        </svg>

      </div>
      <h1 className='font-bold text-2xl mt-4'>Subtotal: &#x20B9;{calculateTotalCost()}</h1>
      <div className="w-full mt-10 flex flex-wrap gap-5">
        {
          cartItems.map(item => (
            <div id={item.key} className='flex gap-5' key={item.key}>
              <img src={item.imgUrl} className="h-[190px] w-[190px] object-cover" alt="" />
              <div className="flex flex-col items-start gap-2 text-sm">
                <div className="flex justify-between w-full">
                  <h1>{item.Name}</h1>
                </div>
                <div className='flex text-sm'>
                  <h1 className='text-md'>Quantity: {item.quantity}</h1>
                </div>
                <h1 className='flex justify-center items-center'>Price: &#x20B9;{item.price}</h1>
                <h1>Paid: &#x20B9;{handleCost(item.quantity, item.price)}</h1>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default OrderDetails;
