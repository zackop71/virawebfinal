'use client';

import { useCart } from '@/app/context/cart-context';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useState } from 'react';

export default function CartPage() {
  const { items, removeItem, updateQuantity, total } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const subtotal = total;
  const tax = subtotal * 0.08; // 8% tax
  const shipping = subtotal > 50 ? 0 : 10;
  const cartTotal = subtotal + tax + shipping;

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-primary mb-8">Shopping Cart</h1>
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground mb-6">Your cart is empty</p>
            <Link
              href="/products"
              className="inline-block px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-primary mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4 border border-border rounded-lg p-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 pb-4 border-b border-border last:border-b-0 last:pb-0"
                >
                  {/* Product Image */}
                  <Link href={`/products/${item.id}`} className="relative w-20 h-20 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </Link>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/products/${item.id}`}
                      className="font-semibold text-primary hover:text-accent transition-colors"
                    >
                      {item.name}
                    </Link>
                    <p className="text-sm text-muted-foreground">{item.category}</p>
                    <p className="text-accent font-semibold mt-2">${item.price.toFixed(2)}</p>
                  </div>

                  {/* Quantity and Price */}
                  <div className="flex flex-col items-end gap-4">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-destructive hover:bg-secondary rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="flex items-center border border-border rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1.5 text-foreground hover:bg-secondary transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 text-foreground text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1.5 text-foreground hover:bg-secondary transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="font-semibold text-primary">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/products"
              className="inline-block mt-6 px-6 py-2 text-accent hover:underline"
            >
              ← Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="border border-border rounded-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold text-primary mb-6">Order Summary</h2>

              <div className="space-y-4 pb-6 border-b border-border">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax (8%)</span>
                  <span className="text-foreground">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Shipping {shipping === 0 && <span className="text-accent text-xs">(Free)</span>}
                  </span>
                  <span className="text-foreground">${shipping.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between py-6 pb-6 border-b border-border">
                <span className="font-semibold text-foreground">Total</span>
                <span className="text-2xl font-bold text-accent">${cartTotal.toFixed(2)}</span>
              </div>

              {shipping > 0 && (
                <p className="text-xs text-muted-foreground mb-4">
                  Free shipping on orders over $50
                </p>
              )}

              <button
                onClick={() => setIsCheckingOut(true)}
                className="w-full py-3 px-6 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors mb-3"
              >
                Proceed to Checkout
              </button>

              <button
                className="w-full py-3 px-6 bg-secondary text-foreground font-semibold rounded-lg hover:bg-secondary/80 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>

        {/* Checkout Modal */}
        {isCheckingOut && <CheckoutModal onClose={() => setIsCheckingOut(false)} total={cartTotal} />}
      </div>
    </main>
  );
}

function CheckoutModal({ onClose, total }: { onClose: () => void; total: number }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  });
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvc: '',
  });

  const { clearCart } = useCart();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else {
      // Complete checkout
      clearCart();
      onClose();
      alert('Order placed successfully!');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="sticky top-0 bg-secondary border-b border-border px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-primary">Checkout</h2>
          <button
            onClick={onClose}
            className="text-foreground hover:text-accent transition-colors text-2xl"
          >
            ×
          </button>
        </div>

        {/* Modal Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-primary">Shipping Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="col-span-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="col-span-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  required
                />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                required
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                required
              />
              <div className="grid grid-cols-3 gap-4">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="col-span-2 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  required
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="col-span-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  required
                />
              </div>
              <input
                type="text"
                name="zip"
                placeholder="ZIP Code"
                value={formData.zip}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                required
              />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-primary">Payment Information</h3>
              <input
                type="text"
                name="number"
                placeholder="Card Number"
                value={cardData.number}
                onChange={handleCardChange}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="expiry"
                  placeholder="MM/YY"
                  value={cardData.expiry}
                  onChange={handleCardChange}
                  className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  required
                />
                <input
                  type="text"
                  name="cvc"
                  placeholder="CVC"
                  value={cardData.cvc}
                  onChange={handleCardChange}
                  className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  required
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 text-center">
              <div className="text-6xl mb-4">✓</div>
              <h3 className="text-2xl font-bold text-primary">Order Confirmed!</h3>
              <p className="text-muted-foreground">Thank you for your purchase.</p>
              <div className="bg-secondary p-4 rounded-lg mt-6">
                <p className="text-sm text-muted-foreground">Order Total</p>
                <p className="text-3xl font-bold text-accent">${total.toFixed(2)}</p>
              </div>
            </div>
          )}

          {/* Steps Indicator */}
          <div className="flex gap-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`flex-1 h-1 rounded-full transition-colors ${
                  s <= step ? 'bg-accent' : 'bg-border'
                }`}
              />
            ))}
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="flex-1 px-6 py-2 border border-border text-foreground rounded-lg hover:bg-secondary transition-colors"
              >
                Back
              </button>
            )}
            <button
              type="submit"
              className="flex-1 px-6 py-2 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
            >
              {step === 3 ? 'Done' : step === 1 ? 'Next' : 'Continue'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
