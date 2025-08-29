import { useEffect, useState } from "react";
import "./styles/Quiz.css"
import { useNavigate } from "react-router-dom";

export default function Quiz() {
    const [quiz, setQuiz] = useState([]);
    const [currentQ, setCurrentQ] = useState(0);
    const [score, setScore] = useState(0);
    //   const [showResult, setShowResult] = useState(false);
    const navigate = useNavigate();

    const shuffleArray = (array) => {
        return [...array].sort(() => Math.random() - 0.5);
    };

    useEffect(() => {
        // fetch("https://the-trivia-api.com/v2/questions")
        fetch("https://opentdb.com/api.php?amount=20&category=9&difficulty=easy&type=multiple")
            .then((res) => res.json())
            .then((data) => {
                const updated = data.results?.map((q) => ({
                    ...q,
                    options: shuffleArray([
                        q.correct_answer,
                        ...q.incorrect_answers,
                    ]),
                }));
                setQuiz(updated);
            })
            .catch((err) => console.error(err));
    }, []);

    const handleAnswer = (answer) => {
        if (answer === quiz[currentQ].correct_answer) {
            setScore((prev) => prev + 1);
        }
        const nextQ = currentQ + 1;
        if (nextQ < quiz.length) {
            setCurrentQ(nextQ);
        } else {
            //   setShowResult(true);
            navigate(`/result?score=${score}&ql=${quiz.length}`);
        }
    };

    function decodeHtml(html) {
        const txt = new DOMParser().parseFromString(html, "text/html");
        return txt.documentElement.textContent;
      }

    if (quiz.length === 0) return <img src="https://static.wixstatic.com/media/68315b_30dbad1140034a3da3c59278654e1655~mv2.gif" />;

    //   if (showResult) {
    //     return (
    //       <div style={{ textAlign: "center", marginTop: "50px" }}>
    //         <h2>Quiz Finished ✅</h2>
    //         <p>
    //           Your Score: <b>{score}</b> / {quiz.length}
    //         </p>
    //       </div>
    //     );
    //   }

    const question = quiz[currentQ];

    return (
        <div style={{ maxWidth: "600px", margin: "auto", marginTop: "50px" }}>
            <h2>
                Question {currentQ + 1} of {quiz.length}
            </h2>
            <p>{decodeHtml(question.question)}</p>
            <div style={{ display: "grid", gap: "10px", marginTop: "20px" }}>
                {question.options.map((option, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleAnswer(option)}
                        style={{
                            padding: "10px",
                            borderRadius: "8px",
                            border: "1px solid #ccc",
                            cursor: "pointer",
                        }}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
}
