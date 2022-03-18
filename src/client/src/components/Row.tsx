import React, { FC } from "react";
import { Box } from "@mui/material";

const Row: FC = ({ children }) => (
  <Box
    display="inline-flex"
    flex="wrap"
    gap="10px"
    width="100%"
  >
    {children}
  </Box>
);

export default Row;
