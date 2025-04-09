import { BrowserRouter, Routes, Route } from "react-router";
import LoginPage from "./pages/LoginPage";
import QuizLayout from "./layouts/QuizLayout";
import RoomBrowserPage from "./pages/RoomBrowserPage";
import WaitingRoomPage from "./pages/WaitingRoomPage";
import RoomCreate from "./pages/RoomCreate";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<QuizLayout />}>
          <Route path="/" element={<RoomBrowserPage />} />
          <Route path="/room/create" element={<RoomCreate />} />
          <Route path="/room/:id" element={<WaitingRoomPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
