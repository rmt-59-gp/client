import { Outlet, Navigate } from "react-router";
import { RoomProvider } from "../contexts/RoomContext";

const QuizLayout = () => {
  if (!localStorage.getItem("username")) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="w-full h-dvh">
      <RoomProvider>
        <Outlet />
      </RoomProvider>
    </div>
  );
};

export default QuizLayout;
