import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import socket from "../config/socket";

const GamePage = () => {
  const [questions, setQuestions] = useState([
    {
      question: "What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Madrid"],
      correct: "Paris",
    },
    {
      question: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      correct: "4",
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Venus"],
      correct: "Mars",
    },
  ]);

  const { id } = useParams();
  // const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timer, setTimer] = useState(15); 
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    socket.on("quizQuestions", (data) => {
      setQuestions(data);
    });

    return () => {
      socket.off("quizQuestions");
    };
  }, []);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    if (timer === 0) {
      handleNextQuestion();
    }

    return () => clearInterval(countdown);
  }, [timer]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (selectedOption === currentQuestion.correct) {
      setScore((prev) => prev + 1);
    }
    setSelectedOption(null);
    setTimer(15); 
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      alert(`Quiz selesai! Skor Anda: ${score}/${questions.length}`);
      // navigate(`/leaderboard/:id`)
    }
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-['Fredoka'] text-gray-700">Loading questions...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[url('/paper-texture.jpg')] bg-cover p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center mb-8">
          <h1 className="text-5xl font-bold text-center text-pink-700 font-['Gloria_Hallelujah']">
            Quiz Game
          </h1>
        </div>
          <p className="text-center text-lg font-['Fredoka'] text-gray-700 mb-7">
          Lock in your answers and crush the leaderboard! 
          <span className="inline-block" style={{ animation: "flame 1.5s infinite ease-in-out" }}>🔥</span>
          </p>
        {/* Soal */}
        <div className="bg-yellow-100 border-[3px] font-['Fredoka'] border-dashed border-blue-400 rounded-3xl shadow-[6px_6px_0_#00000040] p-6 mb-7">
          <h2 className="text-xl font-semibold text-blue-800">
            {currentQuestion.question}
          </h2>
        </div>
        {/* Jawaban */}
        <div className="bg-gray-100 border-[3px] font-['Fredoka'] border-dashed border-pink-400 rounded-3xl shadow-[6px_6px_0_#00000040] p-6 mb-7">
          <ul className="list-none">
            {currentQuestion.options.map((option, index) => (
              <li
              key={index}
              onClick={() => handleOptionSelect(option)}
              className={`flex items-center p-2 mb-2 rounded-lg cursor-pointer ${
                selectedOption === option ? "bg-blue-300" : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              <span className="mr-4 font-bold text-blue-800">{String.fromCharCode(65 + index)}.</span>
              {option}
            </li>
            ))}
          </ul>
        </div>
        {/* Timer */}
        <div className="text-center mb-4">
          <p className="text-lg font-['Fredoka'] text-gray-700">
            Time Remaining: {timer} seconds
          </p>
        </div>
        {/* Tombol Next */}
        <div className="text-center">
          <button
            onClick={handleNextQuestion}
            className="bg-pink-400 hover:cursor-pointer hover:bg-pink-500 font-['Fredoka'] text-white px-6 py-2 rounded-full shadow-md"
            disabled={!selectedOption}
          >
            {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Finish Quiz"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GamePage;