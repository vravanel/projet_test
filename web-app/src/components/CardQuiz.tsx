import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions, Chip } from "@mui/material";
import Link from "next/link";

interface Props {
  title: string;
  id: string;
  difficulty: string;
  description: string;
}

const CardQuiz: React.FC<Props> = ({ title, id, difficulty, description }) => {
  return (
    <Link
      href={`quiz/${id}`}
      className="block  max-w-sm mx-auto transition-transform transform hover:-translate-y-1 duration-200"
    >
      <Card className="rounded-xl bg-[#F5EE9E] shadow-lg hover:shadow-xl">
        <CardActionArea>
          <Chip label={difficulty} color="secondary" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2">{description}</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions></CardActions>
      </Card>
    </Link>
  );
};

export default CardQuiz;
