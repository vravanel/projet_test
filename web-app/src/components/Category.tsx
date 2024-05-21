import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/router";

interface Props {
  title: string;
}

const Category: React.FC<Props> = ({ title }) => {
  const handleClick = () => {};
  return (
    <Stack direction="row" spacing={1} className="ml-4">
      <Chip label={title} variant="outlined" onClick={handleClick} />
    </Stack>
  );
};

export default Category;
