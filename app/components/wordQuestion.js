'use client';
import { useState, useEffect, useRef } from 'react';

import '../globals.css'

export default function WordQuestion({ pickedWord, allWords, onAnswer }) {
const [options, setOptions] = useState([]);
const [selected, setSelected] = useState(null);
const [isCorrect, setIsCorrect] = useState(null);

useEffect(() => {

    // Hämta två slumpmässiga felaktiga alternativ
    const wrongOptions = allWords
        .filter(w => w.german !== pickedWord.artikel)
        .sort(() => 0.5 - Math.random())
        .slice(0, 2);


        // Blanda rätt och fel
        const mixed = [...wrongOptions, pickedWord].sort(() => 0.5 - Math.random());
        setOptions(mixed); // sätter de blandade alternativen i state.
        setSelected(null); // nollställer användarens val.
        setIsCorrect(null); //nollställer om svaret är rätt/fel – så att nästa fråga börjar “rent”.

}, [pickedWord, allWords]);


const handleSelect = (option) => {
    setSelected(option);
    const correct = option.german === pickedWord.german;
    setIsCorrect(correct);
    onAnswer(pickedWord, correct);
};


return (

<div style={styles.container}>
      <h3>Vad är tyska för: <strong>{pickedWord.swedich}</strong>?</h3>
      
      
      <div style={styles.buttonContainer}>
            {options.map((opt, index) => (
                <div key={index}>
                <button
                
                onClick={() => handleSelect(opt)}
                style={{
                    ...styles.button,
                    border: selected === opt
                    ? (isCorrect ? '1px solid #68af68ff' : '1px solid #cf535fff')
                    : '1px solid #ccc',
                    backgroundColor: selected === opt
                    ? (isCorrect ? ' #294d29ff' : '#511117ff')
                    : '#000'
                }}
                >
          {opt.german}
        </button>
        
        </div>
      ))}

      </div>
      
      
</div>

    
);


}

const styles = {
  container: {
    paddingLeft: '10%',
    paddingRight: '2rem',
    paddingTop: '1rem',
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  buttonContainer: {
    paddingTop: '2rem',
    display: 'flex',
    gap: '2rem',
    justifyContent: 'center', // ← centrera horisontellt
    alignItems: 'center',
  },
  button: {
    display: 'block',
    margin: '0.5rem 0',
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    cursor: 'pointer',
    borderRadius: '4px',
    border: '1px solid #ccc',
    color: '#ccc',
    
  }

};