import {
  TextField,
  Typography,
  Stack,
  Button,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import Layout from "@/components/Admin/Layout";
import { useEffect, useState } from "react";
import {
  GetQuizQuery,
  GetCategoriesQuery,
  UpdateQuizMutationVariables,
  UpdateQuizMutation,
} from "@/gql/graphql";
import { GET_CATEGORIES } from "@/pages/quiz";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { GET_ALL_QUIZ } from "@/components/Admin/QuizTable";
import AddQuestion from "@/components/Admin/Question/AddQuestion";

const UPDATE_QUIZ = gql`
  mutation UpdateQuiz(
    $title: String!
    $description: String!
    $isFinish: Boolean!
    $difficulty: String!
    $image: String!
    $categoryId: String!
    $updateQuizId: ID!
  ) {
    updateQuiz(
      title: $title
      description: $description
      isFinish: $isFinish
      difficulty: $difficulty
      image: $image
      categoryId: $categoryId
      id: $updateQuizId
    ) {
      description
      difficulty
      id
      image
      title
      category {
        name
      }
    }
  }
`;

const GET_QUIZ = gql`
  query GetQuiz($getQuizId: ID!) {
    getQuiz(id: $getQuizId) {
      description
      difficulty
      id
      image
      isFinish
      title
      category {
        name
        id
      }
    }
  }
`;

const DELETE_QUIZ = gql`
  mutation DeleteQuiz($deleteQuizId: ID!) {
    deleteQuiz(id: $deleteQuizId) {
      id
    }
  }
`;

export default function Quiz() {
  const router = useRouter();
  const { id } = router.query;
  const { data, refetch } = useQuery(GET_QUIZ, {
    variables: {
      getQuizId: id,
    },
  });
  const { data: dataCategories } = useQuery<GetCategoriesQuery>(GET_CATEGORIES);

  const [category, setCategory] = useState<string>("");
  const [deleteQuiz] = useMutation(DELETE_QUIZ);

  const [updateQuiz, setUpdateQuiz] = useState<UpdateQuizMutationVariables>({
    title: "",
    description: "",
    isFinish: false,
    difficulty: "",
    categoryId: "",
    image: "",
    updateQuizId: "",
  });

  useEffect(() => {
    if (data) {
      const { getQuiz: quiz } = data;
      setUpdateQuiz((prevState: any) => ({
        ...prevState,
        title: quiz.title,
        description: quiz.description,
        isFinish: false,
        difficulty: quiz.difficulty,
        categoryId: quiz.category.id,
        image: quiz.image,
        updateQuizId: quiz.id,
      }));
      setCategory(quiz.category.id);
    }
  }, [data]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUpdateQuiz((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangeSelect = (event: SelectChangeEvent) => {
    const { value } = event.target;
    setCategory(value);
    setUpdateQuiz((prevState) => ({
      ...prevState,
      categoryId: value,
    }));
  };
  const [modifyQuiz] = useMutation<
    UpdateQuizMutation,
    UpdateQuizMutationVariables
  >(UPDATE_QUIZ);
  const modifyNewQuiz = async () => {
    try {
      const { data: dataQuiz } = await modifyQuiz({
        variables: updateQuiz,
      });
      if (dataQuiz) {
        router.push(`/admin/quiz`);
      }
    } catch (error) {
      console.error("Error Quiz : ", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteQuiz({
        variables: {
          deleteQuizId: data.getQuiz.id,
        },
        refetchQueries: [{ query: GET_ALL_QUIZ }],
      });
      router.push("/admin/quiz");
    } catch (error) {
      console.error("Error Quiz :", error);
    }
  };

  const handleSubmit = () => {
    modifyNewQuiz();
  };

  if (!data) {
    return <div>Chargement...</div>;
  }

  if (!data) {
    return <div>Chargement...</div>;
  }

  return (
    <Layout>
      <Typography variant="h4" className="text-2xl font-bold mb-4">
        Gestion du Quiz
      </Typography>

      <form className="space-y-4">
        <TextField
          id="quiz-title"
          name="title"
          fullWidth
          variant="outlined"
          className="mb-4"
          value={updateQuiz.title}
          onChange={handleChange}
        />
        <TextField
          id="quiz-description"
          multiline
          name="description"
          rows={4}
          fullWidth
          variant="outlined"
          className="mb-4"
          value={updateQuiz.description}
          onChange={handleChange}
        />
        <TextField
          id="quiz-difficulty"
          fullWidth
          name="difficulty"
          variant="outlined"
          className="mb-4"
          value={updateQuiz.difficulty}
          onChange={handleChange}
        />
        <Stack direction="row" marginTop="2rem">
          <Stack direction="column" width="25%">
            <InputLabel id="demo-simple-select-label">Catégories</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              name="categoryId"
              label="Category"
              onChange={handleChangeSelect}
            >
              {dataCategories?.getCategories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </Stack>
          <Stack direction="column" marginLeft="2rem">
            <InputLabel id="demo-simple-select-label" className="mb-2">
              Upload Image
            </InputLabel>
            <TextField
              required
              name="image"
              id="outlined-required"
              value={updateQuiz.image}
              onChange={handleChange}
            />
          </Stack>
        </Stack>

        <Button
          variant="contained"
          color="primary"
          className="mt-4"
          onClick={handleSubmit}
        >
          Modifier le Quiz
        </Button>
        <Button
          variant="contained"
          color="primary"
          className="mt-4"
          onClick={handleDelete}
        >
          Supprimer le Quiz
        </Button>
      </form>
        <AddQuestion />
    </Layout>
  );
}
