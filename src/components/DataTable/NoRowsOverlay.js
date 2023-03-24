import { Box } from "@mui/material";
import React from "react";
import styled from "styled-components";

const StyledGridOverlay = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
}));

const NoRowsOverlay = () => {
  return (
    <StyledGridOverlay>
      <Box sx={{ mt: 1 }}>Sin datos</Box>
    </StyledGridOverlay>
  );
};

export default NoRowsOverlay;
