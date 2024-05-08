import NavBar from "../components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <NavBar />
      <main>
        <h1 className="text-center mt-6 text-3xl">
          Bienvenue sur le site je prépare mon titre professionel !{" "}
        </h1>
        <Footer />
      </main>
    </>
  );
}
