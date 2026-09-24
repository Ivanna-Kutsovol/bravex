"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import stl from "./categories.module.scss";

type Category = {
  id: number;
  name: string;
  imageUrl?: string;
};

const fallbackCategories: Category[] = [
  { id: 1, imageUrl: "/img/categories/furnitureSofas.png", name: "Furniture & Sofas" },
  { id: 2, imageUrl: "/img/categories/childrenFurniture.png", name: "Children Furniture" },
  { id: 3, imageUrl: "/img/categories/bathroomSanitaryFurniture.png", name: "Bathroom & Sanitary Furniture" },
  { id: 4, imageUrl: "/img/categories/kitchens.png", name: "Kitchens" },
  { id: 5, imageUrl: "/img/categories/lightingMirrors.png", name: "Lighting & Mirrors" },
  { id: 6, imageUrl: "/img/categories/doorsGlassPartitions.png", name: "Doors, Glass & Partitions" },
  { id: 7, imageUrl: "/img/categories/decorFinishingMaterials.png", name: "Decor & Finishing Materials" },
  { id: 8, imageUrl: "/img/categories/architectureStairs.png", name: "Architecture & Stairs" },
];

export default function CategoriesSection() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const loadCategories = async () => {
      try {
        const res = await fetch("/api/categories", { cache: "no-store" });
        if (!res.ok) return;

        const data = (await res.json()) as Category[];
        if (!cancelled && Array.isArray(data)) {
          setCategories(data);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadCategories();

    return () => {
      cancelled = true;
    };
  }, []);

  const renderCategories = useMemo(() => {
    if (categories.length > 0) return categories;
    return fallbackCategories;
  }, [categories]);

  return (
    <section id="categories" className={stl.categories}>
      <div className={stl.block__header}>
        <h2 className={stl.block__title}>
          Popular <span className={stl["block__title--block"]}>categories</span>
        </h2>
        <div className={stl.block__logo}>
          <img src="/img/logo.svg" alt="BRAVEX" width={103} height={10} decoding="async" />
        </div>
      </div>

      <div className={stl.cards} id="cards">
        {renderCategories.map((card) => (
          <Link className={stl.card} key={card.id} href={`/category/${card.id}`}>
            <img
              src={card.imageUrl || "/img/categories/furnitureSofas.png"}
              alt={card.name}
              width={380}
              height={418}
              loading="lazy"
              decoding="async"
            />
            <p className={stl.card__title}>{card.name}</p>
          </Link>
        ))}
      </div>

      {loading ? <p>Loading categories...</p> 
        :
      <div className={stl["container-btn"]}>
        <Link className={stl["btn-text"]} href="/category/all">
          See all categories
        </Link>
        <img className={stl["btn-img"]} src="/img/arrow.svg" alt="arrow" width={14} height={14} decoding="async" />
      </div>
      }
    </section>
  );
}
