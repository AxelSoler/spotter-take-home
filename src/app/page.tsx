import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="font-sans min-h-screen pt-20 max-w-screen-xl mx-auto">
      <Navbar />
      <Header />
      <Footer />
    </div>
  );
}
