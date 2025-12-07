"use client";
import { useState } from "react";
import "../globals.css";
import SingleWordQ from "./questions/singleWordQ.js";
import ArtikelQ from "./questions/followupQ/artikelQ.js";
import ConjugationQ from "./questions/followupQ/conjugationQ.js";
import PrepositionQ from "./questions/followupQ/prepositionQ.js";
import AdjDeclensionQ from "./questions/adjDeclensionQ.js";
import ConjunctionQ from "./questions/conjunctionQ.js";
import GrammarTableQ from "./questions/gramarTableQ.js";
import { useRouter } from "next/navigation";

export default function Game({ selectedWords: initialWords, allWords }) {
  const router = useRouter();

  // ✅ Dela upp ord i två listor: tabeller och vanliga frågor
  const [tables, setTables] = useState(initialWords.filter(w => w.columns));
  const [words, setWords] = useState(initialWords.filter(w => !w.columns));

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentTableIndex, setCurrentTableIndex] = useState(0);

  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [showFollowUpQuestion, setShowFollowUpQuestion] = useState(false);

  // ✅ Gå till nästa ord
  const goToNextWord = (word, correct) => {
    if (correct) {
      setCorrectAnswers(prev => [...prev, word]);
      setWords(prev => prev.filter((_, i) => i !== currentWordIndex));
      setCurrentWordIndex(0);
    } else {
      setWrongAnswers(prev => [...prev, word]);
      setCurrentWordIndex(prev => {
        const isLast = prev >= words.length - 1;
        return isLast ? 0 : prev + 1;
      });
    }
    setRefreshKey(prev => prev + 1);
  };

  // ✅ Hantera svar från huvudfråga
  const handleAnswer = (word, correct) => {
    if (!word || correct === null) return;

    const hasArtikel = word.artikel !== undefined;
    const hasConjugation = word.conjugation_presens !== undefined;
    const hasPreposition = word.preposition !== undefined;
    const hasFollowUp = hasArtikel || hasConjugation || hasPreposition;

    if (correct && hasFollowUp) {
      setShowFollowUpQuestion(true);
    } else {
      setTimeout(() => {
        goToNextWord(word, correct);
      }, 2000);
    }
  };

  // ✅ Hantera svar från följdfråga
  const handleFollowUpAnswer = (word, correct) => {
    setShowFollowUpQuestion(false);
    setTimeout(() => {
      goToNextWord(word, correct);
    }, 1500);
  };

  // ✅ Hantera nästa tabell
  const handleNextTable = () => {
    if (tables.length <= 1) {
      setTables([]); // Alla tabeller klara
      return;
    }
    setTables(prev => prev.filter((_, i) => i !== currentTableIndex));
    setCurrentTableIndex(0);
  };

  const startNewGame = () => {
    router.push("/");
  };

  const allDone = words.length === 0 && tables.length === 0;

  return (
    <div >
      <div style={{"display": "flex", "justifyContent": "end", "padding": "1rem"}}>
        <button onClick={startNewGame} style={{"fontSize": "14px","alignContent": "end", "padding": "8px",  "borderRadius": "4px",
    "border": "1px solid var(--heading)"}}>
              Välj en ny kategori
        </button>
      </div>
    <section style={styles.container}>

      {!allDone ? (
        <div>
          <p>Antal kvar: {words.length + tables.length}</p>

          {/* ✅ Visa tabeller först om de finns */}
          {tables.length > 0 ? (
            <div>
              <GrammarTableQ
                tableData={tables[currentTableIndex]}
                
                onAnswer={handleAnswer}
              />
              <button
                className="mainButton"
                onClick={handleNextTable}
              >
                Nästa tabell
              </button>
            </div>
          ) : (
            // ✅ Vanliga frågor
            words.length > 0 && (
              <>
                {words[currentWordIndex].adj_declension ? (
                  <AdjDeclensionQ
                    pickedWord={words[currentWordIndex]}
                    onSecAnswer={handleFollowUpAnswer}
                  />
                ) : words[currentWordIndex].conjunction ? (
                  <ConjunctionQ
                    pickedWord={words[currentWordIndex]}
                    onSecAnswer={handleFollowUpAnswer}
                  />
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
              </>
            )
          )}
          
        </div>
      ) : (
        <div>
          <h2>🎉 Du är klar!</h2>
          <p>Rätt besvarade: {correctAnswers.length}</p>
          <p>Felaktiga försök: {wrongAnswers.length}</p>
          <button onClick={startNewGame} className="mainButton">
            Välj ny kategori
          </button>
        </div>
      )}
    </section>
    </div>
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
}