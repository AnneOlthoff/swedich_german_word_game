// ask for the correct conjugation for the used verb depending on person - ex ich bin, du bist


"use client";
import { useState, useEffect, useRef } from "react";

import AnsButton from "../../answerButton.js";

export default function ConjugationQuestion({ pickedWord, onSecAnswer }) {
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const [pronoun, setPronoun] = useState(null);
  const [correctForm, setCorrectForm] = useState(null);

  useEffect(() => {
    setSelected(null);
    setIsCorrect(null);

    const conjugationPairs = Object.entries(pickedWord.conjugation);
    const [randomPronoun, randomForm] =
      conjugationPairs[Math.floor(Math.random() * conjugationPairs.length)];

    setPronoun(randomPronoun);
    setCorrectForm(randomForm);

    // Skapa svarsalternativ (rätt + 2 fel)
    const wrongForms = conjugationPairs
      .filter(([p, f]) => f !== randomForm)
      .map(([p, f]) => f)
      .sort(() => 0.5 - Math.random())
      .slice(0, 2);

    const mixedOptions = [...wrongForms, randomForm].sort(
      () => 0.5 - Math.random()
    );

 
    setOptions(mixedOptions);
  }, [pickedWord]);

  const handleSelect = (option) => {
    setSelected(option);
    const correct = option === correctForm;
    setIsCorrect(correct);

    setTimeout(() => {
      onSecAnswer(pickedWord, correct);
    }, 2000);
  };

  return (
    <div>
      <h3>
        Hur böjer man <strong>{pickedWord.german}</strong> med{" "}
        <strong>{pronoun}</strong> i presens?
      </h3>

      <div style={styles.buttonContainer}>
        {options.map((opt, index) => (
          <div key={`${opt}-${index}`}>
            <AnsButton
              option={opt}
              selected={selected}
              correctValue={correctForm}
              handleSelect={() => handleSelect(opt)}
            />
          </div>
        ))}
      </div>
      {selected && (
        <p style={{ marginTop: "1rem" }}>
          {isCorrect ? (
            <>Rätt!</>
          ) : (
            <>
              ❌ fel! rätt svar är "{correctForm}"<br />
            </>
          )}
        </p>
      )}
    </div>
  );
}

const styles = {
  
  buttonContainer: {
    paddingTop: "2rem",
    display: "flex",
    gap: "2rem",
    justifyContent: "center", // ← centrera horisontellt
    alignItems: "center",
  },
};
