import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";

import Dashboard from "./components/pages/Dashboard";
import { AuthProvider } from "./features/auth/AuthContext";
import { RouteGuard } from "./features/auth/RouteGuard";
import {
  PROTECTED_ROUTES,
  PUBLIC_ONLY_ROUTES,
  PUBLIC_ROUTES,
} from "./features/auth/routes";
import { Login } from "@/components/pages/Login";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={PUBLIC_ROUTES.HOME}
            element={
              <RouteGuard>
                <Home />
              </RouteGuard>
            }
          />
          <Route
            path={PUBLIC_ONLY_ROUTES.LOGIN}
            element={
              <RouteGuard>
                <Login />
              </RouteGuard>
            }
          />
          <Route
            path={PROTECTED_ROUTES.DASHBOARD}
            element={
              <RouteGuard>
                <Dashboard />
              </RouteGuard>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
