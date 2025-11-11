"use client";
import { useState, useEffect, useRef } from "react";
import AnsButton from "./answerButton.js";
import "../globals.css";

export default function WordQuestion({ pickedWord, allWords, onAnswer }) {
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    // Hämta två slumpmässiga felaktiga alternativ
    const wrongOptions = allWords
      .filter((w) => w.german !== pickedWord.german && !w.german.includes(" ")) //vill inte få förslag på meningar
      .sort(() => 0.5 - Math.random())
      .slice(0, 2);

    // Blanda rätt och fel
    const mixed = [...wrongOptions, pickedWord].sort(() => 0.5 - Math.random());
    setOptions(mixed); // sätter de blandade alternativen i state.
    setSelected(null); // nollställer användarens val.
    setIsCorrect(null); //nollställer om svaret är rätt/fel – så att nästa fråga börjar “rent”.
  }, [pickedWord, allWords]);

  const handleSelect = (option) => {
    setSelected(option.german); //vill bara skicka in tyska ordet för att se om rätt svar i AnsButton
    const correct = option.german === pickedWord.german;
    setIsCorrect(pickedWord.german);

    setTimeout(() => {
       onAnswer(pickedWord, correct);
    }, 2000);
  
  };

  return (
    <div>
      {(pickedWord.swedish !== undefined ? (
      <h3>
        Vad är tyska för: <strong>{pickedWord.swedish}</strong>?
      </h3> 
      ):pickedWord.fill !== undefined ?(
        <div>
      <h3>
        Fyll i det som saknas: 
      </h3> 
      <h4>{pickedWord.fill}</h4>
      </div>

      ): null )}

      <div style={styles.buttonContainer}>
        {options.map((opt, index) => (
          <div key={`${opt}-${index}`}>
             <AnsButton
                option={opt.german}
                selected={selected}
                correctValue={pickedWord.german}
                handleSelect={() => handleSelect(opt)}
              />
          </div>
        ))}
      </div>
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
  },
  button: {
    display: "block",
    margin: "0.5rem 0",
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    cursor: "pointer",
    borderRadius: "4px",
    border: "1px solid #ccc",
    color: "var(--text)",
  },
};
