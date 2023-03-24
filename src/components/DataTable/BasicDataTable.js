import { LinearProgress, Stack } from "@mui/material";
import { DataGrid, GridRow, GridColumnHeaders } from "@mui/x-data-grid";
import { memo } from "react";
import NoRowsOverlay from "./NoRowsOverlay";
const BasicDataTable = memo(({ rows, columns, loadingData }) => {
  const MemoizedRow = memo(GridRow);
  // const MemoizedColumnsHeader = memo(GridColumnHeaders);
  return (
    <Stack sx={{ height: 500 }}>
      <DataGrid
        components={{
          NoRowsOverlay: NoRowsOverlay
        }}
        slots={{
          loadingOverlay: LinearProgress,
          row: MemoizedRow,
        }}
        rows={rows}
        columns={columns}
        loading={loadingData}
        autoPageSize
        pagination
      />
    </Stack>
  );
});

export default BasicDataTable;
