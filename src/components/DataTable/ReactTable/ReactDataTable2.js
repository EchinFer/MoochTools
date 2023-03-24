import { useCallback, useMemo, useRef, useState } from "react";
import {
  Paper,
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
import { DefaultColumnFilter, GlobalFilter } from "./components/Filters";
import Pagination from "./components/Pagination";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Table from "./components/Table";

const ReactDataTable2 = (props) => {
  const columns = useMemo(
    () => [
      {
        Header: "Status",
        accessor: "published",
        Filter: DefaultColumnFilter,
        filter: "equal",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Filter: DefaultColumnFilter,
        filter: "includes",
      },
      {
        Header: "ID",
        accessor: "id",
        Filter: DefaultColumnFilter,
        filter: "equals",
        Value: "",
      },
      {
        Header: "Nombre",
        accessor: "nombre",
        Filter: DefaultColumnFilter,
        filter: "equals",
        Value: "",
      },
      {
        Header: "Apellido",
        accessor: "apellido",
        Filter: DefaultColumnFilter,
        filter: "equals",
        Value: "",
      },
      {
        Header: "Username",
        accessor: "username",
        Filter: DefaultColumnFilter,
        filter: "equals",
        Value: "",
      },
      {
        Header: "Email",
        accessor: "email",
        Filter: DefaultColumnFilter,
        filter: "equals",
        Value: "",
      },
      {
        Header: "Telefono",
        accessor: "telefono",
        Filter: DefaultColumnFilter,
        filter: "equals",
        Value: "",
      },
      {
        Header: "Fecha nacimiento",
        accessor: "f_nac",
        Filter: DefaultColumnFilter,
        filter: "equals",
        Value: "",
      },
    ],
    []
  );
  // We'll start our table without any data
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const fetchIdRef = useRef(0);

  const fetchData = useCallback(async ({ pageSize, pageIndex }) => {
    // This will get called when the table needs new data
    // You could fetch your data from literally anywhere,
    // even a server. But for this example, we'll just fake it.

    // Give this fetch an ID
    const fetchId = ++fetchIdRef.current;

    // Set the loading state
    setLoading(true);
    const respTotalData = await axios.post(
      `${process.env.REACT_APP_API_URL}/listas`,
      {
        limite: pageSize,
        salto: pageIndex + 1,
        contar: true,
        operacion: "ver_usuarios",
        sortField: "id",
        sortOrder: null,
        id: "",
        nombre: "",
        apellido: "",
        username: "",
        email: "",
        telefono: "",
        f_nac: "",
      }
    );

    const respData = await axios.post(
      `${process.env.REACT_APP_API_URL}/listas`,
      {
        limite: pageSize,
        salto: pageIndex + 1,
        contar: false,
        operacion: "ver_usuarios",
        sortField: "id",
        sortOrder: null,
        id: "",
        nombre: "",
        apellido: "",
        username: "",
        email: "",
        telefono: "",
        f_nac: "",
      }
    );

    // Only update the data if this is the latest fetch
    if (fetchId === fetchIdRef.current) {
      const startRow = pageSize * pageIndex;
      const endRow = startRow + pageSize;

      console.log(respData.data);
      setData(respData.data);

      // Your server could send back total page count.
      // For now we'll just fake it, too
      setPageCount(Math.ceil(respTotalData.data / pageSize));
      setTotalCount(respTotalData.data);

      setLoading(false);
    }
  }, []);

  return (
    <Table
      columns={columns}
      data={data}
      fetchData={fetchData}
      loading={loading}
      pageCount={pageCount}
      totalCount={totalCount}
    />
  );
};

export default ReactDataTable2;


