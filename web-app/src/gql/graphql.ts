/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  quizz: Array<Quiz>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: User;
  deleteCategory: Category;
  deleteQuestion: Question;
  deleteQuiz: Quiz;
  deleteReponse: Reponse;
  newCategory: Category;
  newQuestion: Question;
  newQuiz: Quiz;
  newReponse: Reponse;
  signIn: User;
  signOut: Scalars['Boolean']['output'];
  updateCategory: Category;
  updateQuestion: Question;
  updateQuiz: Quiz;
  updateReponse: Reponse;
  updateUser: User;
};


export type MutationCreateUserArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  pseudo: Scalars['String']['input'];
  roles?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteQuestionArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteQuizArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteReponseArgs = {
  id: Scalars['ID']['input'];
};


export type MutationNewCategoryArgs = {
  name: Scalars['String']['input'];
};


export type MutationNewQuestionArgs = {
  quizId: Scalars['String']['input'];
  title: Scalars['String']['input'];
};


export type MutationNewQuizArgs = {
  categoryId: Scalars['String']['input'];
  description: Scalars['String']['input'];
  difficulty: Scalars['String']['input'];
  image: Scalars['String']['input'];
  isFinish: Scalars['Boolean']['input'];
  title: Scalars['String']['input'];
};


export type MutationNewReponseArgs = {
  isValid?: InputMaybe<Scalars['Boolean']['input']>;
  questionId: Scalars['String']['input'];
  title: Scalars['String']['input'];
};


export type MutationSignInArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationUpdateCategoryArgs = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};


export type MutationUpdateQuestionArgs = {
  id: Scalars['ID']['input'];
  quizId: Scalars['String']['input'];
  title: Scalars['String']['input'];
};


export type MutationUpdateQuizArgs = {
  categoryId: Scalars['String']['input'];
  description: Scalars['String']['input'];
  difficulty: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  image: Scalars['String']['input'];
  isFinish: Scalars['Boolean']['input'];
  title: Scalars['String']['input'];
};


export type MutationUpdateReponseArgs = {
  id: Scalars['ID']['input'];
  isValid?: InputMaybe<Scalars['Boolean']['input']>;
  questionId: Scalars['String']['input'];
  title: Scalars['String']['input'];
};


export type MutationUpdateUserArgs = {
  email: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  password: Scalars['String']['input'];
  pseudo: Scalars['String']['input'];
  roles?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type Query = {
  __typename?: 'Query';
  getAllQuiz: Array<Quiz>;
  getCategories: Array<Category>;
  getCategory: Category;
  getQuestion: Question;
  getQuestions: Array<Question>;
  getQuestionsByQuiz: Array<Question>;
  getQuiz: Quiz;
  getQuizByCategory: Array<Quiz>;
  getQuizById: Quiz;
  getQuizWithQuestions: Quiz;
  getReponse: Reponse;
  getReponses: Array<Reponse>;
  getRoles: Array<Scalars['String']['output']>;
  myProfile: User;
  user: User;
  users: Array<User>;
};


export type QueryGetCategoryArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetQuestionArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetQuestionsByQuizArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetQuizArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetQuizByCategoryArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetQuizByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetQuizWithQuestionsArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetReponseArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};

export type Question = {
  __typename?: 'Question';
  id: Scalars['ID']['output'];
  quiz: Quiz;
  reponses: Array<Reponse>;
  title: Scalars['String']['output'];
};

export type Quiz = {
  __typename?: 'Quiz';
  category: Category;
  description: Scalars['String']['output'];
  difficulty: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  image: Scalars['String']['output'];
  isFinish: Scalars['Boolean']['output'];
  questions: Array<Question>;
  title: Scalars['String']['output'];
  user: User;
};

export type Reponse = {
  __typename?: 'Reponse';
  id: Scalars['ID']['output'];
  isValid?: Maybe<Scalars['Boolean']['output']>;
  question: Question;
  title: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  hashedPassword: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  pseudo: Scalars['String']['output'];
  quizz: Array<Quiz>;
  roles?: Maybe<Array<Scalars['String']['output']>>;
};

export type GetAllQuizQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllQuizQuery = { __typename?: 'Query', getAllQuiz: Array<{ __typename?: 'Quiz', id: string, title: string, description: string, isFinish: boolean, difficulty: string }> };

export type GetQuizWithQuestionsQueryVariables = Exact<{
  quizId: Scalars['String']['input'];
}>;


