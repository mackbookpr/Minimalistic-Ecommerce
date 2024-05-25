const mongoose = require('mongoose');
const Product = require('../Model/Product');

// const updateProducts = [
//     {id:1,description:"Our ShadowTech PC is designed to fit perfectly in any space, whether it's placed against a wall or tucked away in a corner. With its sleek design and powerful performance, it's the perfect choice for anyone looking for a stylish and efficient computer."},
//     {id:2,description:"Our Arctic Chill will be a sleek and vibrant addition to your kitchen. Its modern design enhances any space while its advanced cooling technology keeps food fresh. With adjustable shelves for flexible storage, it's tailored to your needs."},
//     {id:3,description:"SunnyWatch Security: The pinnacle of modern security innovation. Their sleek design seamlessly integrates into any environment. Offering advanced surveillance capabilities, they ensure unparalleled protection."},
//     {id:4,description:"Introducing our PurePulse Defibrillator: A life-saving device for emergency situations. With its compact design and advanced technology, it's a crucial asset in any medical setting. Ensure quick access to essential medical care with WhiteDefibrillator."},
//     {id:5,description:"Midnight Miracle: Our exclusive black skincare solution harnesses the power of nature's darkest tones to reveal a luminous complexion. Formulated with activated charcoal and enriching botanicals, it purifies pores, evens skin tone, and imparts a radiant glow."},
//     {id:6,description:"Introducing Blue Aura: Elevate your skincare routine with our revolutionary blue skincare line, infused with the soothing essence of the ocean. Experience luminous, healthier-looking skin like never before."},
//     {id:7,description:"Introducing Sunset Glow by OrangeSkinCare: Unveil the radiant warmth of sunset hues in every drop. Embrace the natural beauty of golden-hour glow, crafted to illuminate and rejuvenate your skin. Experience a harmonious blend of luxury and nature, basking in the luminosity of Sunset Glow."},
//     {id:8,description:"Introducing Crisp Glow: Experience the invigorating freshness of dew-kissed mornings in every application. Revitalize your skin with our crisp, rejuvenating formulations, crafted to unveil a radiant and youthful glow. Embrace the vitality of nature and discover a new level of luminosity with Crisp Glow."},
//     {id:9,description:"OceanicFeastTable: A masterpiece of elegance, echoing the tranquil blues of the sea. Its sleek design invites gatherings, transforming meals into seaside feasts and memories into treasures."},
//     {id:10,description:"Introducing the Shadow Heaven Desk: Where sophistication meets functionality, elevating your workspace to new heights. Embrace the sleek elegance of minimalist design, crafted to inspire productivity and creativity. Transform your office into a sanctuary of style with the Shadow Heaven Desk."},
//     {id:11,description:"SnowBed: A sanctuary of serenity, its pristine white whispers of peaceful slumber. Enveloped in its pure embrace, dreams dance in the ethereal glow, inviting restful nights and tranquil mornings."},
//     {id:12,description:"Introducing Tangerine Dream Chest: Awaken your senses with the vibrant allure of citrus-infused elegance. Seamlessly blend style and storage with our exquisitely crafted chest, designed to evoke dreams of sun-kissed orchards. Elevate your living space with the Tangerine Dream Chest—a captivating fusion of beauty and functionality."},
//     {id:13,description:"Introducing the Azure Toaster: Elevate your morning routine with a touch of elegance. Immerse yourself in the serene beauty of azure skies while enjoying perfectly toasted bread. Experience the perfect harmony of style and functionality with the Azure Toaster—where every breakfast becomes a moment of bliss."},
//     {id:14,description:"Introducing Midnight Baking Paper: Elevate your baking with our premium, heat-resistant paper, designed for flawless creations under the stars. Embrace the magic of midnight baking with confidence and elegance. Illuminate your kitchen with Midnight Baking Paper, where every creation shines."},
//     {id:15,description:"Introducing Snow Coffee Maker: Experience the tranquility of winter mornings in every cup, with a sleek and efficient design. Elevate your coffee ritual with the crisp purity of freshly fallen snow. Embrace the perfect blend of style and functionality."},
//     {id:16,description:"Introducing Tangerine Tongs: Infuse your kitchen with citrus flair, effortlessly blending style and utility. Elevate your cooking experience with vibrant functionality. Embrace the zest of Tangerine Tongs in every culinary creation."}
// ]

const updateProducts = [
  { id: 1, weight: "3.5 Kgs", texture: "Plastic", size: "19inch x 21inch" },
  { id: 2, weight: "90 Kgs", texture: "Matte", size: "34inch x 60inch" },
  { id: 3, weight: "1 kgs", texture: "Matte", size: "4inch x 6inch" },
  { id: 4, weight: "3 kgs", texture: "Matte", size: "6inch x 8inch" },
  { id: 5, weight: "0.1 kgs", texture: "Silky Smooth", size: "2inch x 3inch" },
  { id: 6, weight: "0.05 kgs", texture: "Silky Smooth", size: "2inch x 3inch" },
  { id: 7, weight: "0.05 kgs", texture: "Silky Smooth", size: "2inch x 3inch" },
  { id: 8, weight: "0.05 kgs", texture: "Silky Smooth", size: "2inch x 3inch" },
  { id: 9, weight: "10 kgs", texture: "Plastic", size: "39inch x 31inch" },
  { id: 10, weight: "10 kgs", texture: "Plastic", size: "19inch x 21inch" },
  { id: 11, weight: "20 kgs", texture: "Crisp Cotton", size: "49inch x 32inch" },
  { id: 12, weight: "12 kgs", texture: "Plastic", size: "19inch x 21inch" },
  { id: 13, weight: "1.5 kgs", texture: "Matte", size: "5inch x 6inch" },
  { id: 14, weight: "0.1 kgs", texture: "Plastic", size: "5inch x 6inch" },
  { id: 15, weight: "3.5 kgs", texture: "Matte", size: "5inch x 6inch" },
  { id: 16, weight: "0.3 kgs", texture: "Plastic", size: "5inch x 4inch" },
]

async function productDescriptions() {
  for (const product of updateProducts) {
    try {
      const result = await Product.updateOne(
        { id: product.id },
        { $set: { description: product.description, weight: product.weight, texture: product.texture, size: product.size } }
      );
      console.log(`Updated product ${product._id}:`, result);
    } catch (error) {
      console.error(`Error updating product ${product._id}:`, error);
    }
  }

}
module.exports = productDescriptions;