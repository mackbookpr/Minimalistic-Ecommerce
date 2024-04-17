import React from 'react'
import { useParams } from 'react-router-dom';
import Product1 from '../SkinCare/Product1';
import Product2 from '../SkinCare/Product2';
import Product3 from '../SkinCare/Product3';
import Product4 from '../SkinCare/Product4';

function DefaultProductPageSkinCare() {
    const { productID } = useParams();
    let product;

    switch (productID) {
        case '5':
            product = <Product1 />;
            break;
        case '6':
            product = <Product2 />;
            break;
        case '7':
            product = <Product3 />;
            break;
        case '8':
            product = <Product4 />;
            break;
        default:
            product = <Product1 />;
    }
    return (
        <div className='max-w-[1220px] flex h-[500px] m-auto gap-10 my-10'>{product}</div>
    )
}

export default DefaultProductPageSkinCare