export type GetQuizWithQuestionsQuery = { __typename?: 'Query', getQuizWithQuestions: { __typename?: 'Quiz', id: string, title: string, isFinish: boolean, difficulty: string, image: string, description: string, questions: Array<{ __typename?: 'Question', id: string, title: string, reponses: Array<{ __typename?: 'Reponse', id: string, isValid?: boolean | null, title: string }> }> } };

export type UpdateQuestionMutationVariables = Exact<{
  title: Scalars['String']['input'];
  quizId: Scalars['String']['input'];
  updateQuestionId: Scalars['ID']['input'];
}>;


export type UpdateQuestionMutation = { __typename?: 'Mutation', updateQuestion: { __typename?: 'Question', id: string, title: string } };

export type NewQuizMutationVariables = Exact<{
  title: Scalars['String']['input'];
  description: Scalars['String']['input'];
  difficulty: Scalars['String']['input'];
  image: Scalars['String']['input'];
  categoryId: Scalars['String']['input'];
  isFinish: Scalars['Boolean']['input'];
}>;


export type NewQuizMutation = { __typename?: 'Mutation', newQuiz: { __typename?: 'Quiz', description: string, difficulty: string, id: string, image: string, title: string, isFinish: boolean } };

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesQuery = { __typename?: 'Query', getCategories: Array<{ __typename?: 'Category', id: string, name: string }> };

export type GetQuizByCategoryQueryVariables = Exact<{
  getQuizByCategoryId: Scalars['String']['input'];
}>;


export type GetQuizByCategoryQuery = { __typename?: 'Query', getQuizByCategory: Array<{ __typename?: 'Quiz', title: string, description: string, difficulty: string, isFinish: boolean, id: string }> };

export type GetQuestionsByQuizQueryVariables = Exact<{
  getQuestionsByQuizId: Scalars['String']['input'];
}>;


export type GetQuestionsByQuizQuery = { __typename?: 'Query', getQuestionsByQuiz: Array<{ __typename?: 'Question', id: string, title: string, reponses: Array<{ __typename?: 'Reponse', id: string, isValid?: boolean | null, title: string }> }> };


export const GetAllQuizDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllQuiz"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllQuiz"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isFinish"}},{"kind":"Field","name":{"kind":"Name","value":"difficulty"}}]}}]}}]} as unknown as DocumentNode<GetAllQuizQuery, GetAllQuizQueryVariables>;
export const GetQuizWithQuestionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetQuizWithQuestions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"quizId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getQuizWithQuestions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"quizId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"isFinish"}},{"kind":"Field","name":{"kind":"Name","value":"difficulty"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"questions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"reponses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isValid"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetQuizWithQuestionsQuery, GetQuizWithQuestionsQueryVariables>;
export const UpdateQuestionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateQuestion"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"quizId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateQuestionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateQuestion"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"Argument","name":{"kind":"Name","value":"quizId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"quizId"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateQuestionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<UpdateQuestionMutation, UpdateQuestionMutationVariables>;
export const NewQuizDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"NewQuiz"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"difficulty"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"image"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isFinish"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"newQuiz"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"Argument","name":{"kind":"Name","value":"difficulty"},"value":{"kind":"Variable","name":{"kind":"Name","value":"difficulty"}}},{"kind":"Argument","name":{"kind":"Name","value":"image"},"value":{"kind":"Variable","name":{"kind":"Name","value":"image"}}},{"kind":"Argument","name":{"kind":"Name","value":"categoryId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}}},{"kind":"Argument","name":{"kind":"Name","value":"isFinish"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isFinish"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"difficulty"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"isFinish"}}]}}]}}]} as unknown as DocumentNode<NewQuizMutation, NewQuizMutationVariables>;
export const GetCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetCategoriesQuery, GetCategoriesQueryVariables>;
export const GetQuizByCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetQuizByCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"getQuizByCategoryId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getQuizByCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"getQuizByCategoryId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"difficulty"}},{"kind":"Field","name":{"kind":"Name","value":"isFinish"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GetQuizByCategoryQuery, GetQuizByCategoryQueryVariables>;
export const GetQuestionsByQuizDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetQuestionsByQuiz"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"getQuestionsByQuizId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getQuestionsByQuiz"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"getQuestionsByQuizId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"reponses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isValid"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]} as unknown as DocumentNode<GetQuestionsByQuizQuery, GetQuestionsByQuizQueryVariables>;