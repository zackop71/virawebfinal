'use client';

import { ProductCard } from '@/components/product-card';
import { products } from '@/lib/products';
import Link from 'next/link';

export default function Home() {
  // Get featured products (mix of categories)
  const featured = [
    products[0],  // clip-gold-001
    products[6],  // hairband-blush-001
    products[12], // headband-cotton-white-001
    products[18], // scrunchie-silk-blush-001
    products[2],  // clip-rose-001
    products[8],  // hairband-gold-001
  ];

  return (
    <main className="min-h-screen bg-background">
      
      {/* Hero Section */}
      <section className="bg-secondary py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center gap-6 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary text-balance">
              Premium Hair Accessories
            </h1>
            <p className="text-lg md:text-xl text-foreground max-w-2xl text-balance">
              Discover our curated collection of elegant clips, hairbands, headbands, and scrunchies designed for every occasion.
            </p>
            <Link
              href="/products"
              className="mt-4 inline-block px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
            >
              Shop Collection
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">Featured Collection</h2>
            <p className="text-muted-foreground">Explore our best sellers and new arrivals</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Category Highlights */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">Shop by Category</h2>
            <p className="text-muted-foreground">Find exactly what you&apos;re looking for</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Clips', slug: 'clips', count: 6 },
              { name: 'Hairbands', slug: 'hairbands', count: 6 },
              { name: 'Headbands', slug: 'headbands', count: 5 },
              { name: 'Scrunchies', slug: 'scrunchies', count: 6 },
            ].map((category) => (
              <Link
                key={category.slug}
                href={`/products/${category.slug}`}
                className="group p-6 rounded-lg bg-background border border-border hover:border-accent transition-colors"
              >
                <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors mb-2">
                  {category.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">{category.count} items</p>
                <span className="text-accent font-semibold text-sm">Browse Collection →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">About</h4>
              <ul className="space-y-2 text-sm opacity-90">
                <li><Link href="#" className="hover:opacity-100">About Us</Link></li>
                <li><Link href="#" className="hover:opacity-100">Our Story</Link></li>
                <li><Link href="#" className="hover:opacity-100">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-sm opacity-90">
                <li><Link href="#" className="hover:opacity-100">Contact</Link></li>
                <li><Link href="#" className="hover:opacity-100">FAQ</Link></li>
                <li><Link href="#" className="hover:opacity-100">Shipping</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm opacity-90">
                <li><Link href="#" className="hover:opacity-100">Privacy</Link></li>
                <li><Link href="#" className="hover:opacity-100">Terms</Link></li>
                <li><Link href="#" className="hover:opacity-100">Returns</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Connect</h4>
              <ul className="space-y-2 text-sm opacity-90">
                <li><Link href="#" className="hover:opacity-100">Instagram</Link></li>
                <li><Link href="#" className="hover:opacity-100">Facebook</Link></li>
                <li><Link href="#" className="hover:opacity-100">TikTok</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 pt-8 text-sm text-center opacity-75">
            <p>&copy; 2024 Vira. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
