import Question from "@/components/Question";
import Response from "@/components/Response";
import ProgressQuiz from "@/components/ProgressQuiz";
import Timer from "@/components/Timer";
import FormGroup from "@mui/material/FormGroup";
import { Grid, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

export const GET_QUESTIONS_BY_QUIZ = gql`
  query GetQuestionsByQuiz($getQuestionsByQuizId: String!) {
    getQuestionsByQuiz(id: $getQuestionsByQuizId) {
      id
      title
      reponses {
        id
        isValid
        title
      }
    }
  }
`;

export default function Quiz() {
  const router = useRouter();
  const { id } = router.query;
  const [progressValue, setProgressValue] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [resetTimer, setResetTimer] = useState(false);
  const { data } = useQuery(GET_QUESTIONS_BY_QUIZ, {
    variables: {
      getQuestionsByQuizId: id,
    },
  });

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
      <div className="flex justify-end mt-10 mr-20">
        <Timer resetTimer={resetTimer} onTimeFinish={handleNext} />
      </div>
      <div className="flex justify-center">
        {data?.getQuestionsByQuiz.map(
          (question, index) =>
            currentQuestion === index && (
              <Question key={index} question={question.title} />
            )
        )}
      </div>
      <ProgressQuiz number={progressValue} />
      <div className="flex justify-center mt-20">
        <FormGroup>
          <Grid
            container
            rowSpacing={6}
            columnSpacing={{ xs: 2, sm: 4, md: 6 }}
          >
            {data?.getQuestionsByQuiz.map(
              (question, index) =>
                currentQuestion === index &&
                question.reponses.map((reponse, index) => (
                  <Response key={index} reponse={reponse.title} />
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
