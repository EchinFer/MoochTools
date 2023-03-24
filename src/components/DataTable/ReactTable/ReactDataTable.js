import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  useFilters,
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import {
  DefaultColumnFilter,
  GlobalFilter,
  fuzzyTextFilterFn,
} from "./components/Filters";
import { useEffect, useMemo, useState } from "react";
import Pagination from "./components/Pagination";

fuzzyTextFilterFn.autoRemove = (val) => !val;

const ReactDataTable = ({ columns, data, onChangePag, pagination }) => {

  const { page:pageNumber, sizePerPage, totalSize } = pagination;

  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5)

  const filterTypes = useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const defaultColumn = useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const {
    //Estructura
    getTableProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    //Filtros
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
    //Paginacion
    pageOptions,
    page,
    gotoPage,
    previousPage,
    nextPage,
    // setPageSize,
    canPreviousPage,
    canNextPage,
  } = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  // const { pageIndex, pageSize } = state;

  const handleOnChangePage = (newPageIndex) => {

    setPageIndex(newPageIndex);
    onChangePage(pageIndex, pageSize);
  };

  return (
    <TableContainer component={Paper}>
      <Table {...getTableProps()}>
        <TableHead>
          <TableRow>
            <TableCell colSpan={visibleColumns.length} align="left">
              <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
            </TableCell>
          </TableRow>
          {headerGroups.map((headerGroup, i) => (
            <TableRow key={i} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableCell
                  {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    +{" "}
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                    +{" "}
                  </span>
                </TableCell>
              ))}
            </TableRow>
          ))}
          {headerGroups.map((headerGroup, i) => (
            <TableRow key={i}>
              {headerGroup.headers.map((column, i) => (
                <TableCell key={i}>
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <TableCell {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <Pagination
              previousPage={previousPage}
              nextPage={nextPage}
              pageIndex={pageIndex}
              pageOptions={pageOptions}
              gotoPage={gotoPage}
              setPageSize={setPageSize}
              canPreviousPage={canPreviousPage}
              canNextPage={canNextPage}
              pageSize={pageSize}
              rows={rows}
              onChangePage={handleOnChangePage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};
export default ReactDataTable;
