import Hero from "@/components/sections/Hero";
import Navbar from "@/components/sections/Navbar";
import WorkSection from "@/components/sections/WorkSection";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F5F0E8]">
      <Navbar />
      <Hero />
      <WorkSection />
      <Footer />
    </main>
  );
}
