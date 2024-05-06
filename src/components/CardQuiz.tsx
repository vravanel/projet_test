import { Card, CardFooter, CardBody, Button, Link } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";

interface props {
  title: string;
  icon: IconDefinition;
  id: string;
}

const CardQuiz: React.FC<props> = ({ title, icon, id }) => {
  return (
    <Card radius="lg" className="border-none bg-primary mx-4 my-4 card-quiz ">
      <div className="flex justify-end mr-5 mt-3">
        <FontAwesomeIcon className="text-white" icon={faStar} />
      </div>
      <CardBody className="quiz-card-body">
        <FontAwesomeIcon className="" icon={icon} size="3x" />
      </CardBody>
      <CardFooter className="justify-center before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <Link href={`/quiz/${id}`} size="md" className="text-black">
          {title}
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CardQuiz;
