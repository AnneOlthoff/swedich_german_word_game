"use client";

// ask for coorect artikle after translation of a noun

import { useState, useEffect, useRef } from "react";

import AnsButton from "../../answerButton.js";

export default function ArtikelQuestion({ pickedWord, onSecAnswer }) {
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    setSelected(null);
    setIsCorrect(null);
    setOptions(["der", "die", "das"]);
  }, [pickedWord]);

  const handleSelect = (option) => {
    setSelected(option);
    const correct = option === pickedWord.artikel;
    setIsCorrect(correct);

    // Vänta 2 sekunder innan vi skickar svaret vidare
    setTimeout(() => {
      onSecAnswer(pickedWord, correct);
    }, 2000);
  };

  return (
    <div>
      <h3>Vilken artikel har ordet?</h3>

      <div style={styles.buttonContainer}>
        {options.map((opt, index) => (
          <div key={`${opt}-${index}`}>
            <AnsButton
              option={opt + " " + pickedWord.german}
              selected={selected + " " + pickedWord.german}
              correctValue={pickedWord.artikel + " " + pickedWord.german}
              handleSelect={() => handleSelect(opt)}
            />
          </div>
        ))}
      </div>
      {selected && (
        <p style={{ marginTop: "1rem" }}>
          {isCorrect
            ? "Rätt!"
            : `❌ Fel. Rätt svar är "${
                pickedWord.artikel + " " + pickedWord.german
              }".`}
        </p>
      )}
    </div>
  );
}

const styles = {

  buttonContainer: {
    paddingTop: "1rem",
    display: "flex",
    gap: "2rem",
    justifyContent: "center", // ← centrera horisontellt
    alignItems: "center",
  }
};
