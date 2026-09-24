"use client";

import { useRouter } from "next/navigation";
import { useCart } from "@/src/components/cart/cart-context";
import stl from "./page.module.scss";

type ProductActionsProps = {
  product: {
    id: number;
    name: string;
    shortDescription?: string;
    description?: string;
    price: number;
    imageUrl?: string;
  };
};

function getShortDescription(shortDescription?: string, description?: string, maxLength = 120) {
  if (shortDescription?.trim()) {
    return shortDescription.trim();
  }

  const normalizedDescription = description?.trim();

  if (!normalizedDescription) {
    return "Selected product from BRAVEX catalog.";
  }

  if (normalizedDescription.length <= maxLength) {
    return normalizedDescription;
  }

  return `${normalizedDescription.slice(0, maxLength).trim()}...`;
}

export default function ProductActions({ product }: ProductActionsProps) {
  const router = useRouter();
  const { addItem } = useCart();

  const cartItem = {
    id: product.id,
    name: product.name,
    shortDescription: getShortDescription(product.shortDescription, product.description),
    price: Number(product.price),
    imageUrl: product.imageUrl || "/img/newItems/img1.png",
    size: "Standard",
  };

  const handleAddToCart = () => {
    addItem(cartItem);
    router.push("/cart");
  };

  const handleBuyNow = () => {
    addItem(cartItem);
    router.push("/checkout");
  };

  return (
    <div className={stl.container}>
      <button type="button" className={stl.container__link} onClick={handleAddToCart}>
        Add to cart
      </button>

      <button type="button" className={stl.container__link} onClick={handleBuyNow}>
        Buy now
      </button>
    </div>
  );
}
