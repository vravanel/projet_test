import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { gql, useQuery } from "@apollo/client";
import { GetAllQuizQuery } from "@/gql/graphql";
import Link from "next/link";

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

interface Column {
  id: "id" | "title" | "description" | "difficulty";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

export default function QuizTable() {
  const { data } = useQuery<GetAllQuizQuery>(GET_ALL_QUIZ);

  const columns: readonly Column[] = [
    { id: "id", label: "ID", minWidth: 100 },
    { id: "title", label: "Title", minWidth: 150 },
    {
      id: "description",
      label: "Description",
      minWidth: 150,
      align: "left",
    },
    {
      id: "difficulty",
      label: "Difficulty",
      minWidth: 150,
      align: "right",
    },
  ];

  const [page, setPage] = React.useState(0);
  const [dataPerPage, setDataPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDataPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.getAllQuiz
              .slice(page * dataPerPage, page * dataPerPage + dataPerPage)
              .map((quiz) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={quiz.id}>
                    {columns.map((column) => {
                      const value = quiz[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          <Link href={`/admin/quiz/${quiz.id}`}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </Link>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {data && (
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={data.getAllQuiz.length}
          rowsPerPage={dataPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Paper>
  );
}
