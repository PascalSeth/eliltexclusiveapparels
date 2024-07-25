import { CategoriesSelection } from "../components/storefront/CategorySelection";
import { FeaturedProducts } from "../components/storefront/FeaturedProducts";
import { Hero } from "../components/storefront/Hero";
import { Navbar } from "../components/storefront/Navbar";

export default function IndexPage() {
  return (
    <div className="w-full h-full overflow-x-hidden">
      <Hero />
      <CategoriesSelection />
      <FeaturedProducts />
    </div>
  );
}
