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
import Link from "next/link";
import { GetCategoriesQuery } from "@/gql/graphql";

const GET_ALL_CATEGORIES = gql`
query GetCategories {
  getCategories {
    id
    name
  }
}
`;

interface Column {
  id: "id" | "name";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

export default function CategoryTable() {
  const { data } = useQuery<GetCategoriesQuery>(GET_ALL_CATEGORIES);

  const columns: readonly Column[] = [
    { id: "id", label: "ID", minWidth: 100 },
    { id: "name", label: "name", minWidth: 150 },
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
            {data?.getCategories
              .slice(page * dataPerPage, page * dataPerPage + dataPerPage)
              .map((category) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={category.id}>
                    {columns.map((column) => {
                      const value = category[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          <Link href={`/admin/category/${category.id}`}>
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
          count={data.getCategories.length}
          rowsPerPage={dataPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Paper>
  );
}
