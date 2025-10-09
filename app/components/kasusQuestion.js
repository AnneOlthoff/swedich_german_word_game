'use client';
import { useState, useEffect, useRef } from 'react';

import '../globals.css'

export default function ArtikelQuestion({ pickedWord, onAnswer }) {
const [options, setOptions] = useState([]);
const [selected, setSelected] = useState(null);
const [isCorrect, setIsCorrect] = useState(null);

useEffect(() => {

    setSelected(null);
    setIsCorrect(null);

    setOptions([pickedWord.kasusOptions[0], pickedWord.kasusOptions[1], pickedWord.kasusOptions[2]])
    
}, [pickedWord]);

const handleSelect = (option) => {
    setSelected(option);
    const correct = option === pickedWord.german;
    setIsCorrect(correct);
    
    // Vänta 6 sekunder innan vi skickar svaret vidare
    setTimeout(() => {
       onAnswer(pickedWord, correct);
    }, 6000);

};

return (

<div style={styles.container}>
        <h3>Vilken är den rätta översättningen för</h3>
        <h4>{pickedWord.swedish}</h4>

        <div style={styles.buttonContainer}>
        {options.map((opt) => (
                
            <button
            key = {opt}
                onClick={() => handleSelect(opt)}
                style={{
                    ...styles.button,
                    border: selected === opt
                    ? (pickedWord.german === opt ? '1px solid #68af68ff' : '1px solid #cf535fff')
                    : '1px solid #ccc',
                    backgroundColor: selected === opt
                    ? (pickedWord.german === opt ? ' #294d29ff' : '#511117ff')
                    : '#000'
                }}
                >
                {opt}

            </button>     
        ))}
        </div>
        {selected && (
        <p style={{ marginTop: '1rem' }}>
            {isCorrect
            ? (
                <>
                    Rätt! <br />
                    förklaring: "{pickedWord.explanation}"
                </>
             )
            :(
                <>
                    ❌ fel! rätt svar är "{pickedWord.german}"<br />
                    förklaring: "{pickedWord.explanation}"
                </>
             )
            }
        </p>
        )}

      
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