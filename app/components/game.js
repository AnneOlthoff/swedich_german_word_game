"use client";
import { useState, useEffect } from "react";
import "../globals.css";
import SingleWordQ from "./singleWordQuestion.js";
import ArtikelQ from "./artikelQuestion.js";
import KasusQ from "./kasusQuestion.js";
import ConjugationQ from "./conjugationQuestion.js";
import PrepositionQ from "./prepositionQuestion.js";

export default function Game() {
  const [selectedWords, setSelectedWords] = useState([]);
  const [allWords, setAllWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showFollowUpQuestion, setShowFollowUpQuestion] = useState(false);

  // Hämta ord från JSON
  useEffect(() => {
    fetch("/data/file.json")
      .then((res) => res.json())
      .then((data) => {
        const wordBank = data.translations;

        const verbs = wordBank.filter((w) => w.type === "verb");
        const artikelWords = wordBank.filter(w => w.artikel !== undefined );
        const kasusWords = wordBank.filter(w => w.options !== undefined);
        const otherWords = wordBank.filter(w => w.type == "other");
        const prepositionWords = wordBank.filter(w => w.preposition !== undefined);

        const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

        //vilka typer av frågor vill vi ställa
        const selected = [
          getRandom(verbs),
          getRandom(artikelWords),
          getRandom(kasusWords),
          getRandom(prepositionWords),
          getRandom(otherWords)
        ];

        const remaining = wordBank.filter((w) => !selected.includes(w));
        const extra = [...remaining]
          .sort(() => 0.5 - Math.random())
          .slice(0, 2);

        const trainingWords = [...selected, ...extra].sort(
          () => 0.5 - Math.random()
        );

        setSelectedWords(trainingWords);
        setAllWords(wordBank);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }, []);

  // Säkerställ att index alltid är inom bounds
  useEffect(() => {
    if (currentWordIndex >= selectedWords.length && selectedWords.length > 0) {
      setCurrentWordIndex(0);
    }
  }, [selectedWords]);

  const handleFollowUpAnswer = (word, correct) => {
    setShowFollowUpQuestion(false);


    goToNextWord(word, correct);
  };

  const goToNextWord = (word, correct) => {
    if (correct) {
      setCorrectAnswers((prev) => [...prev, word]);
      setSelectedWords((prevWords) =>
        prevWords.filter((w) => w.german !== word.german)
      );
      setCurrentWordIndex(0);
    } else {
      setWrongAnswers((prev) => [...prev, word]);
      setCurrentWordIndex((prev) => {
        const isLast = prev >= selectedWords.length - 1;
        return isLast ? 0 : prev + 1;
      });
    }

    setRefreshKey((prev) => prev + 1); // 🔁 tvinga omrendering
  };

  const handleAnswer = (word, correct) => {

    const hasArtikel = word.artikel !== undefined;
    const hasConjugation = word.conjugation !== undefined;
    const hasPreposition = word.preposition !== undefined;
    const hasFollowUp = hasArtikel || hasConjugation || hasPreposition;

    if (correct && hasFollowUp) {
      // Visa följdfråga

      setShowFollowUpQuestion(true);
    } else {
      // Gå vidare direkt
      setTimeout(() => {
        goToNextWord(word, correct);
      }, 2000);
    }
  };

  return (
    <section style={styles.container}>
      {isLoading ? (
        <p></p>
      ) : selectedWords.length > 0 &&
        currentWordIndex < selectedWords.length ? (
        <div>
          <p>Antal kvar: {selectedWords.length}</p>

          {selectedWords[currentWordIndex].options ? (
            <KasusQ
              pickedWord={selectedWords[currentWordIndex]}
              onAnswer={handleAnswer}
            />
          ) : (
            <>
              <SingleWordQ
                key={refreshKey} // 🔁 detta tvingar komponenten att laddas om
                pickedWord={selectedWords[currentWordIndex]}
                allWords={allWords}
                onAnswer={handleAnswer}
              />

              {showFollowUpQuestion &&
                (selectedWords[currentWordIndex].type == "verb" ? (
                  <div>
                    <ConjugationQ
                      pickedWord={selectedWords[currentWordIndex]}
                      onSecAnswer={handleFollowUpAnswer}
                    />
                  </div>
                ) : selectedWords[currentWordIndex].artikel !== undefined ? (
                  <div>
                   <ArtikelQ
                      pickedWord={selectedWords[currentWordIndex]}
                      onSecAnswer={handleFollowUpAnswer}
                    />
                  </div>
                ) : selectedWords[currentWordIndex].preposition !== undefined ? (
                  <div>
                    <PrepositionQ
                      pickedWord={selectedWords[currentWordIndex]}
                      onSecAnswer={handleFollowUpAnswer}
                    />
                  </div>
                ) : null)}
            </>
          )}
        </div>
      ) : (
        <div>
          <h2>🎉 Du är klar!</h2>
          <p>Rätt besvarade: {correctAnswers.length}</p>
          <p>Felaktiga försök: {wrongAnswers.length}</p>
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
    paddingRight: "3rem"
  },
};
