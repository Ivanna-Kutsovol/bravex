"use client";

import Link from "next/link";
import stl from "./orderSummary.module.scss";
import { useCart } from "../cart/cart-context";

const DEFAULT_SHIPPING_PRICE = 0;
const DEFAULT_SHIPPING_LABEL = "Express Delivery";
const DEFAULT_SHIPPING_DELIVERY = "Delivery in 2-4 business days";

function formatPrice(price: number) {
  return `$${price.toLocaleString("en-US")} USD`;
}

export default function OrderSummary({ checkoutLink = false }) {
  const { items, subtotal } = useCart();
  const total = subtotal + DEFAULT_SHIPPING_PRICE;

  return (
    <section className={stl.cart__summary}>
      <h2 className={stl.cart__summary__title}>Order Summary</h2>
      {items.length > 0 ? (
        <div className={stl.cart__summary__items}>
          {items.map((item) => (
            <div key={item.id} className={stl.cart__summary__item}>
              <p className={stl.cart__summary__itemName}>
                {item.name} x {item.quantity}
              </p>
              <p className={stl.cart__summary__itemPrice}>{formatPrice(item.price * item.quantity)}</p>
            </div>
          ))}
        </div>
      ) : null}
      <div className={stl.cart__summary__wrapper}>
        <p className={stl.cart__summary__label}>Subtotal</p>
        <p className={stl.cart__summary__price}>{formatPrice(subtotal)}</p>
      </div>
      <div className={stl.cart__summary__wrapper}>
        <div className={stl.cart__summary__shippingWrapper}>
          <p className={stl.cart__summary__label}>{DEFAULT_SHIPPING_LABEL}</p>
          <p className={stl.cart__summary__delivery}>{DEFAULT_SHIPPING_DELIVERY}</p>
        </div>
        <p className={stl.cart__summary__price}>{formatPrice(DEFAULT_SHIPPING_PRICE)}</p>
      </div>
      <span className={stl.cart__summary__line}></span>
      <div className={stl.cart__summary__wrapper}>
        <p className={stl.cart__summary__label}>Total</p>
        <p className={stl.cart__summary__price}>{formatPrice(total)}</p>
      </div>

      {checkoutLink ? (
        <Link href="/checkout" className={stl.cart__summary__btn} aria-label="checkout">
          Checkout
          <img className={stl.cart__summary__arrow} src="/img/arrowCart.svg" alt="arrow" />
        </Link>
      ) : (
        <button className={stl.cart__summary__btn} type="button" disabled={items.length === 0}>
          Continue
          <img className={stl.cart__summary__arrow} src="/img/arrowCart.svg" alt="arrow" />
        </button>
      )}
    </section>
  );
}
