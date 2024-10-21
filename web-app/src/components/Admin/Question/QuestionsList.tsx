import {
  Grid,
  Typography,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  CardActions,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import {
  GetReponsesByQuestionIdQuery,
  NewQuestionMutation,
  NewQuestionMutationVariables,
} from "@/gql/graphql";
import { GET_QUESTIONS_BY_QUIZ } from "@/pages/quiz/[id]";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ResponsesList from "../Responses/ResponsesList";

const ADD_QUESTION = gql`
  mutation NewQuestion($title: String!, $quizId: String!) {
    newQuestion(title: $title, quizId: $quizId) {
      id
      title
    }
  }
`;

const DELETE_QUESTION = gql`
  mutation DeleteQuestion($deleteQuestionId: ID!) {
    deleteQuestion(id: $deleteQuestionId) {
      id
    }
  }
`;

const GET_REPONSES_BY_QUESTION = gql`
  query GetReponsesByQuestionId($questionId: String!) {
    getReponsesByQuestionId(questionId: $questionId) {
      id
      title
      isValid
    }
  }
`;

export default function AddQuestion() {
  const router = useRouter();
  const { id } = router.query;
  const [isClick, setIsClick] = useState<boolean>(false);

  const [newQuestion, setNewQuestion] = useState<NewQuestionMutationVariables>({
    title: "",
    quizId: "",
  });

  const [deleteQuestion] = useMutation(DELETE_QUESTION);

  const { data, refetch } = useQuery(GET_QUESTIONS_BY_QUIZ, {
    variables: {
      getQuestionsByQuizId: id,
    },
  });

  const [getReponsesByQuestionId, { data: responses }] =
    useLazyQuery<GetReponsesByQuestionIdQuery>(GET_REPONSES_BY_QUESTION);

  const handleReponse = (id: string) => {
    getReponsesByQuestionId({ variables: { questionId: id } });
  };

  useEffect(() => {
    if (data?.getQuestionsByQuiz) {
      data.getQuestionsByQuiz.forEach((question) => {
        handleReponse(question.id);
      });
    }
  }, [data]);

  useEffect(() => {
    if (id) {
      setNewQuestion((prevState: any) => ({
        ...prevState,
        quizId: id,
      }));
    }
  }, [id]);

  function handleQuestionChange(e: any) {
    const { name, value } = e.target;
    setNewQuestion((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const [createQuestion] = useMutation<
    NewQuestionMutation,
    NewQuestionMutationVariables
  >(ADD_QUESTION);

  const createNewQuestion = async () => {
    try {
      const { data } = await createQuestion({
        variables: {
          title: newQuestion.title,
          quizId: newQuestion.quizId,
        },
      });
      if (data) {
        refetch();
      }
    } catch (error) {
      console.error("Error Question : ", error);
    }
  };

  const handleSubmit = () => {
    createNewQuestion();
  };

  const handleDelete = async (questionId: string) => {
    try {
      await deleteQuestion({
        variables: {
          deleteQuestionId: questionId,
        },
      });
    } catch (error) {
      console.error("Error deleting question:", error);
      await refetch();
    }
  };

  const handleDeleteResponse = async (responseId: string) => {
// a faire
  };

  return (
    <>
      <Typography variant="h2" fontSize="2rem">
        Ajouter des questions
      </Typography>

      <Button aria-label="increase" onClick={() => setIsClick(true)}>
        <AddIcon fontSize="small" />
      </Button>

      {isClick === true && (
        <>
          <TextField
            name="title"
            required
            id="outlined-required"
            label="Titre"
            placeholder="test"
            onChange={handleQuestionChange}
          />
          <Button aria-label="increase" onClick={handleSubmit}>
            <CheckIcon fontSize="small" />
          </Button>
          <Button aria-label="increase" onClick={() => setIsClick(false)}>
            <CloseIcon fontSize="small" />
          </Button>
        </>
      )}

      <Grid container spacing={2}>
        {data?.getQuestionsByQuiz.map((question) => (
          <Grid item xs={12} key={question.id}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" component="div">
                  {question.title}
                </Typography>
                <ResponsesList
                  questionId={question.id}
                  handleDeleteResponse={handleDeleteResponse}
                />
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  startIcon={<AddIcon />}
                  onClick={() => setIsClick(true)}
                >
                  Ajouter une réponse
                </Button>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDelete(question.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}