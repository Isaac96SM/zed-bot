import React, { FC } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Form from "./components/Form";
import { createTheme, ThemeProvider } from "@mui/material";

const App: FC = () => {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Header />
      <Form />
      <Footer />
    </ThemeProvider>
  );
};

export default App;
