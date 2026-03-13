import { useState } from "react";

export const useViewMode = () => {
  const [viewMode, setViewMode] = useState("words");

  return { viewMode, setViewMode };
};
