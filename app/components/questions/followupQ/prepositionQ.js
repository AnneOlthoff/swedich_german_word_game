// what presposition is used in the prev asked sentence

"use client";
import { useState, useEffect, useRef } from "react";

import AnsButton from "../../answerButton.js";

export default function PrepositionQuestion({ pickedWord, onSecAnswer }) {
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    setSelected(null);
    setIsCorrect(null);
    setOptions(["Ackusativ", "Dativ", "Genetiv"]);
  }, [pickedWord]);

  const handleSelect = (option) => {
    setSelected(option);
    const correct = option === pickedWord.kasus;
    setIsCorrect(correct);

    // Vänta 2 sekunder innan vi skickar svaret vidare
    setTimeout(() => {
      onSecAnswer(pickedWord, correct);
    }, 12000);
  };

  return (
    <div>
      <h3>Prepositionen styr?</h3>

      <div style={styles.buttonContainer}>
        {options.map((opt, index) => (
          <div key={`${opt}-${index}`}>
            <AnsButton
              option={opt}
              selected={selected }
              correctValue={pickedWord.kasus}
              handleSelect={() => handleSelect(opt)}
            />
          </div>
        ))}
      </div>
      {selected && (
        <div style={{ marginTop: "1rem" }}>
          {isCorrect ? (
            <div style={styles.answerContainer}>
              Rätt! <br />
              förklaring: "{pickedWord.explanation}"
            </div>
          ) : (
            <div style={styles.answerContainer}>
              ❌ fel! rätt svar är "{pickedWord.kasus}"<br />
              förklaring: "{pickedWord.explanation}"
            </div>
          )}
        </div>
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

    margin: "auto"
  },
  answerContainer: {
   
    maxWidth: "30rem",
    margin: "auto"

  }
};
