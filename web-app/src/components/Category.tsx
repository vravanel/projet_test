import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

interface Props {
  title: string;
  onClick: (value: string) => void;
  id: string;
  isSelected: boolean;
}

const Category: React.FC<Props> = ({ title, id, onClick, isSelected }) => {
  const handleClick = () => {
    onClick(id);
  };

  return (
    <Stack direction="row" spacing={1} className="ml-4">
      <Chip
        label={title}
        variant={isSelected ? "filled" : "outlined"}
        onClick={handleClick}
      />
    </Stack>
  );
};

export default Category;
