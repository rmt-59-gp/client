import { useState } from "react";
import { useNavigate } from "react-router";

const badgeData = [
  { emoji: '🌟', label: 'Star Performer' },
  { emoji: '🎉', label: 'Party Starter' },
  { emoji: '💡', label: 'Brain Boost' },
  { emoji: '🎓', label: 'Quiz Whiz' },
];

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[url('/paper-texture.jpg')] bg-cover p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-pink-700 font-['Gloria_Hallelujah'] mb-8">
          📒 Welcome to Quizzzz!
        </h1>

        <form onSubmit={(e) => {
          e.preventDefault();

          localStorage.setItem("username", username);

          navigate("/");
        }} className="bg-yellow-100 border-[3px] font-['Fredoka'] border-dashed border-pink-400 rounded-3xl shadow-[6px_6px_0_#00000040] p-6 rotate-[-1.5deg]">
          <p className="text-xl font-semibold mb-4 text-blue-800">
            Type Your Name 🎮
          </p>
          <input
            type="text"
            placeholder="Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border-2 border-blue-300 rounded-xl font-mono mb-4"
          />
          <button type="submit" className="bg-pink-400 hover:cursor-pointer hover:bg-pink-500 text-white px-6 py-2 rounded-full shadow-md">
            🚀 Start!
          </button>
        </form>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 font-['Fredoka']">
          {badgeData.map(({ emoji, label }, i) => (
            <div
              key={i}
              className="relative flex items-center justify-center text-lg font-bold text-center h-24 bg-yellow-50 border-2 border-black rounded-xl shadow-[4px_4px_0_#00000040] transform rotate-[-2deg] hover:rotate-0 transition duration-200 ease-in-out"
            >
              <span className="absolute top-1 left-2 text-2xl">{emoji}</span>
              <span className="z-10">{label}</span>
              <div className="absolute bottom-1 right-2 w-4 h-4 bg-pink-300 rounded-full shadow-inner"></div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default LoginPage