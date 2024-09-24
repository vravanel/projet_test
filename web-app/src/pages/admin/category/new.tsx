import Layout from "@/components/Admin/Layout";
import { TextField, MenuItem, InputLabel, Button, Stack } from "@mui/material";
import { useState } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { GET_CATEGORIES } from "@/pages/quiz";
import { gql, useMutation, useQuery } from "@apollo/client";
import {
  GetCategoriesQuery,
  NewCategoryMutation,
  NewCategoryMutationVariables,
} from "@/gql/graphql";
import { useRouter } from "next/router";

const NEW_CATEGORY = gql `
mutation NewCategory($name: String!) {
  newCategory(name: $name) {
    id
    name
  }
}
`;

export default function NewCategory() {
  const router = useRouter();
  const [category, setCategory] = useState("");
  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

  const [newCategory, setNewCategory] = useState<NewCategoryMutationVariables>({
    name: "",
  });

  function handleCategoryChange(e: any) {
    const { name, value } = e.target;
    setNewCategory((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const [createCategory] = useMutation<NewCategoryMutation, NewCategoryMutationVariables>(
    NEW_CATEGORY
  );
  const createNewCategory = async () => {
    try {
      const { data } = await createCategory({
        variables: {
          name : newCategory.name
        },
      });
      if (data) {
        router.push("/admin/category");
      }
    } catch (error) {
      console.error("Error Category : ", error);
    }
  };

  const handleSubmit = () => {
    createNewCategory();
  };


  return (
    <Layout>
      <h1>Ajouter une nouvelle Catégorie</h1>
      <form>
        <Stack direction="row" marginTop="2rem">
          <TextField
            name="name"
            required
            id="outlined-required"
            label="Nom de la catégorie"
            defaultValue="PHP"
            onChange={handleCategoryChange}
          />
        </Stack>
        <Button variant="contained" onClick={handleSubmit}>
          Ajouter la nouvelle catégorie
        </Button>
      </form>
    </Layout>
  );
}
