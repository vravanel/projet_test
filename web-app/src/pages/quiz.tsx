import CardQuiz from "@/components/CardQuiz";
import NavBar from "@/components/Navbar";
import { faLaptopCode } from "@fortawesome/free-solid-svg-icons";

export default function Quiz() {
  return (
    <>
      <NavBar />
      <div className="container mx-auto mt-5 grid gap-4 grid-cols-3 grid-rows-3">
        <CardQuiz title="Quiz 1" icon={faLaptopCode} id="1" />
        <CardQuiz title="Quiz 1" icon={faLaptopCode} id="2" />
        <CardQuiz title="Quiz 1" icon={faLaptopCode} id="3" />
        <CardQuiz title="Quiz 1" icon={faLaptopCode} id="4" />
        <CardQuiz title="Quiz 1" icon={faLaptopCode} id="5" />
        <CardQuiz title="Quiz 1" icon={faLaptopCode} id="6" />
      </div>
    </>
  );
}
