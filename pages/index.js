"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import CategorySelector from "../app/components/categorySelector";

export default function Home() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const router = useRouter();

  const categories = [ "Ordförståelse", "Substantiv", "Verb", "Adverb" ,"Prepositioner",  "Konjunktioner", "Adjektivändelser",  "Tabeller"];

  const toggleCategory = (cat) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const startGame = () => {
    const query = new URLSearchParams({ categories: selectedCategories.join(",") });
    router.push(`/game?${query.toString()}`);
  };

  return (
    <CategorySelector
      categories={categories}
      selectedCategories={selectedCategories}
      onToggle={toggleCategory}
      onStart={startGame}
    />
  );
}