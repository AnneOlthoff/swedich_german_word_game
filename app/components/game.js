"use client";
import { useState } from "react";
import "../globals.css";
import SingleWordQ from "./questions/singleWordQ.js";
import ArtikelQ from "./questions/followupQ/artikelQ.js";
import ConjugationQ from "./questions/followupQ/conjugationQ.js";
import PrepositionQ from "./questions/followupQ/prepositionQ.js";
import AdjDeclensionQ from "./questions/adjDeclensionQ.js";
import ConjunctionQ from "./questions/conjunctionQ.js";
import GrammarTableQ from "./questions/gramarTableQ.js"

import { useRouter } from "next/navigation";

export default function Game({ selectedWords: initialWords, allWords }) {
  // ✅ Lokal kopia av ordlistan för att undvika mutation av props
  const [words, setWords] = useState(initialWords);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [showFollowUpQuestion, setShowFollowUpQuestion] = useState(false);
  const [currentTableIndex, setCurrentTableIndex] = useState(0);

  const router = useRouter(); //skicka tillbaka till startsida när man spelat klart

  // ✅ Gå till nästa ord
  const goToNextWord = (word, correct) => {
    console.log("goToNextWord:", word, "Correct?", correct);

    if (correct) {
      setCorrectAnswers((prev) => [...prev, word]);
      setWords((prev) => prev.filter((_, i) => i !== currentWordIndex)); // Ta bort ordet
      setCurrentWordIndex(0);
    } else {
      setWrongAnswers((prev) => [...prev, word]);
      setCurrentWordIndex((prev) => {
        const isLast = prev >= words.length - 1;
        return isLast ? 0 : prev + 1;
      });
    }
    setRefreshKey((prev) => prev + 1);
  };

  const startNewGame = () => {
   router.push("/");
  };

  // ✅ Hantera svar från huvudfråga
  const handleAnswer = (word, correct) => {
    console.log("handleAnswer called with:", word, "Correct?", correct);
    if (!word || correct === null) return; // Stoppa om inget svar

    const hasArtikel = word.artikel !== undefined;
    const hasConjugation = word.conjugation_presens !== undefined;
    const hasPreposition = word.preposition !== undefined;
    const hasFollowUp = hasArtikel || hasConjugation || hasPreposition;

    if (correct && hasFollowUp) {
      setShowFollowUpQuestion(true);
    } else {
      setTimeout(() => {
        goToNextWord(word, correct);
      }, 5000); // Vänta 5 sekunder
    }
  };

  // ✅ Hantera svar från följdfråga
  const handleFollowUpAnswer = (word, correct) => {
    console.log("handleFollowUpAnswer:", word, "Correct?", correct);
    setShowFollowUpQuestion(false);
    setTimeout(() => {
      goToNextWord(word, correct);
    }, 2000);
  };

  return (
    <section style={styles.container}>
      {words.length > 0 && currentWordIndex < words.length ? (
        <div>
          <p>Antal kvar: {words.length}</p>

          {words[currentWordIndex].adj_declension ? (
            <>
              <AdjDeclensionQ
                pickedWord={words[currentWordIndex]}
                onSecAnswer={handleFollowUpAnswer}
              />
            </>
          ) : words[currentWordIndex].columns ? (

            <div>
                  <GrammarTableQ
                    tableData={words[currentTableIndex]}
                    onAnswer={handleAnswer}
                  />
                  <button   
                    className="mainButton"
                    onClick={() => setCurrentTableIndex((prev) => (prev + 1) % words.length)}
                  >
                    Nästa tabell
                  </button>
            </div>


          ) : words[currentWordIndex].conjunction ? (
            <>
              <ConjunctionQ
                pickedWord={words[currentWordIndex]}
                onSecAnswer={handleFollowUpAnswer}
              />
            </>
          ) : (
            <>
              <SingleWordQ
                key={refreshKey}
                pickedWord={words[currentWordIndex]}
                allWords={allWords}
                onAnswer={handleAnswer}
              />

              {showFollowUpQuestion &&
                (words[currentWordIndex].conjugation_presens ? (
                  <ConjugationQ
                    pickedWord={words[currentWordIndex]}
                    onSecAnswer={handleFollowUpAnswer}
                  />
                ) : words[currentWordIndex].artikel ? (
                  <ArtikelQ
                    pickedWord={words[currentWordIndex]}
                    onSecAnswer={handleFollowUpAnswer}
                  />
                ) : words[currentWordIndex].preposition ? (
                  <PrepositionQ
                    pickedWord={words[currentWordIndex]}
                    onSecAnswer={handleFollowUpAnswer}
                  />
                ) : null)}
            </>
          )}
        </div>
      ) : (
        <div>
          <h2>🎉 Du är klar!</h2>
          <p>Rätt besvarade: {correctAnswers.length}</p>
          <p>Felaktiga försök: {wrongAnswers.length}</p>
          <button
            onClick={startNewGame}
           className="mainButton"
          >
        Välj ny kategori
      </button>
           
        </div>
      )}
    </section>
  );
}

const styles = {
  container: {
    paddingTop: "3rem",
    textAlign: "center",
    maxWidth: "1800px",
    marginLeft: "auto",
    marginRight: "auto",
    paddingLeft: "3rem",
    paddingRight: "3rem",
  },
};
