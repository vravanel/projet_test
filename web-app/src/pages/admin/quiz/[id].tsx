import {
  TextField,
  Typography,
  List,
  ListItem,
  Button,
  ListItemText,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

import { gql, useQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import Layout from "@/components/Admin/Layout";
import { useState } from "react";
import {
  UpdateQuestionMutation,
  UpdateQuestionMutationVariables,
} from "@/gql/graphql";

const GET_QUIZ_WITH_QUESTIONS_ADMIN = gql`
  query GetQuizWithQuestions($quizId: String!) {
    getQuizWithQuestions(id: $quizId) {
      id
      title
      isFinish
      difficulty
      image
      description
      questions {
        id
        title
        reponses {
          id
          isValid
          title
        }
      }
    }
  }
`;

const UPDATE_QUESTION = gql`
  mutation UpdateQuestion(
    $title: String!
    $quizId: String!
    $updateQuestionId: ID!
  ) {
    updateQuestion(title: $title, quizId: $quizId, id: $updateQuestionId) {
      id
      title
    }
  }
`;

export const CREATE_QUIZ = gql`
  mutation NewQuiz(
    $title: String!
    $description: String!
    $difficulty: String!
    $image: String!
    $categoryId: String!
    $isFinish: Boolean!
  ) {
    newQuiz(
      title: $title
      description: $description
      difficulty: $difficulty
      image: $image
      categoryId: $categoryId
      isFinish: $isFinish
    ) {
      description
      difficulty
      id
      image
      title
      isFinish
    }
  }
`;

export default function Quiz() {
  const router = useRouter();
  const { id } = router.query;
  const { data, loading, error, refetch } = useQuery(
    GET_QUIZ_WITH_QUESTIONS_ADMIN,
    {
      variables: { quizId: id },
    }
  );
  const [updateQuestion, setUpdateQuestion] = useMutation<
    UpdateQuestionMutation,
    UpdateQuestionMutationVariables
  >(UPDATE_QUESTION);
  const [questions, setQuestions] = useState(
    data?.getQuizWithQuestions.questions || []
  );
  const [currentQuestionId, setCurrentQuestionId] = useState<string | null>(
    null
  );

  const [currentQuestionTitle, setCurrentQuestionTitle] = useState("");

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error.message}</Typography>;

  if (data) {
    const quiz = data.getQuizWithQuestions;
    const questions = data.getQuizWithQuestions.questions || [];

    return (
      <Layout>
        <Typography variant="h4" className="text-2xl font-bold mb-4">
          Gestion du Quiz
        </Typography>

        <form className="space-y-4">
          <TextField
            id="quiz-title"
            label="Titre du Quiz"
            defaultValue={quiz.title || ""}
            fullWidth
            variant="outlined"
            className="mb-4"
          />
          <TextField
            id="quiz-description"
            label="Description"
            defaultValue={quiz.description || ""}
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            className="mb-4"
          />
          <TextField
            id="quiz-difficulty"
            label="Difficulté"
            defaultValue={quiz.difficulty || ""}
            fullWidth
            variant="outlined"
            className="mb-4"
          />

          <Typography variant="h5" className="text-xl font-semibold mb-2">
            Questions
          </Typography>
          <List>
            {questions.map((question) => (
              <div key={question.id} className="mb-4">
                <ListItem>
                  <ListItemText primary={question.title} />
                  <Button
                    variant="outlined"
                    color="primary"
                    className="ml-2"
                    onClick={() => {
                      setCurrentQuestionId(question.id);
                      setCurrentQuestionTitle(question.title);
                    }}
                  >
                    Modifier
                  </Button>
                  <Button variant="outlined" color="secondary" className="ml-2">
                    Supprimer
                  </Button>
                </ListItem>

                <Typography variant="h6" className="text-lg font-medium mt-2">
                  Réponses
                </Typography>
                <List className="pl-4">
                  {question.reponses.map((response) => (
                    <ListItem key={response.id} className="flex items-center">
                      <ListItemText primary={response.title} />
                      <FormControlLabel
                        control={<Checkbox checked={response.isValid} />}
                        label="Valide"
                        className="ml-2"
                      />
                      <Button
                        variant="outlined"
                        color="primary"
                        className="ml-2"
                      >
                        Modifier
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        className="ml-2"
                      >
                        Supprimer
                      </Button>
                    </ListItem>
                  ))}
                </List>
                <Button
                  variant="contained"
                  color="primary"
                  className="mt-2"
                  onClick={() => {
                    setCurrentQuestionId(question.id);
                  }}
                >
                  Ajouter une Réponse
                </Button>
              </div>
            ))}
          </List>
          <Button variant="contained" color="primary" className="mt-4">
            Ajouter une Question
          </Button>
        </form>
      </Layout>
    );
  }
}
