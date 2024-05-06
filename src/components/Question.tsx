interface props {
  question: string;
}

export const Question: React.FC<props> = ({ question }) => {
  return (
    <div className="flex justify-center ">
      <div className="question border-2 border-rose-600 p-3 rounded-md text-xl">
        {question}
      </div>
    </div>
  );
};

export default Question;
