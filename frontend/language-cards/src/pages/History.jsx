import { useEffect, useState } from "react";
import { api } from "../api/api";

const History = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    api.get("/scores/me").then((res) => {
      setScores(res.data);
    });
  }, []);

  return (
    <div className="min-h-screen p-6 pt-20 bg-base-200">
      <h1 className="text-2xl font-bold mb-6 text-center">📊 Meu histórico</h1>

      <div className="max-w-xl mx-auto space-y-3">
        {scores.map((item) => (
          <div
            key={item._id}
            className="card bg-base-100 shadow p-4 flex justify-between"
          >
            <span>{new Date(item.createdAt).toLocaleDateString()}</span>
            <span>{item.score} pts</span>
            <span>{item.wrongAnswers} erros</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
