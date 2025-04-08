import { BrowserRouter, Routes, Route } from "react-router";
import LoginPage from "./pages/LoginPage";
import WaitingRoomPage from "./pages/WaitingRoomPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/room/:id" element={<WaitingRoomPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
