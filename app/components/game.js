'use client';
import { useState, useEffect } from 'react';
import '../globals.css';
import WordQ from './wordQuestion.js';
import ArtikelQ from './artikelQuestion.js'
import ConjugationQ from "./conjugationQuestion.js"

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
    fetch('/data/file.json')
      .then(res => res.json())
      .then(data => {
        const wordBank = data.translations;
        const shuffled = [...wordBank].sort(() => 0.5 - Math.random());
        const fiveWords = shuffled.slice(0, 5);
        setSelectedWords(fiveWords);
        setAllWords(wordBank);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error loading JSON:', error)
        setIsLoading(false)
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
    
    console.log(`Svar på ${word.artikel}: ${correct ? 'rätt' : 'fel'}`);
      
        goToNextWord(word, correct);
    
  };

  const goToNextWord = (word, correct) => {

      if (correct) {
        setCorrectAnswers(prev => [...prev, word]);
        setSelectedWords(prevWords =>
          prevWords.filter(w => w.swedich !== word.swedich)
        );
        setCurrentWordIndex(0);
      } else {
        setWrongAnswers(prev => [...prev, word]);
        setCurrentWordIndex(prev => {
          const isLast = prev >= selectedWords.length - 1;
          return isLast ? 0 : prev + 1;
        });
      }

        setRefreshKey(prev => prev + 1); // 🔁 tvinga omrendering
      
  }

  const handleAnswer = (word, correct) => {
    console.log(`Svar på ${word.swedich}: ${correct ? 'rätt' : 'fel'}`);

    //dubbelkolla om det är rätt svar samt om det finns en möjlig följdfråga i jsonfilen
    
    //att göra: lägg till check om conjugation finns 
    const hasFollowUp = word.artikel !== undefined ;

    
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
    ) : selectedWords.length > 0 && currentWordIndex < selectedWords.length ? (
      <div>
          <p>Antal kvar: {selectedWords.length}</p>
          <WordQ
            key={refreshKey} // 🔁 detta tvingar komponenten att laddas om
            pickedWord={selectedWords[currentWordIndex]}
            allWords={allWords}
            onAnswer={handleAnswer}
          />
        {showFollowUpQuestion && (
          selectedWords[currentWordIndex].conjugation !== undefined  ? (
          <div>
          {console.log("Nuvarande ord:", selectedWords[currentWordIndex])}

            <ConjugationQ 
              pickedWord = {selectedWords[currentWordIndex]}
              onSecAnswer={handleFollowUpAnswer}
            />
            </div>

          ): selectedWords[currentWordIndex].artikel !== undefined ? (
              <div>
              {console.log("Nuvarande ord:", selectedWords[currentWordIndex])}

              <ArtikelQ 
                pickedWord = {selectedWords[currentWordIndex]}
                onSecAnswer={handleFollowUpAnswer}

              />
              </div>

          ): null 

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
    paddingLeft: '10%',
    paddingRight: '10%',
    paddingTop: '3rem',
    textAlign: 'left',
    maxWidth: '1800px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
};
