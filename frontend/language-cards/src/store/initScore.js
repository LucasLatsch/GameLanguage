import { useScoreStore } from "./scoreStore";

export const initScore = () => {
  useScoreStore.getState().resetScore();
};
