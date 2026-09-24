"use client";

import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import stl from "./page.module.scss";

type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl?: string;
  shortDescription?: string;
  brand?: string;
  color?: string;
  material?: string;
  collectionName?: string;
  stockQuantity?: number;
  isFeatured?: boolean;
  isHero?: boolean;
  categoryId?: number;
};

type Category = {
  id: number;
  name: string;
};

type Props = {
  products: Product[];
  categories: Category[];
  currentCategoryId: string;
};

function toggleValue(list: string[], value: string) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

function parseList(value: string | null): string[] {
  if (!value) return [];
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseNumberParam(value: string | null): number | null {
  if (value === null || value === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

export default function CategoryProductsClient({ products, categories, currentCategoryId }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search")?.trim() || "";

  const prices = useMemo(() => products.map((p) => Number(p.price) || 0), [products]);
  const minPriceGlobal = useMemo(() => (prices.length ? Math.min(...prices) : 0), [prices]);
  const maxPriceGlobal = useMemo(() => (prices.length ? Math.max(...prices) : 0), [prices]);

  const [selectedBrands, setSelectedBrands] = useState<string[]>(() =>
    parseList(searchParams.get("brand"))
  );
  const [selectedColors, setSelectedColors] = useState<string[]>(() =>
    parseList(searchParams.get("color"))
  );
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>(() =>
    parseList(searchParams.get("material"))
  );
  const [selectedCollections, setSelectedCollections] = useState<string[]>(() =>
    parseList(searchParams.get("collection"))
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() =>
    parseList(searchParams.get("category"))
  );
  const [featuredOnly, setFeaturedOnly] = useState(searchParams.get("featured") === "1");
  const [heroOnly, setHeroOnly] = useState(searchParams.get("hero") === "1");
  const [inStockOnly, setInStockOnly] = useState(searchParams.get("stock") === "1");
  const [minPrice, setMinPrice] = useState<number>(() => {
    const value = parseNumberParam(searchParams.get("minPrice"));
    return value === null ? minPriceGlobal : value;
  });
  const [maxPrice, setMaxPrice] = useState<number>(() => {
    const value = parseNumberParam(searchParams.get("maxPrice"));
    return value === null ? maxPriceGlobal : value;
  });

  const brands = useMemo(
    () => Array.from(new Set(products.map((p) => p.brand).filter(Boolean))) as string[],
    [products]
  );
  const colors = useMemo(
    () => Array.from(new Set(products.map((p) => p.color).filter(Boolean))) as string[],
    [products]
  );
  const materials = useMemo(
    () => Array.from(new Set(products.map((p) => p.material).filter(Boolean))) as string[],
    [products]
  );
  const collections = useMemo(
    () => Array.from(new Set(products.map((p) => p.collectionName).filter(Boolean))) as string[],
    [products]
  );
  const categoryOptions = useMemo(() => {
    if (currentCategoryId !== "all") return [];

    const usedCategoryIds = new Set(
      products
        .map((product) => product.categoryId)
        .filter((value): value is number => typeof value === "number")
    );

    return categories.filter((category) => usedCategoryIds.has(category.id));
  }, [categories, currentCategoryId, products]);

  useEffect(() => {
    setSelectedBrands(parseList(searchParams.get("brand")));
    setSelectedColors(parseList(searchParams.get("color")));
    setSelectedMaterials(parseList(searchParams.get("material")));
    setSelectedCollections(parseList(searchParams.get("collection")));
    setSelectedCategories(parseList(searchParams.get("category")));
    setFeaturedOnly(searchParams.get("featured") === "1");
    setHeroOnly(searchParams.get("hero") === "1");
    setInStockOnly(searchParams.get("stock") === "1");

    const nextMinPrice = parseNumberParam(searchParams.get("minPrice"));
    const nextMaxPrice = parseNumberParam(searchParams.get("maxPrice"));
    setMinPrice(nextMinPrice === null ? minPriceGlobal : nextMinPrice);
    setMaxPrice(nextMaxPrice === null ? maxPriceGlobal : nextMaxPrice);
  }, [searchParams, minPriceGlobal, maxPriceGlobal]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const price = Number(product.price) || 0;

      const matchesPrice = price >= minPrice && price <= maxPrice;
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand || "");
      const matchesColor = selectedColors.length === 0 || selectedColors.includes(product.color || "");
      const matchesMaterial =
        selectedMaterials.length === 0 || selectedMaterials.includes(product.material || "");
      const matchesCollection =
        selectedCollections.length === 0 || selectedCollections.includes(product.collectionName || "");
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(String(product.categoryId ?? ""));

      const matchesFeatured = !featuredOnly || Boolean(product.isFeatured);
      const matchesHero = !heroOnly || Boolean(product.isHero);
      const matchesStock = !inStockOnly || Number(product.stockQuantity || 0) > 0;

      return (
        matchesPrice &&
        matchesBrand &&
        matchesColor &&
        matchesMaterial &&
        matchesCollection &&
        matchesCategory &&
        matchesFeatured &&
        matchesHero &&
        matchesStock
      );
    });
  }, [
    products,
    minPrice,
    maxPrice,
    selectedBrands,
    selectedColors,
    selectedMaterials,
    selectedCollections,
    selectedCategories,
    featuredOnly,
    heroOnly,
    inStockOnly,
  ]);

  const resetFilters = () => {
    setSelectedBrands([]);
    setSelectedColors([]);
    setSelectedMaterials([]);
    setSelectedCollections([]);
    setSelectedCategories([]);
    setFeaturedOnly(false);
    setHeroOnly(false);
    setInStockOnly(false);
    setMinPrice(minPriceGlobal);
    setMaxPrice(maxPriceGlobal);
  };

  useEffect(() => {
    // Keep URL in sync with active filters for shareable links.
    const params = new URLSearchParams();
    if (searchTerm) params.set("search", searchTerm);
    if (selectedBrands.length) params.set("brand", selectedBrands.join(","));
    if (selectedColors.length) params.set("color", selectedColors.join(","));
    if (selectedMaterials.length) params.set("material", selectedMaterials.join(","));
    if (selectedCollections.length) params.set("collection", selectedCollections.join(","));
    if (selectedCategories.length) params.set("category", selectedCategories.join(","));
    if (featuredOnly) params.set("featured", "1");
    if (heroOnly) params.set("hero", "1");
    if (inStockOnly) params.set("stock", "1");
    if (minPrice !== minPriceGlobal) params.set("minPrice", String(minPrice));
    if (maxPrice !== maxPriceGlobal) params.set("maxPrice", String(maxPrice));

    const nextQuery = params.toString();
    const currentQuery = searchParams.toString();
    if (nextQuery === currentQuery) return;

    router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, { scroll: false });
  }, [
    router,
    pathname,
    searchParams,
    searchTerm,
    selectedBrands,
    selectedColors,
    selectedMaterials,
    selectedCollections,
    selectedCategories,
    featuredOnly,
    heroOnly,
    inStockOnly,
    minPrice,
    maxPrice,
    minPriceGlobal,
    maxPriceGlobal,
  ]);

  const minPercent =
    maxPriceGlobal === minPriceGlobal
      ? 0
      : ((minPrice - minPriceGlobal) / (maxPriceGlobal - minPriceGlobal)) * 100;
  const maxPercent =
    maxPriceGlobal === minPriceGlobal
      ? 100
      : ((maxPrice - minPriceGlobal) / (maxPriceGlobal - minPriceGlobal)) * 100;

  return (
    <>
      <section className={stl.filterPanel}>
        <div className={stl.filterHeaderRow}>
          <h2>Filter</h2>
          <button className={stl.filterSaveBtn} type="button" onClick={resetFilters}>
            Reset
          </button>
        </div>

        <div className={stl.filterBlock}>
          <h3>Price Range</h3>
          <div
            className={stl.rangeWrap}
            style={
              {
                "--range-min": `${minPercent}%`,
                "--range-max": `${maxPercent}%`,
              } as CSSProperties
            }
          >
            <input
              type="range"
              min={minPriceGlobal}
              max={maxPriceGlobal}
              value={minPrice}
              onChange={(e) => setMinPrice(Math.min(Number(e.target.value), maxPrice))}
              className={stl.rangeInput}
            />
            <input
              type="range"
              min={minPriceGlobal}
              max={maxPriceGlobal}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Math.max(Number(e.target.value), minPrice))}
              className={stl.rangeInput}
            />
          </div>
          <p className={stl.rangeLabel}>
            {minPrice.toLocaleString("en-US")} EUR - {maxPrice.toLocaleString("en-US")} EUR
          </p>
        </div>

        {currentCategoryId === "all" && categoryOptions.length > 0 ? (
          <div className={stl.filterBlock}>
            <h3>Category</h3>
            <div className={stl.chips}>
              {categoryOptions.map((category) => {
                const value = String(category.id);
                const active = selectedCategories.includes(value);

                return (
                  <button
                    key={category.id}
                    type="button"
                    className={active ? stl.chipActive : stl.chip}
                    onClick={() => setSelectedCategories((prev) => toggleValue(prev, value))}
                  >
                    {category.name}
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}

        <div className={stl.filterBlock}>
          <h3>Brand</h3>
          <div className={stl.chips}>
            {brands.map((value) => {
              const active = selectedBrands.includes(value);
              return (
                <button
                  key={value}
                  type="button"
                  className={active ? stl.chipActive : stl.chip}
                  onClick={() => setSelectedBrands((prev) => toggleValue(prev, value))}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>

        <div className={stl.filterBlock}>
          <h3>Color</h3>
          <div className={stl.chips}>
            {colors.map((value) => {
              const active = selectedColors.includes(value);
              return (
                <button
                  key={value}
                  type="button"
                  className={active ? stl.chipActive : stl.chip}
                  onClick={() => setSelectedColors((prev) => toggleValue(prev, value))}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>

        <div className={stl.filterBlock}>
          <h3>Material</h3>
          <div className={stl.chips}>
            {materials.map((value) => {
              const active = selectedMaterials.includes(value);
              return (
                <button
                  key={value}
                  type="button"
                  className={active ? stl.chipActive : stl.chip}
                  onClick={() => setSelectedMaterials((prev) => toggleValue(prev, value))}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>

        <div className={stl.filterBlock}>
          <h3>Collection</h3>
          <div className={stl.chips}>
            {collections.map((value) => {
              const active = selectedCollections.includes(value);
              return (
                <button
                  key={value}
                  type="button"
                  className={active ? stl.chipActive : stl.chip}
                  onClick={() => setSelectedCollections((prev) => toggleValue(prev, value))}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>

        <div className={stl.filterBlock}>
          <h3>Features</h3>
          <div className={stl.chips}>
            <button type="button" className={featuredOnly ? stl.chipActive : stl.chip} onClick={() => setFeaturedOnly((v) => !v)}>
              Featured
            </button>
            <button type="button" className={heroOnly ? stl.chipActive : stl.chip} onClick={() => setHeroOnly((v) => !v)}>
              Hero
            </button>
            <button type="button" className={inStockOnly ? stl.chipActive : stl.chip} onClick={() => setInStockOnly((v) => !v)}>
              In stock
            </button>
          </div>
        </div>
      </section>

      <section className={stl.products}>
        <p className={stl.filteredCount}>{filteredProducts.length} products after filters</p>

      <section className={stl.grid}>
        {filteredProducts.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`} className={stl.card}>
            <img
              src={product.imageUrl || "/img/newItems/img1.png"}
              alt={product.name}
              className={stl.cardImage}
            />
            <div className={stl.cardContent}>
              <div className={stl.cardTitleWrapper}>
                <p className={stl.cardTitle}>{product.name}</p>
                <p className={stl.cardPrice}>{Number(product.price).toLocaleString("en-US")} EUR</p>
              </div>
            </div>
            <span className={stl.cardPlus}>+</span>
          </Link>
        ))}
      </section>
      </section>
     
    </>
  );
}
