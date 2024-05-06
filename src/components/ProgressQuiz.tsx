import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

interface props {
  number: number;
}

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));

const ProgressQuiz: React.FC<props> = ({ number }) => {
  return (
    <Stack spacing={2} sx={{ flexGrow: 1 }}>
      <br />
      <BorderLinearProgress variant="determinate" value={number} />
    </Stack>
  );
};

export default ProgressQuiz;
