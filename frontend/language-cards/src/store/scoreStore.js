import { create } from "zustand";
import { api } from "../api/api";

export const useScoreStore = create((set, get) => ({
  score: 0,
  wrongAnswers: 0,

  addScore: (value = 10) => set((state) => ({ score: state.score + value })),

  addWrong: () => set((state) => ({ wrongAnswers: state.wrongAnswers + 1 })),

  resetScore: () => set({ score: 0, wrongAnswers: 0 }),

  saveScore: async (totalWords) => {
    const { score, wrongAnswers } = get();

    await api.post("/scores", {
      score,
      wrongAnswers,
      totalWords,
      finishedAt: new Date(),
    });
  },
}));
