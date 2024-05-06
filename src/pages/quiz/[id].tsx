import NavBar from "@/components/Navbar";
import Question from "@/components/Question";
import Response from "@/components/Response";
import ProgressQuiz from "@/components/ProgressQuiz";
import Timer from "@/components/Timer";
import FormGroup from "@mui/material/FormGroup";
import { Grid, Button } from "@mui/material";

export default function Quiz() {
  const responses = [];
  for (let i = 0; i < 4; i++) {
    responses.push(<Response key={i} />);
  }
  return (
    <>
      <NavBar />
      <div className="flex justify-end mt-10 mr-20">
        <Timer />
      </div>
      <Question question="Une superbe question" />
      <ProgressQuiz number={5} />
      <div className="flex justify-center mt-20">
        <FormGroup>
          <Grid
            container
            rowSpacing={6}
            columnSpacing={{ xs: 2, sm: 4, md: 6 }}
          >
            {responses}
          </Grid>
        </FormGroup>
      </div>
      <div className="flex justify-end mt-10 mr-20">
        <Button variant="contained">Suivant</Button>
      </div>
    </>
  );
}
