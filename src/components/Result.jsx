import { useNavigate, useSearchParams } from "react-router-dom";

export default function Result() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const score = parseInt(searchParams.get("score")) || 0;
    const ql = parseInt(searchParams.get("ql")) || 1;

    // calculate percentage
    const percentage = Math.round((score / ql) * 100);

    // assign grade
    let grade;
    if (percentage >= 90) grade = "A+";
    else if (percentage >= 80) grade = "A";
    else if (percentage >= 70) grade = "B";
    else if (percentage >= 60) grade = "C";
    else if (percentage >= 50) grade = "D";
    else grade = "F";

    const restartQuiz = () => {
        navigate("/quiz")
    }

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2>Quiz Finished ✅</h2>
            <p>Your Score: <b>{score}</b> / {ql}</p>
            <p>Percentage: {percentage}%</p>
            <p>Grade: {grade}</p>
            <button onClick={restartQuiz} style={{ marginTop: "20px" }}>
                Restart Quiz
            </button>
        </div>
    );
}
