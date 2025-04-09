import { BrowserRouter, Routes, Route } from "react-router";
import LoginPage from "./pages/LoginPage";
import QuizLayout from "./layouts/QuizLayout";
import RoomBrowserPage from "./pages/RoomBrowserPage";
import WaitingRoomPage from "./pages/WaitingRoomPage";
import RoomCreate from "./pages/RoomCreate";
import LeaderboardPage from "./pages/LeaderBoard";
import { LeaderboardProvider } from "./contexts/LeaderboardContext";

const App = () => {
  return (
    <BrowserRouter>
      <LeaderboardProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<QuizLayout />}>
            <Route path="/" element={<RoomBrowserPage />} />
            <Route path="/room/create" element={<RoomCreate />} />
            <Route path="/room/:id" element={<WaitingRoomPage />} />
            <Route path="/room/:id/leaderboard" element={<LeaderboardPage />} />
          </Route>
        </Routes>
      </LeaderboardProvider>
    </BrowserRouter>
  );
};

export default App;
