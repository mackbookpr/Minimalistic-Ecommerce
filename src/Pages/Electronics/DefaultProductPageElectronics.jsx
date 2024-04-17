import React from 'react'
import { useParams } from 'react-router-dom';
import Product1 from './Product1';
import Product2 from './Product2';
import Product3 from './Product3';
import Product4 from './Product4';

function DefaultProductPage() {
    const { productID } = useParams();
    let Product;

    switch (productID) {
        case "1":
            Product = <Product1 />
            break;
        case "2":
            Product = <Product2 />
            break;
        case "3":
            Product = <Product3 />
            break;
        case "4":
            Product = <Product4 />
            break;
        default:
            Product = <Product1 />
    }

    return (
        <div className='max-w-[1220px] flex h-[500px] m-auto gap-10 my-10'>{Product}</div>
    )
}

export default DefaultProductPage