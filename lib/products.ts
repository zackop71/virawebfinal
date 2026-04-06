export interface Product {
  id: string;
  name: string;
  category: 'clips' | 'hairbands' | 'headbands' | 'scrunchies';
  price: number;
  image: string;
  description: string;
  color: string;
}

// Product data with generated images
export const products: Product[] = [
  // Clips
  {
    id: 'clip-gold-001',
    name: 'Gold Minimalist Clip',
    category: 'clips',
    price: 12.99,
    image: '/products/clip-gold.jpg',
    description: 'Elegant gold-plated hair clip with minimalist design',
    color: 'Gold',
  },
  {
    id: 'clip-silver-001',
    name: 'Silver Geometric Clip',
    category: 'clips',
    price: 14.99,
    image: '/products/clip-silver.jpg',
    description: 'Sleek silver clip with modern geometric pattern',
    color: 'Silver',
  },
  {
    id: 'clip-rose-001',
    name: 'Rose Gold Pearl Clip',
    category: 'clips',
    price: 15.99,
    image: '/products/clip-rose.jpg',
    description: 'Rose gold clip adorned with pearl accents',
    color: 'Rose Gold',
  },
  {
    id: 'clip-tortoise-001',
    name: 'Tortoiseshell Clip',
    category: 'clips',
    price: 13.99,
    image: '/products/clip-tortoise.jpg',
    description: 'Classic tortoiseshell patterned hair clip',
    color: 'Tortoiseshell',
  },
  {
    id: 'clip-black-001',
    name: 'Black Metal Clip',
    category: 'clips',
    price: 11.99,
    image: '/products/clip-black.jpg',
    description: 'Matte black sleek and modern hair clip',
    color: 'Black',
  },
  {
    id: 'clip-champagne-001',
    name: 'Champagne Luxury Clip',
    category: 'clips',
    price: 16.99,
    image: '/products/clip-champagne.jpg',
    description: 'Luxurious champagne-toned statement clip',
    color: 'Champagne',
  },

  // Hairbands
  {
    id: 'hairband-blush-001',
    name: 'Blush Velvet Hairband',
    category: 'hairbands',
    price: 18.99,
    image: '/products/hairband-blush.jpg',
    description: 'Soft blush velvet hairband for comfort and style',
    color: 'Blush',
  },
  {
    id: 'hairband-emerald-001',
    name: 'Emerald Pearl Hairband',
    category: 'hairbands',
    price: 19.99,
    image: '/products/hairband-emerald.jpg',
    description: 'Rich emerald hairband with pearl detailing',
    color: 'Emerald',
  },
  {
    id: 'hairband-gold-001',
    name: 'Gold Twisted Hairband',
    category: 'hairbands',
    price: 17.99,
    image: '/products/hairband-gold.jpg',
    description: 'Gold plated twisted design hairband',
    color: 'Gold',
  },
  {
    id: 'hairband-navy-001',
    name: 'Navy Satin Hairband',
    category: 'hairbands',
    price: 16.99,
    image: '/products/hairband-navy.jpg',
    description: 'Elegant navy satin hairband',
    color: 'Navy',
  },
  {
    id: 'hairband-cream-001',
    name: 'Cream Lace Hairband',
    category: 'hairbands',
    price: 18.99,
    image: '/products/hairband-cream.jpg',
    description: 'Delicate cream lace hairband for special occasions',
    color: 'Cream',
  },
  {
    id: 'hairband-bronze-001',
    name: 'Bronze Metal Hairband',
    category: 'hairbands',
    price: 20.99,
    image: '/products/hairband-bronze.jpg',
    description: 'Statement bronze metal hairband',
    color: 'Bronze',
  },

  // Headbands
  {
    id: 'headband-cotton-white-001',
    name: 'White Cotton Sport Headband',
    category: 'headbands',
    price: 9.99,
    image: '/products/headband-cotton-white.jpg',
    description: 'Comfortable cotton headband for workouts and daily wear',
    color: 'White',
  },
  {
    id: 'headband-cotton-black-001',
    name: 'Black Cotton Sport Headband',
    category: 'headbands',
    price: 9.99,
    image: '/products/headband-cotton-black.jpg',
    description: 'Breathable black cotton sport headband',
    color: 'Black',
  },
  {
    id: 'headband-knit-beige-001',
    name: 'Beige Knit Headband',
    category: 'headbands',
    price: 12.99,
    image: '/products/headband-knit-beige.jpg',
    description: 'Cozy knit headband in soft beige',
    color: 'Beige',
  },
  {
    id: 'headband-knit-gray-001',
    name: 'Gray Knit Headband',
    category: 'headbands',
    price: 12.99,
    image: '/products/headband-knit-gray.jpg',
    description: 'Warm gray knit headband for chilly weather',
    color: 'Gray',
  },
  {
    id: 'headband-denim-001',
    name: 'Denim Headband',
    category: 'headbands',
    price: 11.99,
    image: '/products/headband-denim.jpg',
    description: 'Trendy denim headband with vintage vibes',
    color: 'Denim',
  },

  // Scrunchies
  {
    id: 'scrunchie-silk-blush-001',
    name: 'Silk Scrunchie - Blush',
    category: 'scrunchies',
    price: 8.99,
    image: '/products/scrunchie-silk-blush.jpg',
    description: 'Gentle silk scrunchie to protect hair',
    color: 'Blush',
  },
  {
    id: 'scrunchie-silk-navy-001',
    name: 'Silk Scrunchie - Navy',
    category: 'scrunchies',
    price: 8.99,
    image: '/products/scrunchie-silk-navy.jpg',
    description: 'Premium silk scrunchie in navy',
    color: 'Navy',
  },
  {
    id: 'scrunchie-silk-emerald-001',
    name: 'Silk Scrunchie - Emerald',
    category: 'scrunchies',
    price: 8.99,
    image: '/products/scrunchie-silk-emerald.jpg',
    description: 'Luxurious silk scrunchie in emerald green',
    color: 'Emerald',
  },
  {
    id: 'scrunchie-velvet-gold-001',
    name: 'Velvet Scrunchie - Gold',
    category: 'scrunchies',
    price: 9.99,
    image: '/products/scrunchie-velvet-gold.jpg',
    description: 'Plush velvet scrunchie in gold tone',
    color: 'Gold',
  },
  {
    id: 'scrunchie-velvet-black-001',
    name: 'Velvet Scrunchie - Black',
    category: 'scrunchies',
    price: 9.99,
    image: '/products/scrunchie-velvet-black.jpg',
    description: 'Elegant black velvet scrunchie',
    color: 'Black',
  },
  {
    id: 'scrunchie-glitter-rose-001',
    name: 'Glitter Scrunchie - Rose Gold',
    category: 'scrunchies',
    price: 10.99,
    image: '/products/scrunchie-glitter-rose.jpg',
    description: 'Sparkly rose gold glitter scrunchie for party looks',
    color: 'Rose Gold',
  },
];

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
