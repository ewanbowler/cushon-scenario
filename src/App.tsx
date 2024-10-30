import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { Index } from "./pages/Index";
import { UserProvider } from "./contexts/UserContext";

export const App: React.FC = () => {
  return (
    <UserProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Index />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
