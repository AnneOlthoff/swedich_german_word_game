// as for correct declenesion for adjective

"use client";
import { useState, useEffect, useRef } from "react";

import "../../globals.css";
import AnsButton from "../answerButton.js";

export default function ConjunctionQ({ pickedWord, onSecAnswer }) {
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    setSelected(null);
    setIsCorrect(null);

    const allOptions = [
      "Und",
      "Oder",
      "Aber",
      "Denn",
      "Dass",
      "Weil",
      "Wenn",
      "Als",
      "Damit",
      "Bis",
    ];

    // Välj korrekt svar från pickedWord.german
    const correctOption = pickedWord.german;

    // Skapa en lista med felaktiga alternativ (alla utom korrekt)
    const wrongOptions = allOptions.filter((opt) => opt !== correctOption);

    // Slumpa felalternativen och ta 4 st
    const randomWrong = wrongOptions
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);

    // Kombinera korrekt + fel och blanda
    const mixedOptions = [...randomWrong, correctOption].sort(
      () => 0.5 - Math.random()
    );

    setOptions(mixedOptions);
  }, [pickedWord]);

  const handleSelect = (option) => {
    setSelected(option);
    const correct = option === pickedWord.german;
    setIsCorrect(correct);

    // Vänta 2 sekunder innan vi skickar svaret vidare
    setTimeout(() => {
      onSecAnswer(pickedWord, correct);
    }, 6000);
  };

  return (
    <div>
      <h3>Vilken är den rätta adjektivböjningen?</h3>
      <h4>{pickedWord.fill}</h4>

      <div className="buttonContainer">
        {options.map((opt, index) => (
          <div key={`${opt}-${index}`}>
            <AnsButton
              option={opt }
              selected={selected}
              correctValue={pickedWord.german}
              handleSelect={() => handleSelect(opt)}
            />
          </div>
        ))}
      </div>

      {selected && (
        <div style={{ marginTop: "1rem" }}>
          {isCorrect ? (
            <div style={styles.answerContainer}>
              Rätt!<br />
              På svenska betyder ordet: "{pickedWord.swedish}"
            </div>
          ) : (
            <div style={styles.answerContainer}>
              ❌ fel! rätt svar är "{pickedWord.german}" <br/>
             På svenska betyder ordet: "{pickedWord.swedish}"
              
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const styles = {
  answerContainer: {
    maxWidth: "30rem",
    margin: "auto",
  },
};
