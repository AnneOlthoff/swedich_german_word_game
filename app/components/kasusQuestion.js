"use client";
import { useState, useEffect, useRef } from "react";

import AnsButton from "./answerButton.js";
import useAutoAdvance from "../hooks/useAutoAdvance";

export default function KasusQuestion({ pickedWord, onAnswer }) {
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    setSelected(null);
    setIsCorrect(null);

    setOptions([
      pickedWord.options[0],
      pickedWord.options[1],
      pickedWord.options[2],
    ]);
  }, [pickedWord]);

  const handleSelect = (option) => {
    setSelected(option);
    const correct = option === pickedWord.german;
    setIsCorrect(correct);

    // Vänta 6 sekunder innan vi skickar svaret vidare
    setTimeout(() => {
      onAnswer(pickedWord, correct);
    }, 6000);


   

  };

  return (
    <div>
      <h3>Vilken är den rätta översättningen för</h3>
      <h4>{pickedWord.swedish}</h4>

      <div style={styles.buttonContainer}>
        {options.map((opt, index) => (
          <div key={`${opt}-${index}`}>
            <AnsButton
              option={opt}
              selected={selected}
              correctValue={pickedWord.german}
              handleSelect={() => handleSelect(opt)}
            />
          </div>
        ))}
      </div>
      {selected && (
        <p style={{ marginTop: "1rem" }}>
          {isCorrect ? (
            <>
              Rätt! <br />
              förklaring: "{pickedWord.explanation}"
            </>
          ) : (
            <>
              ❌ fel! rätt svar är "{pickedWord.german}"<br />
              förklaring: "{pickedWord.explanation}"
            </>
          )}
        </p>
      )}
    </div>
  );
}

const styles = {
  
  buttonContainer: {
    paddingTop: "1rem",

    gap: "2rem",
    justifyContent: "center", // ← centrera horisontellt
    alignItems: "center",
  },
};
