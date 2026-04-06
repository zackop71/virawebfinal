'use client';

import Link from 'next/link';
import { useCart } from '@/app/context/cart-context';
import { ShoppingCart, Search, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const { items } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const categories = [
    { name: 'All Products', href: '/products' },
    { name: 'Clips', href: '/products/clips' },
    { name: 'Hairbands', href: '/products/hairbands' },
    { name: 'Headbands', href: '/products/headbands' },
    { name: 'Scrunchies', href: '/products/scrunchies' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">V</span>
            </div>
            <span className="text-2xl font-bold text-primary hidden sm:inline">VIRA</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/products" className="text-foreground hover:text-accent transition-colors">
              All Products
            </Link>
            <Link href="/products/clips" className="text-foreground hover:text-accent transition-colors">
              Clips
            </Link>
            <Link href="/products/hairbands" className="text-foreground hover:text-accent transition-colors">
              Hairbands
            </Link>
            <Link href="/products/headbands" className="text-foreground hover:text-accent transition-colors">
              Headbands
            </Link>
            <Link href="/products/scrunchies" className="text-foreground hover:text-accent transition-colors">
              Scrunchies
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
              <Search className="w-5 h-5 text-foreground" />
            </button>
            <Link 
              href="/cart" 
              className="relative p-2 hover:bg-secondary rounded-lg transition-colors"
            >
              <ShoppingCart className="w-5 h-5 text-foreground" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-accent text-accent-foreground text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-foreground" />
              ) : (
                <Menu className="w-5 h-5 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pt-4 border-t border-border space-y-3">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="block text-foreground hover:text-accent transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {category.name}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
