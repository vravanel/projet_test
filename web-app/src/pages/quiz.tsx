import CardQuiz from "@/components/CardQuiz";
import Category from "@/components/Category";
import {
  GetAllQuizQuery,
  GetCategoriesQuery,
  GetQuizByCategoryQuery,
} from "@/gql/graphql";
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import { useState } from "react";

export const GET_CATEGORIES = gql`
  query getCategories {
    getCategories {
      id
      name
    }
  }
`;

const GET_ALL_QUIZ = gql`
  query GetAllQuiz {
    getAllQuiz {
      id
      title
      description
      isFinish
      difficulty
    }
  }
`;

const GET_QUIZ_BY_CATEGORY = gql`
  query GetQuizByCategory($getQuizByCategoryId: String!) {
    getQuizByCategory(id: $getQuizByCategoryId) {
      title
      description
      difficulty
      isFinish
      id
    }
  }
`;

export default function Quiz() {
  const { data } = useQuery<GetCategoriesQuery>(GET_CATEGORIES);
  const { data: dataQuiz } = useQuery<GetAllQuizQuery>(GET_ALL_QUIZ);
  const [getQuizByCategory, { data: dataQuizByCategory }] =
    useLazyQuery<GetQuizByCategoryQuery>(GET_QUIZ_BY_CATEGORY);
  const [selectedCategory, setSelectedCategory] = useState<string>("0");

  const handleClick = (id: string) => {
    setSelectedCategory(id);
    getQuizByCategory({ variables: { getQuizByCategoryId: id } });
  };

  if (selectedCategory !== "0") {
    return (
      <div>
        <div className="flex justify-center mb-12">
          <Category
            title="Tous"
            onClick={handleClick}
            id="0"
            isSelected={selectedCategory === "0"}
          />
          {data &&
            data?.getCategories.map((category) => (
              <Category
                key={category.id}
                title={category.name}
                onClick={handleClick}
                id={category.id}
                isSelected={selectedCategory === category.id}
              />
            ))}
        </div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {dataQuizByCategory?.getQuizByCategory.map((quiz) => (
            <CardQuiz
              key={quiz.id}
              title={quiz.title}
              id={quiz.id}
              difficulty={quiz.difficulty}
              description={quiz.description}
            />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="flex justify-center mb-12">
          <Category
            title="Tous"
            onClick={handleClick}
            id="0"
            isSelected={selectedCategory === "0"}
          />
          {data &&
            data?.getCategories.map((category) => (
              <Category
                key={category.id}
                title={category.name}
                onClick={handleClick}
                id={category.id}
                isSelected={selectedCategory === category.id}
              />
            ))}
        </div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {dataQuiz?.getAllQuiz.map((quiz) => (
            <CardQuiz
              key={quiz.id}
              title={quiz.title}
              id={quiz.id}
              difficulty={quiz.difficulty}
              description={quiz.description}
            />
          ))}
        </div>
      </div>
    );
  }
}
