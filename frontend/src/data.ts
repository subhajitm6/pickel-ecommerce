import mangoPickleImg from './assets/images/mango_pickel_1.png';
import garlicPickleImg from './assets/images/garlic_pickel_1.png';
import classicLemonImg from './assets/images/classic_lemon_pickle.png';
import mixedVeggieImg from './assets/images/mixed_veggie_pickle.png';

import catMangoImg from './assets/images/category_mango.png';
import galMangoImg from './assets/images/gallery_1.png';
import catGarlicImg from './assets/images/category_garlic.png';
import galSpiceImg from './assets/images/gallery_3.png';
import catLemonImg from './assets/images/category_lemon.png';
import galJarImg from './assets/images/gallery_4.png';
import catMixedImg from './assets/images/category_mixed.png';
import galJarsImg from './assets/images/gallery_5.png';

export interface Product {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  inStock: boolean;
  deliveryDays: string;
  image: string;
  thumbnails: string[];
  features: string[];
  ingredients: string[];
  nutrition: { label: string; value: string }[];
  tag?: string;
  color: string;
}

export const products: Product[] = [
  {
    id: "1",
    slug: "signature-mango-pickle",
    name: "Signature Mango Pickle",
    shortDescription: "A perfect blend of raw mangoes and aromatic spices sun-dried to perfection.",
    description: "Our signature mango pickle is crafted using a generations-old recipe. We handpick the finest raw mangoes, slice them with care, and marinate them in a blend of sun-dried spices and premium mustard oil. The result is a tangy, spicy, and irresistible condiment that pairs perfectly with any meal.",
    price: 299,
    originalPrice: 349,
    rating: 4.9,
    reviews: 1284,
    inStock: true,
    deliveryDays: "2-3 Days",
    image: mangoPickleImg,
    thumbnails: [catMangoImg, galMangoImg],
    features: ["100% Organic Mangoes", "Sun-dried Spices", "No Preservatives", "Handmade in Small Batches"],
    ingredients: ["Raw Mango", "Mustard Oil", "Salt", "Red Chili Powder", "Fenugreek", "Fennel Seeds", "Turmeric"],
    nutrition: [
      { label: "Calories", value: "45 kcal" },
      { label: "Total Fat", value: "3.5g" },
      { label: "Sodium", value: "450mg" },
      { label: "Carbohydrates", value: "2g" },
    ],
    tag: "Trending",
    color: "from-mango to-pickle"
  },
  {
    id: "2",
    slug: "garlic-crunch",
    name: "Garlic Crunch",
    shortDescription: "Roasted garlic cloves soaked in fiery spices.",
    description: "For the garlic lovers, this pickle offers a bold, pungent flavor balanced with a sharp chili kick. The garlic is slow-roasted before being preserved, giving it a unique crunchy texture and deep savory profile.",
    price: 349,
    rating: 4.8,
    reviews: 856,
    inStock: true,
    deliveryDays: "2-3 Days",
    image: garlicPickleImg,
    thumbnails: [catGarlicImg, galSpiceImg],
    features: ["Locally Sourced Garlic", "Extra Spicy", "Aged for 6 Months"],
    ingredients: ["Garlic", "Mustard Oil", "Salt", "Red Chili Powder", "Cumin", "Vinegar"],
    nutrition: [
      { label: "Calories", value: "50 kcal" },
      { label: "Total Fat", value: "4g" },
      { label: "Sodium", value: "380mg" },
      { label: "Carbohydrates", value: "3g" },
    ],
    tag: "New Arrival",
    color: "from-cream to-brown"
  },
  {
    id: "3",
    slug: "classic-lemon",
    name: "Classic Lemon",
    shortDescription: "Tangy and sweet lemon quarters aged to perfection.",
    description: "Sweet, sour, and mildly spicy. Our classic lemon pickle uses thin-skinned lemons that melt in your mouth. It's aged for months to ensure the rind becomes perfectly soft and absorbs all the flavorful juices.",
    price: 249,
    originalPrice: 299,
    rating: 4.7,
    reviews: 2105,
    inStock: true,
    deliveryDays: "2-3 Days",
    image: classicLemonImg,
    thumbnails: [catLemonImg, galJarImg],
    features: ["Thin-skinned Lemons", "Sweet & Sour Profile", "Zero Oil"],
    ingredients: ["Lemon", "Sugar", "Salt", "Red Chili Powder", "Roasted Cumin", "Black Salt"],
    nutrition: [
      { label: "Calories", value: "35 kcal" },
      { label: "Total Fat", value: "0g" },
      { label: "Sodium", value: "300mg" },
      { label: "Carbohydrates", value: "8g" },
    ],
    tag: "Bestseller",
    color: "from-lime to-fresh"
  },
  {
    id: "4",
    slug: "mixed-veggie",
    name: "Mixed Veggie",
    shortDescription: "A crunchy medley of carrots, cauliflower, and green chilies.",
    description: "Can't decide? Have them all. This mixed pickle is an explosion of textures and flavors. Crisp carrots, tender cauliflower, and spicy green chilies make this the perfect accompaniment to winter parathas.",
    price: 399,
    rating: 4.9,
    reviews: 542,
    inStock: true,
    deliveryDays: "2-3 Days",
    image: mixedVeggieImg,
    thumbnails: [catMixedImg, galJarsImg],
    features: ["Seasonal Vegetables", "Medium Spice", "Crunchy Texture"],
    ingredients: ["Carrot", "Cauliflower", "Green Chili", "Mustard Oil", "Salt", "Spices"],
    nutrition: [
      { label: "Calories", value: "40 kcal" },
      { label: "Total Fat", value: "3g" },
      { label: "Sodium", value: "400mg" },
      { label: "Carbohydrates", value: "3g" },
    ],
    tag: "Limited Edition",
    color: "from-chili to-pickle"
  }
];

export const getProductBySlug = (slug: string) => {
  return products.find(p => p.slug === slug);
};
