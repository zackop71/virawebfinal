'use client';

import Image from 'next/image';
import { ProductCard } from '@/components/product-card';
import { getProductById, products } from '@/lib/products';
import { useCart } from '@/app/context/cart-context';
import Link from 'next/link';
import { useState } from 'react';
import { ShoppingCart, ChevronLeft } from 'lucide-react';
import { useParams } from 'next/navigation';

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const product = getProductById(id);

  if (!product) {
    return (
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">Product not found</h1>
          <Link href="/products" className="text-accent hover:underline">
            Return to products
          </Link>
        </div>
      </main>
    );
  }

  // Get related products from same category
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <main className="min-h-screen bg-background">
      {/* Product Detail */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <Link href="/products" className="inline-flex items-center gap-2 text-accent hover:underline mb-8">
            <ChevronLeft className="w-4 h-4" />
            Back to products
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Product Image */}
            <div>
              <div className="aspect-square w-full relative rounded-lg overflow-hidden bg-secondary">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-4xl font-bold text-primary mb-4">{product.name}</h1>
              
              <div className="space-y-6">
                {/* Category */}
                <div>
                  <p className="text-sm text-muted-foreground uppercase tracking-wide">Category</p>
                  <p className="text-lg capitalize">{product.category}</p>
                </div>

                {/* Color */}
                <div>
                  <p className="text-sm text-muted-foreground uppercase tracking-wide">Color</p>
                  <p className="text-lg">{product.color}</p>
                </div>

                {/* Description */}
                <div>
                  <p className="text-sm text-muted-foreground uppercase tracking-wide mb-2">Description</p>
                  <p className="text-base text-foreground">{product.description}</p>
                </div>

                {/* Price and Add to Cart */}
                <div className="border-t border-border pt-6">
                  <div className="text-4xl font-bold text-accent mb-6">${product.price.toFixed(2)}</div>
                  <AddToCartButton product={product} />
                </div>

                {/* Features */}
                <div className="border-t border-border pt-6">
                  <p className="text-sm text-muted-foreground uppercase tracking-wide mb-4">Features</p>
                  <ul className="space-y-2 text-sm text-foreground">
                    <li>✓ Premium quality materials</li>
                    <li>✓ Gentle on hair</li>
                    <li>✓ Durable design</li>
                    <li>✓ Perfect for gift giving</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-12 bg-secondary">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-primary mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

function AddToCartButton({ product }: { product: any }) {
  const { addItem } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
      });
    }
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">Quantity:</span>
        <div className="flex items-center border border-border rounded-lg">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-4 py-2 text-foreground hover:bg-secondary transition-colors"
          >
            −
          </button>
          <span className="px-6 py-2 text-foreground">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-4 py-2 text-foreground hover:bg-secondary transition-colors"
          >
            +
          </button>
        </div>
      </div>
      <button
        onClick={handleAddToCart}
        className={`w-full py-3 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors ${
          isAdded
            ? 'bg-accent text-accent-foreground'
            : 'bg-primary text-primary-foreground hover:bg-primary/90'
        }`}
      >
        <ShoppingCart className="w-5 h-5" />
        {isAdded ? 'Added to Cart!' : 'Add to Cart'}
      </button>
    </div>
  );
}
