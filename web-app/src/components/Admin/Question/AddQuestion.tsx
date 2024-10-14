import { Grid, Typography, Button, TextField, List, ListItem, ListItemText } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { NewQuestionMutation, NewQuestionMutationVariables } from "@/gql/graphql";
import { GET_QUESTIONS_BY_QUIZ } from "@/pages/quiz/[id]";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from "@mui/icons-material/Delete"

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
`

export default function AddQuestion() {
    const router = useRouter();
    const { id } = router.query;
  const [isClick, setIsClick] = useState<boolean>(false);

  const [newQuestion, setNewQuestion] = useState<NewQuestionMutationVariables>({
    title : "",
    quizId: "",
  })

  const [deleteQuestion] = useMutation(DELETE_QUESTION);

  const { data, refetch } = useQuery(GET_QUESTIONS_BY_QUIZ, {
    variables: {
      getQuestionsByQuizId: id,
    },
  });

  useEffect(() => {
    if (id) {
        setNewQuestion((prevState: any) => ({
            ...prevState,
            quizId : id
    }))
  }
}, [id]);

  function handleQuestionChange(e: any) {
    const {name, value} = e.target;
    setNewQuestion((prevState: any) => ({
        ...prevState,
        [name] : value
    }));
  }

  const [createQuestion] = useMutation< NewQuestionMutation, NewQuestionMutationVariables>(ADD_QUESTION);

  const createNewQuestion = async () => {
    try {
        const { data } = await createQuestion({
            variables : {
                title : newQuestion.title,
                quizId : newQuestion.quizId
            },
        });
        if (data) {
           refetch();
        }
    } catch (error) {
        console.error("Error Question : ", error);
    }
  }

  const handleSubmit = () => {
    createNewQuestion();
  }

  const handleDelete = async (questionId : string) => {
    try {
      await deleteQuestion({
       variables: {
         deleteQuestionId : questionId
       },
      });
    } catch (error) {
      console.error("Error deleting question:", error);
      await refetch();
    }
  }

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
       <Grid item xs={12} md={6}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Les questions
          </Typography>
         
            <List>
                {data?.getQuestionsByQuiz.map((question) => (
                <ListItem
                key={question.id}
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(question.id)}>
                      <DeleteIcon  />
                    </IconButton>
                  }
                >
                  <ListItemText
                    primary={question.title}
                  />
                </ListItem>
                ))}
            </List>
        </Grid>
    </>
  );
}
