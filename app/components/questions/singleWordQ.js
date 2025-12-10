"use client";
import { useState, useEffect } from "react";
import "../../globals.css";
import AnsButton from "../answerButton.js";
import "../../globals.css"

export default function WordQuestion({ pickedWord, allWords, onAnswer }) {
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    // Hämta två slumpmässiga felaktiga alternativ
    const flatList = flattenQuestions(allWords);
    
    const wrongOptions = flatList
      .filter(w => w.german && w.german !== pickedWord.german && !w.german.includes(" ")) // ignorera meningar
      .sort(() => 0.5 - Math.random())
      .slice(0, 2);


    // Blanda rätt och fel
    const mixed = [...wrongOptions, pickedWord].sort(() => 0.5 - Math.random());
    setOptions(mixed); // sätter de blandade alternativen i state.
    setSelected(null); // nollställer användarens val.
    setIsCorrect(null); //nollställer om svaret är rätt/fel – så att nästa fråga börjar “rent”.
  }, [pickedWord, allWords]);

  
const handleSelect = (option) => {
  const correct = option.german === pickedWord.german;

  setSelected(option.german);
  setIsCorrect(correct);

  setTimeout(() => {
    onAnswer(pickedWord, correct);
  }, 500);
};


const flattenQuestions = (questions) => {
  return [
    ...(questions.adverb || []),
    ...(questions.nouns || []),
    ...(questions.verbs || []),
    ...(questions.adj_declension || []),
    ...(questions.prepositions || []),
    ...(questions.conjunction || []),
    ...(questions.other || [])
  ];
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

      <div className="buttonContainer">
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
       {selected && (
        <div style={{ marginTop: "1rem" }}>
          {isCorrect ? (
            <div >
              
            </div>
          ) : (
            <div >
              ❌ fel! rätt svar är "{pickedWord.german}" 
              
            </div>
          )}
        </div>
      )}
    </div>
  );
}


