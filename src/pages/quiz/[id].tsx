import NavBar from "@/components/Navbar";
import Question from "@/components/Question";
import Response from "@/components/Response";
import SliderQuiz from "@/components/SliderQuiz";
import Timer from "@/components/Timer";

export default function Quiz() {
  return (
    <>
      <NavBar />
      <div className="flex justify-around mt-10">
        <SliderQuiz number={5} />
        <Timer />
      </div>
      <Question question="Une superbe question" />
      {/* <Response /> */}
    </>
  );
}
