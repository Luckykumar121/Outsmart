import Navbar from "../components/home/Navbar";
import Hero from "../components/home/Hero";
import Gamestat from "../components/home/Gamestat";
import Htp from "../components/home/Htp";

export default function Home({ navigate }) {
  return (
    <main className="home-page">
      <Navbar />

      <Hero navigate={navigate} />

      <Gamestat />

      <Htp />
    </main>
  );
}
