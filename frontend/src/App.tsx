import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import ContentManager from "./components/ContentManager";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route element={<ProtectedRoute />}>
          <Route
            path="/admin/content"
            element={<ContentManager />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
