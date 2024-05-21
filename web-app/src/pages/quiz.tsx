import CardQuiz from "@/components/CardQuiz";
import Category from "@/components/Category";
import { GetCategoriesQuery } from "@/gql/graphql";
import { gql, useQuery } from "@apollo/client";

const GET_CATEGORIES = gql`
  query getCategories {
    getCategories {
      id
      name
    }
  }
`;

export default function Quiz() {
  const { data } = useQuery<GetCategoriesQuery>(GET_CATEGORIES);
  return (
    <div>
      <div className="flex justify-center mb-12">
        {data &&
          data?.getCategories.map((category) => (
            <Category key={category.id} title={category.name} />
          ))}
      </div>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <CardQuiz title="Quiz 1" id="1" />
        <CardQuiz title="Quiz 2" id="2" />
        <CardQuiz title="Quiz 3" id="3" />
        <CardQuiz title="Quiz 4" id="4" />
        <CardQuiz title="Quiz 5" id="5" />
        <CardQuiz title="Quiz 6" id="6" />
      </div>
    </div>
  );
}
