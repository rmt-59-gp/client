import { Outlet, Navigate } from "react-router"

const QuizLayout = () => {
  if (!localStorage.getItem("username")) {
    return <Navigate to="/login" />
  }

  return (
    <div className="w-full h-dvh">
      <Outlet />
    </div>
  )
}

export default QuizLayout