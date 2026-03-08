import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useWordsStore } from "../store/wordsStore";
import { useScoreStore } from "../store/scoreStore";
import { initScore } from "../store/initScore";
import { useCategoriesStore } from "../store/categoriesStore";
import { useListsStore } from "../store/listsStore";

const normalizeText = (text) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const cardVariants = {
  idle: { x: 0 },
  wrong: {
    x: [-4, 4, -3, 3, -2, 2, 0],
    transition: { duration: 0.35 },
  },
};

const Game = () => {
  const { words, fetchWords, loading } = useWordsStore();
  const { score, wrongAnswers, addScore, addWrong, saveScore } =
    useScoreStore();

  const { categories, fetchCategories } = useCategoriesStore();
  const { lists, fetchLists } = useListsStore();

  const [gameWords, setGameWords] = useState([]);
  const [wrongWords, setWrongWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [answer, setAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(10);
  const [feedback, setFeedback] = useState(null);
  const [scoreSaved, setScoreSaved] = useState(false);

  const [started, setStarted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedList, setSelectedList] = useState("");

  const [wordsAmount, setWordsAmount] = useState(10);

  // buscar dados
  useEffect(() => {
    if (!words.length) fetchWords();
    if (!categories.length) fetchCategories();
    if (!lists.length) fetchLists();
  }, []);

  const resetGame = () => {
    setCurrentIndex(0);
    setWrongWords([]);
    setAnswer("");
    setTimeLeft(10);
    setFeedback(null);
    setScoreSaved(false);
    initScore();
  };

  const startGame = () => {
    const filtered = words.filter((word) => {
      const categoryId = word.categoryId?._id || word.categoryId;
      const listId = word.listId?._id || word.listId;

      const matchCategory =
        !selectedCategory || categoryId === selectedCategory;
      const matchList = !selectedList || listId === selectedList;

      return matchCategory && matchList;
    });

    if (!filtered.length) return;

    const shuffled = shuffleArray(filtered);

    const selectedWords = shuffled.slice(
      0,
      Math.min(wordsAmount, shuffled.length),
    );

    setGameWords(selectedWords);
    setStarted(true);
    resetGame();
  };

  const currentWord = useMemo(
    () => gameWords[currentIndex],
    [gameWords, currentIndex],
  );

  useEffect(() => {
    if (!currentWord || feedback) return;

    if (timeLeft === 0) {
      handleWrong();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, currentWord, feedback]);

  useEffect(() => {
    if (
      !scoreSaved &&
      gameWords.length > 0 &&
      currentIndex === gameWords.length
    ) {
      saveScore(gameWords.length);
      setScoreSaved(true);
    }
  }, [currentIndex]);

  const cancelGame = () => {
    setStarted(false);
    setGameWords([]);
    resetGame();
  };

  const nextWord = () => {
    setTimeout(() => {
      setFeedback(null);
      setAnswer("");
      setTimeLeft(10);
      setCurrentIndex((prev) => prev + 1);
    }, 800);
  };

  const handleCorrect = () => {
    addScore(10);
    setFeedback("correct");
    nextWord();
  };

  const handleWrong = () => {
    addWrong();
    setFeedback("wrong");

    if (currentWord) {
      setWrongWords((prev) => [...prev, currentWord]);
    }

    nextWord();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentWord || feedback) return;

    if (normalizeText(answer) === normalizeText(currentWord.translation)) {
      handleCorrect();
    } else {
      handleWrong();
    }
  };

  // loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  // tela inicial
  if (!started) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center bg-base-200 p-4">
        <div className="card p-6 bg-base-100 shadow-md w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">Iniciar jogo</h2>

          <select
            className="select select-bordered w-full mb-3"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Todas categorias</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            className="select select-bordered w-full mb-3"
            value={selectedList}
            onChange={(e) => setSelectedList(e.target.value)}
          >
            <option value="">Todas listas</option>
            {lists.map((l) => (
              <option key={l._id} value={l._id}>
                {l.name}
              </option>
            ))}
          </select>

          <select
            className="select select-bordered w-full mb-3"
            value={wordsAmount}
            onChange={(e) => setWordsAmount(Number(e.target.value))}
          >
            <option value={5}>5 palavras</option>
            <option value={10}>10 palavras</option>
            <option value={15}>15 palavras</option>
            <option value={20}>20 palavras</option>
          </select>

          <button
            className="btn btn-primary w-full"
            onClick={startGame}
            disabled={!words.length}
          >
            Iniciar jogo
          </button>
        </div>
      </div>
    );
  }

  // fim do jogo
  if (gameWords.length > 0 && currentIndex >= gameWords.length) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 p-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="card bg-base-100 shadow-xl p-8 text-center w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-2">🎉 Fim do jogo</h2>

          <p>
            Pontuação: <strong>{score}</strong>
          </p>
          <p>
            Erros: <strong>{wrongAnswers}</strong>
          </p>

          <button
            className="btn btn-primary w-full mt-4"
            onClick={() => {
              setStarted(false);
            }}
          >
            Voltar ao início
          </button>
        </motion.div>
      </div>
    );
  }

  // jogo ativo
  return (
    <div className="min-h-[100dvh] flex items-center justify-center pt-20 bg-base-200 p-4">
      <motion.div
        variants={cardVariants}
        animate={feedback === "wrong" ? "wrong" : "idle"}
        className={`card shadow-xl p-8 w-full max-w-md transition-colors duration-300
          ${
            feedback === "correct"
              ? "bg-success text-success-content"
              : feedback === "wrong"
                ? "bg-error text-error-content"
                : "bg-base-100"
          }`}
      >
        <div className="flex justify-between text-sm mb-2 opacity-80">
          <span>
            {currentIndex + 1} / {gameWords.length}
          </span>
          <span>⏱ {timeLeft}s</span>
        </div>

        <div className="w-full h-2 bg-base-300 rounded-full overflow-hidden mb-6">
          <motion.div
            className="h-full bg-primary"
            animate={{ width: `${(timeLeft / 10) * 100}%` }}
            transition={{ duration: 0.3, ease: "linear" }}
          />
        </div>

        <p className="text-3xl font-bold text-center mb-4">
          {currentWord?.term}
        </p>

        {feedback === "wrong" && currentWord && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-sm opacity-90 mb-4"
          >
            Resposta correta: <strong>{currentWord.translation}</strong>
          </motion.p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            disabled={feedback !== null}
            className="input input-bordered"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            autoFocus
          />

          <button disabled={feedback !== null} className="btn btn-primary">
            Confirmar
          </button>
          <button type="button" className="btn btn-error" onClick={cancelGame}>
            Cancelar
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Game;
