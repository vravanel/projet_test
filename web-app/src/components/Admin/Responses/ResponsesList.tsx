import {
    List,
    ListItem,
    ListItemText,
    IconButton,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
  } from "@mui/material";
  import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
  import DeleteIcon from "@mui/icons-material/Delete";
  import { gql, useLazyQuery } from "@apollo/client";
  import { useEffect } from "react";
  
  const GET_REPONSES_BY_QUESTION = gql`
    query GetReponsesByQuestionId($questionId: String!) {
      getReponsesByQuestionId(questionId: $questionId) {
        id
        title
        isValid
      }
    }
  `;
  
  type ResponsesListProps = {
    questionId: string;
    handleDeleteResponse: (id: string) => void;
  };
  
  export default function ResponsesList({ questionId, handleDeleteResponse }: ResponsesListProps) {
    const [getReponsesByQuestionId, { data: responses }] =
      useLazyQuery(GET_REPONSES_BY_QUESTION);
  
    useEffect(() => {
      if (questionId) {
        getReponsesByQuestionId({ variables: { questionId } });
      }
    }, [questionId, getReponsesByQuestionId]);
  
    return (
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Voir les réponses</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {responses?.getReponsesByQuestionId.map((response) => (
              <ListItem key={response.id}>
                <ListItemText
                  primary={response.title}
                  secondary={response.isValid ? "Correcte" : "Incorrecte"}
                />
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDeleteResponse(response.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>
    );
  }
  