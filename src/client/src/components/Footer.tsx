import React, { FC } from "react";
import { Paper, Typography } from "@mui/material";
import { format } from "date-fns";

const Footer: FC = () => (
  <footer>
    <Paper style={{ backgroundColor: 'inherit' }}>
      <Typography
        style={{
          padding: 10,
          textAlign: 'center'
        }}
        variant="subtitle2"
        component="h2"
      >
        Isaac Suarez @ {format(new Date(), "yyyy")}
      </Typography>
    </Paper>
  </footer>
);

export default Footer;
