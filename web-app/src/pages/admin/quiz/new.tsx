import Layout from "@/components/Admin/Layout";
import { TextField, MenuItem, InputLabel, Button, Stack } from "@mui/material";
import { useState } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { GET_CATEGORIES } from "@/pages/quiz";
import { useMutation, useQuery } from "@apollo/client";
import {
  GetCategoriesQuery,
  NewQuizMutation,
  NewQuizMutationVariables,
} from "@/gql/graphql";
import { gql } from "@apollo/client";
import { useRouter } from "next/router";

const CREATE_QUIZ = gql`
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

export default function NewQuiz() {
  const router = useRouter();
  const [category, setCategory] = useState("");
  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

  const [newQuiz, setNewQuiz] = useState<NewQuizMutationVariables>({
    title: "",
    difficulty: "",
    description: "",
    isFinish: false,
    image: "",
    categoryId: "",
  });

  function handleQuizChange(e: any) {
    const { name, value } = e.target;
    setNewQuiz((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const handleSelectChange = (event: SelectChangeEvent) => {
    handleChange(event);
    handleQuizChange(event);
  };

  const [createQuiz] = useMutation<NewQuizMutation, NewQuizMutationVariables>(
    CREATE_QUIZ
  );
  const createNewQuiz = async () => {
    try {
      const { data } = await createQuiz({
        variables: {
          description: newQuiz.description,
          title: newQuiz.title,
          difficulty: newQuiz.difficulty,
          image: newQuiz.image,
          isFinish: false,
          categoryId: newQuiz.categoryId,
        },
      });
      if (data) {
        router.push("/admin/quiz");
      }
    } catch (error) {
      console.error("Error Quiz : ", error);
    }
  };

  const handleSubmit = () => {
    createNewQuiz();
  };

  const { data } = useQuery<GetCategoriesQuery>(GET_CATEGORIES);
  return (
    <Layout>
      <h1>test</h1>
      <form>
        <Stack direction="row" marginTop="2rem">
          <TextField
            name="title"
            required
            id="outlined-required"
            label="Titre"
            defaultValue="Hello World"
            onChange={handleQuizChange}
          />
          <TextField
            required
            name="difficulty"
            id="outlined-required"
            label="Difficulté"
            defaultValue="Hello World"
            className="ml-5"
            onChange={handleQuizChange}
          />
        </Stack>
        <Stack direction="row" marginTop="2rem">
          <Stack direction="column" width="25%">
            <InputLabel id="demo-simple-select-label">Catégories</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              name="categoryId"
              label="Category"
              onChange={handleSelectChange}
            >
              {data?.getCategories.map((category) => (
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
              defaultValue="Hello World"
              onChange={handleQuizChange}
            />
          </Stack>
        </Stack>
        <TextField
          id="outlined-multiline-static"
          label="Description"
          name="description"
          multiline
          rows={4}
          defaultValue="Default Value"
          onChange={handleQuizChange}
        />
        <Button variant="contained" onClick={handleSubmit}>
          Ajouter le nouveau Quiz
        </Button>
      </form>
    </Layout>
  );
}
