import React from "react";
import { Box, Typography } from "@mui/material";

interface Props {
  question: string;
}

export const Question: React.FC<Props> = ({ question }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      mt={5}
      p={3}
      borderRadius={2}
      border={2}
      borderColor="#38369A"
      bgcolor="#F8F7F4"
      sx={{
        boxShadow: 3,
        maxWidth: 600,
      }}
    >
      <Typography variant="h5" color="#38369A" align="center">
        {question}
      </Typography>
    </Box>
  );
};

export default Question;
