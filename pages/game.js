"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Game from "../app/components/game";
import { selectTrainingWords } from "../app/utils/wordSelector";

export default function GamePage() {
  const searchParams = useSearchParams();
  const categories = searchParams.get("categories")?.split(",") || [];

  const [selectedWords, setSelectedWords] = useState([]);
  const [allWords, setAllWords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/data/file.json")
      .then(res => res.json())
      .then(data => {
        const wordBank = data.questions;
        setAllWords(wordBank);
        const trainingWords = selectTrainingWords(wordBank, categories);
        setSelectedWords(trainingWords);
        setIsLoading(false);
      });
  }, []);

  return isLoading ? <p>Laddar...</p> : <Game selectedWords={selectedWords} allWords={allWords} />;
}