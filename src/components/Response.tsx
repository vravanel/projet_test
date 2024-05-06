import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Grid } from "@mui/material";
import { useState } from "react";

export default function CheckboxLabels() {
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
        label="Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression"
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
}
