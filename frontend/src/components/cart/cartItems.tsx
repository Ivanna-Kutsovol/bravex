"use client";

import React from "react";
import stl from "./cart.module.scss";
import { useCart } from "./cart-context";

function formatPrice(price: number) {
  return `${price.toLocaleString("en-US")} EUR`;
}

export default function CartItems() {
  const { items, removeItem } = useCart();

  return (
    <section className={stl.cart}>
      <span className={stl.cart__line}></span>
      {items.length === 0 ? (
        <div className={stl.cart__empty}>
          <p className={stl.cart__emptyTitle}>Your shopping bag is empty.</p>
          <p className={stl.cart__emptyText}>Add a product from the catalog to see it here.</p>
        </div>
      ) : (
        <div className={stl.cart__items}>
          {items.map((item, index) => (
            <div key={item.id}>
              <div className={stl.cart__item}>
                <div className={stl.cart__main}>
                  <div className={stl.cart__img}>
                    <img src={item.imageUrl} alt={item.name} />
                  </div>
                  <div className={stl.cart__content}>
                    <h2 className={stl.cart__name}>{item.name}</h2>
                    <p className={stl.cart__description}>{item.shortDescription}</p>
                    <p className={stl.cart__size}>
                      {item.size || "Standard"} | Qty {item.quantity}
                    </p>
                  </div>
                </div>
                <div className={stl.cart__meta}>
                  <button
                    className={stl.cart__delete}
                    type="button"
                    onClick={() => removeItem(item.id)}
                    aria-label={`Remove ${item.name} from cart`}
                  ></button>
                  <p className={stl.cart__item__price}>{formatPrice(item.price * item.quantity)}</p>
                </div>
              </div>
              {index !== items.length - 1 ? <span className={stl.cart__line}></span> : null}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
