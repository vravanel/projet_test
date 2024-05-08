import { useEffect, useState } from "react";
import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface TimerProps {
  resetTimer: boolean;
  onTimeFinish: () => void;
}

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number }
) {
  const startValue = (props.value / 30) * 100;
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        {...props}
        size="6rem"
        value={startValue}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
          fontSize="2rem"
        >{`${Math.round(props.value)}`}</Typography>
      </Box>
    </Box>
  );
}

const Timer: React.FC<TimerProps> = ({ resetTimer, onTimeFinish }) => {
  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds === 0) {
          clearInterval(interval);
          onTimeFinish();
          return 0;
        } else {
          return prevSeconds - 1;
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [resetTimer, onTimeFinish]);

  useEffect(() => {
    if (resetTimer) {
      setSeconds(30);
    }
  }, [resetTimer]);

  return <CircularProgressWithLabel value={seconds} />;
};
export default Timer;
