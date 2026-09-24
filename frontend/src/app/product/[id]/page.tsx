import { notFound } from "next/navigation";
import ProductGallery from "./ProductGallery";
import stl from "./page.module.scss";
import Header from "@/src/components/layout/header/header";
import Footer from "@/src/components/layout/footer/footer";
import Breadcrumbs from "@/src/components/shared/breadcrumbs";
import ProductActions from "./ProductActions";

type Product = {
    id: number;
    name: string;
    shortDescription?: string;
    description?: string;
    price: number;
    imageUrl?: string;
    categoryId?: number;
};

type ProductImage = {
    id: number;
    productId: number;
    imageUrl: string;
    isMain: boolean;
};

type Category = {
    id: number;
    name: string;
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

async function getProduct(id: string): Promise<Product | null> {
    const res = await fetch(`${API_BASE}/api/products/${id}`, { cache: "no-store", });
    if (!res.ok) return null;
    return (await res.json()) as Product;
}

async function getProductImages(id: string): Promise<ProductImage[]> {
    const res = await fetch(`${API_BASE}/api/products/${id}/images`, {
    cache: "no-store",
    });

    if (!res.ok) return [];
    return (await res.json()) as ProductImage[];
}

async function getCategory(id: string): Promise<Category | null> {
    if (id === "all") return { id: 0, name: "All categories" };

    const res = await fetch(`${API_BASE}/api/categories/${id}`, { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as Category;
}

export default async function ProductPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const [product, images] = await Promise.all([getProduct(id), getProductImages(id)]);

    if (!product) return notFound();

    const galleryImages = images.length
    ? images.map((img) => img.imageUrl)
    : product.imageUrl
        ? [product.imageUrl]
        : [];

    const mainImage =
    images.find((img) => img.isMain)?.imageUrl || product.imageUrl || galleryImages[0] || "";

    const category = product.categoryId
        ? await getCategory(String(product.categoryId))
        : { id: 0, name: "All categories" };

    return (
    <main className={stl.productPage}>
        <Header/>
    <section className={stl.main}>
        <Breadcrumbs
            className={stl.breadcrumbs}
            items={[
                { label: "Home", href: "/" },
                { label: category.name, href: `/category/${category.id}` },
                { label: product.name },
            ]}
        />
        <div className={stl.productCard}>
        <ProductGallery name={product.name} mainImage={mainImage} images={galleryImages} />

        <div className={stl.productInfo}>
            <h1 className={stl.productInfo__title}>{product.name}</h1>
            <p className={stl.productInfo__description}>{product.description}</p>
            <div className={stl.purchase}>
                <strong className={stl.purchase__price}>{Number(product.price).toLocaleString("en-US")} EUR</strong>
                <ProductActions
                    product={{
                        id: product.id,
                        name: product.name,
                        shortDescription: product.shortDescription,
                        description: product.description,
                        price: product.price,
                        imageUrl: mainImage,
                    }}
                />
            </div>
        </div>
        </div>
    </section>
        <Footer/>
    </main>
    );
}
