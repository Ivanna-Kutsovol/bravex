"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import stl from "./checkout.module.scss";
import { useCart } from "../cart/cart-context";

export type ShippingMethod = {
  id: number;
  name: string;
  description: string;
  price: number;
  estimatedDelivery: string;
};

type OrderPayload = {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  country: string;
  stateRegion: string;
  address: string;
  city: string;
  postalCode: string;
  shippingMethodId: number;
  items: { productId: number; quantity: number }[];
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

async function submitOrder(payload: OrderPayload) {
  const res = await fetch(`${API_BASE}/api/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Failed to create order");
  }

  return res.json();
}

export default function CheckoutForm({
  shippingMethods,
}: {
  shippingMethods: ShippingMethod[];
}) {
  const router = useRouter();
  const { items, clearCart } = useCart();
  const [selectedShipping, setSelectedShipping] = useState<number | null>(shippingMethods[0]?.id ?? null);
  const [form, setForm] = useState({
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    country: "",
    stateRegion: "",
    address: "",
    city: "",
    postalCode: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedShipping || items.length === 0) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const createdOrder = await submitOrder({
        email: form.email,
        phone: form.phone,
        firstName: form.firstName,
        lastName: form.lastName,
        country: form.country,
        stateRegion: form.stateRegion,
        address: form.address,
        city: form.city,
        postalCode: form.postalCode,
        shippingMethodId: selectedShipping,
        items: items.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
      });

      clearCart();
      router.push(`/checkout/success?orderId=${createdOrder.id}`);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Failed to create order");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={stl.checkout}>
      <nav className={stl.checkout__steps} aria-label="Checkout steps">
        <button className={`${stl.checkout__step} ${stl["checkout__step--active"]}`} type="button">
          Shipping & Billing
        </button>
        <button className={stl.checkout__step} type="button">
          Payment
        </button>
      </nav>

      <form className={stl.checkout__form} onSubmit={handleSubmit}>
        {items.length > 0 ? (
          <section className={stl.checkout__section}>
            <h2 className={stl["checkout__section-title"]}>Selected Items</h2>
            <div className={stl.checkout__products}>
              {items.map((item) => (
                <div key={item.id} className={stl.checkout__product}>
                  <div className={stl.checkout__productInfo}>
                    <img className={stl.checkout__productImage} src={item.imageUrl} alt={item.name} />
                    <div className={stl.checkout__info}>
                      <p className={stl.checkout__productTitle}>{item.name}</p>
                      <p className={stl.checkout__productMeta}>Qty {item.quantity}</p>
                    </div>
                  </div>
                  <p className={stl.checkout__productPrice}>
                    {Number(item.price * item.quantity).toLocaleString("en-US")} EUR
                  </p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <section className={stl.checkout__section}>
          <h2 className={stl["checkout__section-title"]}>Contact Info</h2>
          <div className={stl.checkout__field}>
            <input
              className={stl.checkout__input}
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              required
            />
          </div>
          <div className={stl.checkout__field}>
            <input
              className={stl.checkout__input}
              type="tel"
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              required
            />
          </div>
        </section>

        <section className={stl.checkout__section}>
          <h2 className={stl["checkout__section-title"]}>Shipping Address</h2>
          <div className={stl.checkout__row}>
            <div className={stl.checkout__field}>
              <input
                className={stl.checkout__input}
                type="text"
                placeholder="First Name"
                value={form.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                required
              />
            </div>
            <div className={stl.checkout__field}>
              <input
                className={stl.checkout__input}
                type="text"
                placeholder="Last Name"
                value={form.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                required
              />
            </div>
          </div>
          <div className={stl.checkout__field}>
            <input
              className={stl.checkout__input}
              type="text"
              placeholder="Country"
              value={form.country}
              onChange={(e) => handleChange("country", e.target.value)}
              required
            />
          </div>
          <div className={stl.checkout__field}>
            <input
              className={stl.checkout__input}
              type="text"
              placeholder="State / Region"
              value={form.stateRegion}
              onChange={(e) => handleChange("stateRegion", e.target.value)}
              required
            />
          </div>
          <div className={stl.checkout__field}>
            <input
              className={stl.checkout__input}
              type="text"
              placeholder="Address"
              value={form.address}
              onChange={(e) => handleChange("address", e.target.value)}
              required
            />
          </div>
          <div className={stl.checkout__row}>
            <div className={stl.checkout__field}>
              <input
                className={stl.checkout__input}
                type="text"
                placeholder="City"
                value={form.city}
                onChange={(e) => handleChange("city", e.target.value)}
                required
              />
            </div>
            <div className={stl.checkout__field}>
              <input
                className={stl.checkout__input}
                type="text"
                placeholder="Postal Code"
                value={form.postalCode}
                onChange={(e) => handleChange("postalCode", e.target.value)}
                required
              />
            </div>
          </div>
        </section>

        <section className={stl.checkout__section}>
          <h2 className={stl["checkout__section-title"]}>Shipping Method</h2>

          {shippingMethods.length > 0 ? (
            shippingMethods.map((method) => (
              <label key={method.id} className={stl.checkout__radio}>
                <input
                  type="radio"
                  name="shipping"
                  checked={selectedShipping === method.id}
                  onChange={() => setSelectedShipping(method.id)}
                />
                <span className={stl["checkout__radio-mark"]}></span>
                <span className={stl["checkout__radio-text"]}>
                  <span className={stl["checkout__radio-title"]}>{method.name}</span>
                  <span className={stl["checkout__radio-subtitle"]}>
                    {method.description || method.estimatedDelivery}
                  </span>
                </span>
                <span className={stl.checkout__price}>${method.price.toFixed(2)}</span>
              </label>
            ))
          ) : (
            <p className={stl["checkout__radio-subtitle"]}>Shipping methods are temporarily unavailable.</p>
          )}
        </section>

        {submitError ? <p className={stl["checkout__radio-subtitle"]}>{submitError}</p> : null}

        <button
          className={stl.checkout__btn}
          type="submit"
          disabled={items.length === 0 || !selectedShipping || isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Continue"}
        </button>
      </form>
    </section>
  );
}
