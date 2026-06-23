import { Hero } from '../components/sections/Hero';
import { FeaturedProducts } from '../components/sections/FeaturedProducts';
import { CategoryShowcase } from '../components/sections/CategoryShowcase';
import { WhyChooseUs } from '../components/sections/WhyChooseUs';
import { HowWeMakeIt } from '../components/sections/HowWeMakeIt';
import { BestSellerShowcase } from '../components/sections/BestSellerShowcase';
import { Testimonials } from '../components/sections/Testimonials';
import { Subscription } from '../components/sections/Subscription';
import { Gallery } from '../components/sections/Gallery';
import { Recipes } from '../components/sections/Recipes';
import { FAQ } from '../components/sections/FAQ';
import { Contact } from '../components/sections/Contact';

export function Home() {
  return (
    <main>
      <Hero />
      <FeaturedProducts />
      <CategoryShowcase />
      <WhyChooseUs />
      <HowWeMakeIt />
      <BestSellerShowcase />
      <Testimonials />
      <Subscription />
      <Gallery />
      <Recipes />
      <FAQ />
      <Contact />
    </main>
  );
}
