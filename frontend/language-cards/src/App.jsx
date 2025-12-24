import React from "react";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Navbar";
import { useEffect } from "react";
import { initAuth } from "./store/initAuth";
import { initTheme } from "./store/initTheme";

const App = () => {
  useEffect(() => {
    initAuth();
    initTheme();
  }, []);

  return (
    <>
      <Navbar />
      <AppRoutes />
    </>
  );
};

export default App;
