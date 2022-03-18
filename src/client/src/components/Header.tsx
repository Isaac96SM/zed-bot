import React, { FC } from "react";
import { Paper, Typography } from "@mui/material";

const Header: FC = () => (
  <header>
    <Paper style={{ backgroundColor: 'inherit' }}>
      <Typography
        style={{
          padding: 10,
        }}
        variant="h4"
        component="h1"
      >
        Nuevo partido
      </Typography>
    </Paper>
  </header>
);

export default Header;
