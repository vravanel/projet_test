import { Slider } from "@nextui-org/react";

interface props {
  number: number;
}

const SliderQuiz: React.FC<props> = ({ number }) => {
  return (
    <div className="flex flex-col gap-6 w-full max-w-md">
      <Slider
        color="danger"
        step={0.01}
        maxValue={1}
        minValue={0}
        defaultValue={0.7}
        aria-label="Temperature"
        className="max-w-md"
      />
    </div>
  );
};

export default SliderQuiz;
