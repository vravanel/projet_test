import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Grid } from "@mui/material";
import { useState } from "react";

interface props {
  reponse: string;
}

const Response: React.FC<props> = ({ reponse }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheck = (e: { target: { checked: any } }) => {
    if (e.target.checked) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  };

  return (
    <Grid item xs={6}>
      <FormControlLabel
        control={<Checkbox onChange={handleCheck} />}
        label={reponse}
        className={isChecked ? "checked text-label" : "text-label"}
        labelPlacement="start"
        sx={{
          bgcolor: "background.paper",
          boxShadow: 1,
          borderRadius: 2,
          p: 2,
          width: "90%",
        }}
      />
    </Grid>
  );
};
export default Response;
