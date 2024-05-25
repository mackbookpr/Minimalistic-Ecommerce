import React from 'react';
import { useParams } from 'react-router-dom';
import Product1 from './Product1';
import Product2 from './Product2';
import Product3 from './Product3';
import Product4 from './Product4';
import { useMediaQuery } from 'react-responsive';

function DefaultProductPage() {
    const { productID } = useParams();
    let Product;

    switch (productID) {
        case "9":
            Product = <Product1 />;
            break;
        case "10":
            Product = <Product3 />;
            break;
        case "11":
            Product = <Product2 />;
            break;
        case "12":
            Product = <Product4 />;
            break;
        default:
            Product = <Product1 />;
    }

    return (
        <div className={`xl:max-w-[1245px] lg:max-w-[1025px] h-[500px] md:max-w-[750px] m-auto gap-10 flex-col px-10`}>
            {Product}
        </div>
    );
}

export default DefaultProductPage;
