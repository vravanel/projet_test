import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";
import Link from "next/link";

interface Props {
  title: string;
  id: string;
}

const CardQuiz: React.FC<Props> = ({ title, id }) => {
  return (
    <Link
      href={`quiz/${id}`}
      className="block  max-w-sm mx-auto transition-transform transform hover:-translate-y-1 duration-200"
    >
      <Card className="rounded-xl bg-[#F5EE9E] shadow-lg hover:shadow-xl">
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions></CardActions>
      </Card>
    </Link>
  );
};

export default CardQuiz;
