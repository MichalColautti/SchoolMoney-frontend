import "./App.css";
import AuthTabs from "./pages/AuthTabs";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Parent from "./pages/Parent";
import Treasurer from "./pages/Treasurer";
import Account from "./pages/Account";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/auth" />} />
        <Route path="/auth" element={<AuthTabs />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/parent" element={<Parent />} />
          <Route path="/treasurer" element={<Treasurer />} />
          <Route path="/account" element={<Account />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
