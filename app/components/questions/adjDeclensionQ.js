// as for correct declenesion for adjective

"use client";
import { useState, useEffect, useRef } from "react";

import "../../globals.css";
import AnsButton from "../answerButton.js";

export default function AdjDeclensionQ({ pickedWord, onSecAnswer }) {
  const [options, setOptions] = useState([]);
  const [articleOpt, setArticleOpt] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    setSelected(null);
    setIsCorrect(null);
    setOptions(["-er", "-en", "-em", "-es", "-e"]);
    setArticleOpt(["der", "den", "dem", "des", "das", "die"]);
  }, [pickedWord]);

  const handleSelect = (option) => {
    setSelected(option);
    const correct = option === pickedWord.missing;
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

      <div className="buttonContainer">
        {pickedWord.adj_declension == "definite_article" 
        ? articleOpt.map((opt, index) => (
            
                <AnsButton
                  key={`${opt}-${index}`}
                  option={opt}
                  selected={selected}
                  correctValue={pickedWord.missing}
                  handleSelect={() => handleSelect(opt)}
                />
        
            ) ) : options.map((opt, index) => (
             
                <AnsButton
                  key={`${opt}-${index}`}
                  option={opt}
                  selected={selected}
                  correctValue={pickedWord.missing}
                  handleSelect={() => handleSelect(opt)}
                />
             
            ))}
            
         
      </div>
      {console.log("hej")}
      {selected && (
        <div style={{ marginTop: "1rem" }}>
          {isCorrect ? (
            <div style={styles.answerContainer}>
              Rätt! <br />
              förklaring: "{pickedWord.explanation}"
            </div>
          ) : (
            <div style={styles.answerContainer}>
              ❌ fel! rätt svar är "{pickedWord.missing}"<br />
              förklaring: "{pickedWord.explanation}"
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
