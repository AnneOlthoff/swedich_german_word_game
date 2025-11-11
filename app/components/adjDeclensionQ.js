"use client";
import { useState, useEffect, useRef } from "react";

import "../globals.css";
import AnsButton from "./answerButton.js";

export default function AdjDeclensionQ({ pickedWord, onSecAnswer }) {
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    setSelected(null);
    setIsCorrect(null);
    setOptions(["-er", "-en", "-em", "-es", "-e"]);
  }, [pickedWord])

  const handleSelect = (option) => {
    setSelected(option);
    const correct = option === pickedWord.ending;
    setIsCorrect(correct);

    // Vänta 2 sekunder innan vi skickar svaret vidare
    setTimeout(() => {
      onSecAnswer(pickedWord, correct);
    }, 12000);
  };

  return (
    <div>
      <h3>Vilken är den rätta adjektivböjningen?</h3>
      <h4>{pickedWord.fill}</h4>
      
       
      <div style={styles.buttonContainer}>
        {options.map((opt, index) => (
          <div key={`${opt}-${index}`}>
            <AnsButton
              option={opt}
              selected={selected}
              correctValue={pickedWord.ending}
              handleSelect={() => handleSelect(opt)}
            />
          </div>
       
        ))}
      </div>
        {console.log("selected; " , selected , " picked word ", pickedWord.ending)}
      {selected && (
        <div style={{ marginTop: "1rem" }}>
          {isCorrect ? (
            <div style={styles.answerContainer}>
              Rätt! <br />
              förklaring: "{pickedWord.explanation}"
            </div>
          ) : (
            <div style={styles.answerContainer}>
              ❌ fel! rätt svar är "{pickedWord.ending}"<br />
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
    paddingLeft: "4rem",
    paddingRight: "4rem",
    maxWidth: "30rem",
    margin: "auto"

  }
};
