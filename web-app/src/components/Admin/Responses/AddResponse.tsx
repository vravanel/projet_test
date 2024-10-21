import {
  Button,
  TextField,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
} from "@mui/material";
import { gql, useMutation } from "@apollo/client";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect } from "react";
import {
  NewResponseMutation,
  NewResponseMutationVariables,
} from "@/gql/graphql";

const NEW_RESPONSE = gql`
mutation NewResponse($title: String!, $isValid: Boolean!, $questionId: String!) {
  newReponse(title: $title, isValid: $isValid, questionId: $questionId) {
    id
    isValid
    title
  }
}
`;

type ResponsesListProps = {
  questionId: string;
};

export default function AddResponse({ questionId, refetch }: ResponsesListProps) {
  const [isClick, setIsClick] = useState<boolean>(false);
  const [newResponse, setNewResponse] = useState<NewResponseMutationVariables>({
    title: "",
    questionId: "",
    isValid: true,
  });

  useEffect(() => {
    if (questionId) {
      setNewResponse((prevState: any) => ({
        ...prevState,
        questionId: questionId,
      }));
    }
  }, [questionId]);

  function handleResponseChange(e: any) {
    const { name, value } = e.target;
    setNewResponse((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleIsValidChange(e: any) {
    const { value } = e.target;
    setNewResponse((prevState: any) => ({
      ...prevState,
      isValid: value === "true" ? true : false,
    }));
  }

  const [createResponse] = useMutation<
    NewResponseMutation,
    NewResponseMutationVariables
  >(NEW_RESPONSE);

  const createNewResponse = async () => {
    try {
      const { data } = await createResponse({
        variables:  {
            title: newResponse.title,
            questionId: newResponse.questionId,
            isValid: !!newResponse.isValid,
          },
      }); 
    } catch (error) {
      console.error("Error Response : ", error);
    }
  };

  const handleSubmit = () => {
    createNewResponse();
  };


  return (
    <>
      <Button
        size="small"
        startIcon={<AddIcon />}
        onClick={() => setIsClick(true)}
      >
        Ajouter une réponse
      </Button>
      {isClick === true && (
        <>
          <TextField
            name="title"
            required
            id="outlined-required"
            label="Titre"
            placeholder="test"
            onChange={handleResponseChange}
          />
          <FormControl>
            <FormLabel>Réponse Correcte ?</FormLabel>
            <RadioGroup
              row
              name="isValid"
              onChange={handleIsValidChange}
              value={newResponse.isValid ? "true" : "false"}
            >
              <FormControlLabel
                value="true"
                control={<Radio />}
                label="Correcte"
              />
              <FormControlLabel
                value="false"
                control={<Radio />}
                label="Incorrecte"
              />
            </RadioGroup>
          </FormControl>
          <Button aria-label="increase" onClick={handleSubmit}>
            <CheckIcon fontSize="small" />
          </Button>
          <Button aria-label="increase" onClick={() => setIsClick(false)}>
            <CloseIcon fontSize="small" />
          </Button>
        </>
      )}
    </>
  );
}
