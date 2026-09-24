import HeroSection from "@/src/components/home/hero/hero";
import CategoriesSection from "@/src/components/home/categories/categories";
import CatalogSection from "@/src/components/home/catalog/catalog";
import NewItemsSection from "@/src/components/home/newItems/newItems";
import AdvantagesSection from "@/src/components/home/advantages/advantages";
import CollectionSection from "@/src/components/home/collection/collection";
import InsightsSection from "@/src/components/home/insights/insights";
import Header from "../components/layout/header/header";
import Footer from "../components/layout/footer/footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <CategoriesSection />
        <CatalogSection />
        <NewItemsSection />
        <AdvantagesSection />
        <CollectionSection />
        <InsightsSection />
      </main>
      <Footer />
    </>
  );
}
