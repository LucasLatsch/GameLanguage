import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Home from "../pages/Home";
import Game from "../pages/Game";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import PageTransition from "../components/PageTransition";
import Ranking from "../pages/Ranking";
import History from "../pages/History";
import Settings from "../pages/Settings";

const AppRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* login (pública, mas bloqueada se logado) */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <PageTransition>
                <Login />
              </PageTransition>
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <PageTransition>
                <Register />
              </PageTransition>
            </PublicRoute>
          }
        />

        {/* home privada */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <PageTransition>
                <Home />
              </PageTransition>
            </PrivateRoute>
          }
        />

        {/* game privada */}
        <Route
          path="/game"
          element={
            <PrivateRoute>
              <PageTransition>
                <Game />
              </PageTransition>
            </PrivateRoute>
          }
        />

        {/* Ranking privada */}
        <Route
          path="/ranking"
          element={
            <PrivateRoute>
              <PageTransition>
                <Ranking />
              </PageTransition>
            </PrivateRoute>
          }
        />

        {/* game privada */}
        <Route
          path="/history"
          element={
            <PrivateRoute>
              <PageTransition>
                <History />
              </PageTransition>
            </PrivateRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <PageTransition>
                <Settings />
              </PageTransition>
            </PrivateRoute>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

export default AppRoutes;
