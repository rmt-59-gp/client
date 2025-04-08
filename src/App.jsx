import { BrowserRouter, Routes, Route } from "react-router";
import LoginPage from "./pages/LoginPage";
import QuizLayout from "./layouts/QuizLayout";
import LobbyPage from "./pages/LobbyPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<QuizLayout />}>
          <Route path="/" element={<LobbyPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
