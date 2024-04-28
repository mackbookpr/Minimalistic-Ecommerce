import React from 'react';
import { Link } from 'react-router-dom';
import productsData from "../Data/data.json"

function Trending() {

    function importAll(r) {
        let images = {};
        r.keys().map((item, index) => { return images[item.replace('./', '')] = r(item); });
        return images;
    }

    function getProductIdFromImageName(category, imageName) {
        const imageNameWithoutExtension = imageName.split('.')[0];
        const product = productsData.find(product => product.category === category && product.imgName === imageNameWithoutExtension);
        return product ? product.id : null;
    }
    function getProductNameFromImageName(category, imageName) {
        const imageNameWithoutExtension = imageName.split('.')[0];
        const product = productsData.find(product => product.category === category && product.imgName === imageNameWithoutExtension);
        return product ? product.name : null;
    }
    function getProductPriceFromImageName(category, imageName) {
        const imageNameWithoutExtension = imageName.split('.')[0];
        const product = productsData.find(product => product.category === category && product.imgName === imageNameWithoutExtension);
        return product ? product.price : null;
    }

    const imagesElectronics = importAll(require.context('../Assets/Electronics', true, /\.(png|jpe?g|svg)$/));
    const imagesSkinCare = importAll(require.context('../Assets/SkinCare', true, /\.(png|jpe?g|svg)$/));
    const imagesFurniture = importAll(require.context('../Assets/Furniture', true, /\.(png|jpe?g|svg)$/));
    const imagesKitchen = importAll(require.context('../Assets/Kitchen', true, /\.(png|jpe?g|svg)$/));


    return (
        <div>
            <h1 className='text-xl mt-14 mb-10 font-semibold'>Trending Now</h1>
            <div className="grid lg:grid-cols-4 xl:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-2 mt-5">
                {Object.keys(imagesElectronics).map((imageName, index) => (
                    <Link key={index} to={`/Electronics/${getProductIdFromImageName('Electronics', imageName)}`}>
                        <div className="cursor-pointer relative border-gray-500 hover:border-black transition-all duration-400 border-2 sm:h-[280px] h-[380px]">
                            <img src={imagesElectronics[imageName]} alt={imageName} className='object-cover w-[565px] h-[320px] sm:h-[220px] sm-[345px]' />
                            <div className="w-full h-[20px] mt-2 ml-2">{getProductNameFromImageName('Electronics', imageName)}</div>
                            <div className="w-full h-[20px] ml-2">&#x20B9;{getProductPriceFromImageName('Electronics', imageName)}</div>
                        </div>
                    </Link>
                ))}
                {Object.keys(imagesSkinCare).map((imageName, index) => (
                    <Link key={index} to={`/SkinCare/${getProductIdFromImageName('Skincare', imageName)}`}>
                        <div className="relative cursor-pointer border-2 border-gray-500 hover:border-black sm:h-[280px] h-[380px] transition-all duration-400">
                            <img key={index} src={imagesSkinCare[imageName]} alt={imageName} className='object-cover w-[565px] h-[320px] sm:h-[220px] sm-[345px]' />
                            <div className="w-full h-[20px] mt-2 ml-2">{getProductNameFromImageName('Skincare', imageName)}</div>
                            <div className="w-full h-[20px] ml-2">&#x20B9;{getProductPriceFromImageName('Skincare', imageName)}</div>
                        </div>
                    </Link>

                ))}
                {Object.keys(imagesFurniture).map((imageName, index) => (
                    <div className="relative cursor-pointer border-2 border-gray-500 hover:border-black transition-all duration-400 sm:h-[280px] h-[380px]">
                        <img key={index} src={imagesFurniture[imageName]} alt={imageName} className='object-cover w-[565px] h-[320px] sm:h-[220px] sm-[345px]' />
                        <div className="absolute bottom-0 w-full h-[50px]">Price</div>
                    </div>
                ))}
                {Object.keys(imagesKitchen).map((imageName, index) => (
                    <div className="relative cursor-pointer border-2 border-gray-500 hover:border-black transition-all duration-400 sm:h-[280px] h-[380px]">
                        <img key={index} src={imagesKitchen[imageName]} alt={imageName} className='object-cover w-[565px] h-[320px] sm:h-[220px] sm:w-[345px]' />
                        <div className="absolute bottom-0 w-full h-[50px]">Price</div>
                    </div>
                ))}
            </div></div >
    )
}

export default Trending