import Hero from "@/components/sections/Hero";
import Navbar from "@/components/sections/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F5F0E8]">
      <Navbar />
      <Hero />
    </main>
  );
}
