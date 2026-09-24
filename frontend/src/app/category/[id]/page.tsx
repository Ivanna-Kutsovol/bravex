import Link from "next/link";
import { notFound } from "next/navigation";

import Header from "@/src/components/layout/header/header";
import Footer from "@/src/components/layout/footer/footer";
import CategoryProductsClient from "./categoryProductsClient";
import stl from "./page.module.scss";
import Breadcrumbs from "@/src/components/shared/breadcrumbs";

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

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

async function getCategory(id: string): Promise<Category | null> {
  if (id === "all") return { id: 0, name: "All categories" };

  const res = await fetch(`${API_BASE}/api/categories/${id}`, { cache: "no-store" });
  if (!res.ok) return null;
  return (await res.json()) as Category;
}

async function getProductsByCategory(id: string, search?: string): Promise<Product[]> {
  const params = new URLSearchParams();
  if (id !== "all") params.set("categoryId", id);
  if (search?.trim()) params.set("search", search.trim());

  const query = params.toString();
  const res = await fetch(`${API_BASE}/api/products${query ? `?${query}` : ""}`, { cache: "no-store" });
  if (!res.ok) return [];
  return (await res.json()) as Product[];
}

async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${API_BASE}/api/categories`, { cache: "no-store" });
  if (!res.ok) return [];
  return (await res.json()) as Category[];
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ search?: string }>;
}) {
  const { id } = await params;
  const { search } = await searchParams;

  const [category, products, categories] = await Promise.all([
    getCategory(id),
    getProductsByCategory(id, search),
    getCategories(),
  ]);
  if (!category) return notFound();

  return (
    <>
      <Header />
      <main className={stl.page}>
        
        <section className={stl.page__head}>
            <Breadcrumbs
            className={stl.breadcrumbs}
            items={[
                { label: "Home", href: "/" },
                { label: category.name, href: `/category/${category.id}` },
            ]}
            />
          <h1>{category.name}</h1>
          <p>{products.length} products</p>
        </section>
        <section className={stl.page__products}>

        <CategoryProductsClient products={products} categories={categories} currentCategoryId={id} />
        </section>
      </main>
      <Footer />
    </>
  );
}
