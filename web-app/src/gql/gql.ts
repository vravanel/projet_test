/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\nquery GetCategories {\n  getCategories {\n    id\n    name\n  }\n}\n": types.GetCategoriesDocument,
    "\n  mutation NewQuestion($title: String!, $quizId: String!) {\n    newQuestion(title: $title, quizId: $quizId) {\n      id\n      title\n    }\n  }\n": types.NewQuestionDocument,
    "\n  mutation DeleteQuestion($deleteQuestionId: ID!) {\n    deleteQuestion(id: $deleteQuestionId) {\n      id\n    }\n  }\n": types.DeleteQuestionDocument,
    "\nquery GetReponsesByQuestionId($questionId: String!) {\n  getReponsesByQuestionId(questionId: $questionId) {\n    id\n    title\n    isValid\n  }\n}\n": types.GetReponsesByQuestionIdDocument,
    "\n  query GetAllQuiz {\n    getAllQuiz {\n      id\n      title\n      description\n      isFinish\n      difficulty\n    }\n  }\n": types.GetAllQuizDocument,
    "\nmutation NewCategory($name: String!) {\n  newCategory(name: $name) {\n    id\n    name\n  }\n}\n": types.NewCategoryDocument,
    "\n  mutation UpdateQuiz(\n    $title: String!\n    $description: String!\n    $isFinish: Boolean!\n    $difficulty: String!\n    $image: String!\n    $categoryId: String!\n    $updateQuizId: ID!\n  ) {\n    updateQuiz(\n      title: $title\n      description: $description\n      isFinish: $isFinish\n      difficulty: $difficulty\n      image: $image\n      categoryId: $categoryId\n      id: $updateQuizId\n    ) {\n      description\n      difficulty\n      id\n      image\n      title\n      category {\n        name\n      }\n    }\n  }\n": types.UpdateQuizDocument,
    "\n  query GetQuiz($getQuizId: ID!) {\n    getQuiz(id: $getQuizId) {\n      description\n      difficulty\n      id\n      image\n      isFinish\n      title\n      category {\n        name\n        id\n      }\n    }\n  }\n": types.GetQuizDocument,
    "\n  mutation DeleteQuiz($deleteQuizId: ID!) {\n    deleteQuiz(id: $deleteQuizId) {\n      id\n    }\n  }\n": types.DeleteQuizDocument,
    "\n  mutation NewQuiz(\n    $title: String!\n    $description: String!\n    $difficulty: String!\n    $image: String!\n    $categoryId: String!\n    $isFinish: Boolean!\n  ) {\n    newQuiz(\n      title: $title\n      description: $description\n      difficulty: $difficulty\n      image: $image\n      categoryId: $categoryId\n      isFinish: $isFinish\n    ) {\n      description\n      difficulty\n      id\n      image\n      title\n      isFinish\n    }\n  }\n": types.NewQuizDocument,
    "\n  query getCategories {\n    getCategories {\n      id\n      name\n    }\n  }\n": types.GetCategoriesDocument,
    "\n  query GetQuizByCategory($getQuizByCategoryId: String!) {\n    getQuizByCategory(id: $getQuizByCategoryId) {\n      title\n      description\n      difficulty\n      isFinish\n      id\n    }\n  }\n": types.GetQuizByCategoryDocument,
    "\n  query GetQuestionsByQuiz($getQuestionsByQuizId: String!) {\n    getQuestionsByQuiz(id: $getQuestionsByQuizId) {\n      id\n      title\n      reponses {\n        id\n        isValid\n        title\n      }\n    }\n  }\n": types.GetQuestionsByQuizDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery GetCategories {\n  getCategories {\n    id\n    name\n  }\n}\n"): (typeof documents)["\nquery GetCategories {\n  getCategories {\n    id\n    name\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation NewQuestion($title: String!, $quizId: String!) {\n    newQuestion(title: $title, quizId: $quizId) {\n      id\n      title\n    }\n  }\n"): (typeof documents)["\n  mutation NewQuestion($title: String!, $quizId: String!) {\n    newQuestion(title: $title, quizId: $quizId) {\n      id\n      title\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteQuestion($deleteQuestionId: ID!) {\n    deleteQuestion(id: $deleteQuestionId) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteQuestion($deleteQuestionId: ID!) {\n    deleteQuestion(id: $deleteQuestionId) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery GetReponsesByQuestionId($questionId: String!) {\n  getReponsesByQuestionId(questionId: $questionId) {\n    id\n    title\n    isValid\n  }\n}\n"): (typeof documents)["\nquery GetReponsesByQuestionId($questionId: String!) {\n  getReponsesByQuestionId(questionId: $questionId) {\n    id\n    title\n    isValid\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAllQuiz {\n    getAllQuiz {\n      id\n      title\n      description\n      isFinish\n      difficulty\n    }\n  }\n"): (typeof documents)["\n  query GetAllQuiz {\n    getAllQuiz {\n      id\n      title\n      description\n      isFinish\n      difficulty\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation NewCategory($name: String!) {\n  newCategory(name: $name) {\n    id\n    name\n  }\n}\n"): (typeof documents)["\nmutation NewCategory($name: String!) {\n  newCategory(name: $name) {\n    id\n    name\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateQuiz(\n    $title: String!\n    $description: String!\n    $isFinish: Boolean!\n    $difficulty: String!\n    $image: String!\n    $categoryId: String!\n    $updateQuizId: ID!\n  ) {\n    updateQuiz(\n      title: $title\n      description: $description\n      isFinish: $isFinish\n      difficulty: $difficulty\n      image: $image\n      categoryId: $categoryId\n      id: $updateQuizId\n    ) {\n      description\n      difficulty\n      id\n      image\n      title\n      category {\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateQuiz(\n    $title: String!\n    $description: String!\n    $isFinish: Boolean!\n    $difficulty: String!\n    $image: String!\n    $categoryId: String!\n    $updateQuizId: ID!\n  ) {\n    updateQuiz(\n      title: $title\n      description: $description\n      isFinish: $isFinish\n      difficulty: $difficulty\n      image: $image\n      categoryId: $categoryId\n      id: $updateQuizId\n    ) {\n      description\n      difficulty\n      id\n      image\n      title\n      category {\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetQuiz($getQuizId: ID!) {\n    getQuiz(id: $getQuizId) {\n      description\n      difficulty\n      id\n      image\n      isFinish\n      title\n      category {\n        name\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetQuiz($getQuizId: ID!) {\n    getQuiz(id: $getQuizId) {\n      description\n      difficulty\n      id\n      image\n      isFinish\n      title\n      category {\n        name\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteQuiz($deleteQuizId: ID!) {\n    deleteQuiz(id: $deleteQuizId) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteQuiz($deleteQuizId: ID!) {\n    deleteQuiz(id: $deleteQuizId) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation NewQuiz(\n    $title: String!\n    $description: String!\n    $difficulty: String!\n    $image: String!\n    $categoryId: String!\n    $isFinish: Boolean!\n  ) {\n    newQuiz(\n      title: $title\n      description: $description\n      difficulty: $difficulty\n      image: $image\n      categoryId: $categoryId\n      isFinish: $isFinish\n    ) {\n      description\n      difficulty\n      id\n      image\n      title\n      isFinish\n    }\n  }\n"): (typeof documents)["\n  mutation NewQuiz(\n    $title: String!\n    $description: String!\n    $difficulty: String!\n    $image: String!\n    $categoryId: String!\n    $isFinish: Boolean!\n  ) {\n    newQuiz(\n      title: $title\n      description: $description\n      difficulty: $difficulty\n      image: $image\n      categoryId: $categoryId\n      isFinish: $isFinish\n    ) {\n      description\n      difficulty\n      id\n      image\n      title\n      isFinish\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getCategories {\n    getCategories {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query getCategories {\n    getCategories {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetQuizByCategory($getQuizByCategoryId: String!) {\n    getQuizByCategory(id: $getQuizByCategoryId) {\n      title\n      description\n      difficulty\n      isFinish\n      id\n    }\n  }\n"): (typeof documents)["\n  query GetQuizByCategory($getQuizByCategoryId: String!) {\n    getQuizByCategory(id: $getQuizByCategoryId) {\n      title\n      description\n      difficulty\n      isFinish\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetQuestionsByQuiz($getQuestionsByQuizId: String!) {\n    getQuestionsByQuiz(id: $getQuestionsByQuizId) {\n      id\n      title\n      reponses {\n        id\n        isValid\n        title\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetQuestionsByQuiz($getQuestionsByQuizId: String!) {\n    getQuestionsByQuiz(id: $getQuestionsByQuizId) {\n      id\n      title\n      reponses {\n        id\n        isValid\n        title\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;