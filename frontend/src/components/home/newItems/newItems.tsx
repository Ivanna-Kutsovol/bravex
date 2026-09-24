"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import InfiniteSlider from "@/src/components/shared/InfiniteSlider";
import stl from "./newItems.module.scss";

type ProductCard = {
  id: number;
  imageUrl: string;
  shortDescription: string;
  title: string;
  price: number;
};

type ApiProduct = {
  id: number;
  name: string;
  shortDescription?: string;
  price: number;
  imageUrl?: string;
};

export default function NewItemsSection() {
  const [products, setProducts] = useState<ProductCard[]>([]);

  useEffect(() => {
    let cancelled = false;

    const loadProducts = async () => {
      try {
        const res = await fetch("/api/products", { cache: "no-store" });
        if (!res.ok) return;

        const data = (await res.json()) as ApiProduct[];
        if (!Array.isArray(data) || cancelled) return;

        const mapped = data.slice(0, 12).map((item) => ({
          id: item.id,
          imageUrl: item.imageUrl || "/img/newItems/img1.png",
          shortDescription: item.shortDescription || "No description",
          title: item.name,
          price: Number(item.price) || 0,
        }));

        setProducts(mapped);
      } catch {
        // Keep fallback UI when API is unavailable.
      }
    };

    loadProducts();

    return () => {
      cancelled = true;
    };
  }, []);

  const sliderItems = useMemo<ProductCard[]>(() => {
    if (products.length > 0) return products;

    return [
      {
        id: 0,
        imageUrl: "/img/newItems/img1.png",
        shortDescription: "Loading products...",
        title: "Please wait",
        price: 0,
      },
    ];
  }, [products]);

  return (
    <section id="newItems" className={stl.newItems}>
      <InfiniteSlider<ProductCard>
        items={sliderItems}
        gap={20}
        headerClassName={stl.newItems__header}
        title="New items"
        titleClassName={stl.block__title}
        arrowGroupClassName={stl.block__arrows}
        arrowClassName={stl.block__arrow}
        leftArrowClassName={stl.left}
        rightArrowClassName={stl.right}
        activeArrowClassName={stl.block__active}
        arrowIconSrc="/img/arrow.svg"
        containerClassName={stl["newItems__cards-container"]}
        trackClassName={stl.newItems__cards}
        slideClassName={stl.newItems__card}
        containerId="newItemsCards"
        renderItem={(card) => (
          <>
            <Link href={card.id > 0 ? `/product/${card.id}` : "#"}>
              <img
                className={stl.newItems__img}
                src={card.imageUrl}
                alt={card.title}
                width={380}
                height={380}
                loading="lazy"
                decoding="async"
              />
            </Link>
            <div className={stl.newItems__content}>
              {/* <p className={stl.newItems__description}>{card.shortDescription}</p> */}
              <div className={stl.newItems__titleWrapper}>
                <p className={stl.newItems__title}>{card.title}</p>
                <p className={stl.newItems__price}>{card.price.toLocaleString("en-US")} EUR</p>
              </div>
            </div>
            <Link href={card.id > 0 ? `/product/${card.id}` : "#"} className={stl.newItems__plus}>
              +
            </Link>
          </>
        )}
      />
    </section>
  );
}
