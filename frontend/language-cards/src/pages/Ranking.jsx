import { useEffect, useState } from "react";
import { api } from "../api/api";

const Ranking = () => {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    api.get("/scores/ranking").then((res) => {
      setRanking(res.data);
    });
  }, []);

  return (
    <div className="min-h-screen p-6 pt-20 bg-base-200">
      <h1 className="text-2xl font-bold mb-6 text-center">🏆 Ranking</h1>

      <div className="max-w-xl mx-auto space-y-3">
        {ranking.map((item, index) => (
          <div
            key={item._id}
            className="card bg-base-100 shadow p-4 flex justify-between"
          >
            <span>#{index + 1}</span>
            <span>{item.userId?.name || "Usuário"}</span>
            <strong>{item.score} pts</strong>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ranking;
