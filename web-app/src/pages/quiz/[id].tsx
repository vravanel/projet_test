import NavBar from "@/components/Navbar";
import Question from "@/components/Question";
import Response from "@/components/Response";
import ProgressQuiz from "@/components/ProgressQuiz";
import Timer from "@/components/Timer";
import FormGroup from "@mui/material/FormGroup";
import { Grid, Button } from "@mui/material";
import { useState, useEffect } from "react";
import data from "../data/data.json";

export default function Quiz() {
  const [progressValue, setProgressValue] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [resetTimer, setResetTimer] = useState(false);
  const handleNext = () => {
    setProgressValue(progressValue + 10);
    setCurrentQuestion(currentQuestion + 1);
    setResetTimer(true);
  };

  useEffect(() => {
    if (resetTimer) {
      const timeout = setTimeout(() => {
        setResetTimer(false);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [resetTimer]);

  return (
    <>
      <NavBar />
      <div className="flex justify-end mt-10 mr-20">
        <Timer resetTimer={resetTimer} onTimeFinish={handleNext} />
      </div>
      {data.map(
        (question, index) =>
          currentQuestion === index && (
            <Question key={index} question={question.question} />
          )
      )}
      <ProgressQuiz number={progressValue} />
      <div className="flex justify-center mt-20">
        <FormGroup>
          <Grid
            container
            rowSpacing={6}
            columnSpacing={{ xs: 2, sm: 4, md: 6 }}
          >
            {data.map(
              (question, index) =>
                currentQuestion === index &&
                question.answers.map((answer, index) => (
                  <Response key={index} reponse={answer} />
                ))
            )}
          </Grid>
        </FormGroup>
      </div>
      <div className="flex justify-end mt-10 mr-20">
        <Button variant="contained" onClick={handleNext}>
          Suivant
        </Button>
      </div>
    </>
  );
}
