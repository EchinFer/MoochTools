import { TablePagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import TablePaginationActions from "./TablePaginationActions";

const pageSizeOptions = [5, 10, 20, 30];
const Pagination = (props) => {
  const {
    gotoPage,
    previousPage,
    nextPage,
    pageIndex,
    setPageSize,
    pageSize,
    totalCount,
    pageCount,
    onChangePage,
  } = props;


  const handleChangePage = (event, newPage, type) => {
    const typePaginationAction = {
      first: () => gotoPage(0),
      back: () => previousPage(),
      next: () => nextPage(),
      last: () => gotoPage(pageCount - 1),
    };

    typePaginationAction[type]();

    onChangePage(newPage, pageSize);
  };

  const handleChangeRowsPerPage = (event) => {
    const newPageSize = parseInt(event.target.value, 10);
    setPageSize(newPageSize);
    console.log("newPageSize ", newPageSize);
  };

  return (
    <>
      <TablePagination
        component="div"
        rowsPerPageOptions={[...pageSizeOptions, { label: "Todos", value: -1 }]}
        count={totalCount}
        rowsPerPage={setPageSize}
        page={pageIndex}
        SelectProps={{
          inputProps: {
            "aria-label": "rows per page",
          },
        }}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        ActionsComponent={TablePaginationActions}
      />
    </>
  );
};

export default Pagination;
