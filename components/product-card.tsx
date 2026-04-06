'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/app/context/cart-context';
import type { Product } from '@/lib/products';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="group flex flex-col gap-3">
      {/* Image Container */}
      <Link href={`/products/${product.id}`} className="relative overflow-hidden rounded-lg bg-secondary">
        <div className="aspect-square w-full relative">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
      </Link>

      {/* Product Info */}
      <div className="flex flex-col gap-2">
        <Link href={`/products/${product.id}`} className="hover:text-accent transition-colors">
          <h3 className="font-semibold text-sm line-clamp-2">{product.name}</h3>
        </Link>
        <p className="text-xs text-muted-foreground">{product.color}</p>
        
        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between gap-2 pt-2">
          <span className="text-lg font-bold text-accent">${product.price.toFixed(2)}</span>
          <button
            onClick={handleAddToCart}
            className={`p-2 rounded-lg transition-colors ${
              isAdded
                ? 'bg-accent text-accent-foreground'
                : 'bg-secondary hover:bg-primary hover:text-primary-foreground'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
