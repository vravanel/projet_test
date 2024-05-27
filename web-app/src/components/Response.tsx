import React, { useState } from "react";
import { Button, ButtonGroup } from "@mui/material";

interface Props {
  reponse: string;
}

const Response: React.FC<Props> = ({ reponse }) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleClick = (reponse: string) => {
    setSelectedValue(reponse);
  };

  return (
    <ButtonGroup
      variant="contained"
      aria-label="outlined primary button group"
      sx={{ marginTop: "8px" }}
    >
      <Button
        onClick={() => handleClick(reponse)}
        sx={{
          bgcolor: selectedValue === reponse ? "#38369A" : "#F8F7F4",
          color: selectedValue === reponse ? "#F8F7F4" : "#38369A",
          boxShadow: 1,
          borderRadius: 8,
          p: 2,
          m: 1,
          width: "200px",
          height: "50px",
          "&:hover": {
            bgcolor: selectedValue === reponse ? "#271f75" : "#c7c7c7",
            color: "#FFFFFF",
          },
        }}
      >
        {reponse}
      </Button>
    </ButtonGroup>
  );
};

export default Response;
