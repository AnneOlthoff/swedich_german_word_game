'use client';
import { useState, useEffect, useRef } from 'react';

import '../globals.css'

export default function ArtikelQuestion({ pickedWord, onSecAnswer }) {
const [options, setOptions] = useState([]);
const [selected, setSelected] = useState(null);
const [isCorrect, setIsCorrect] = useState(null);

useEffect(() => {

    setOptions(['der', 'die', 'das'])
    
}, []);



const handleSelect = (option) => {
    setSelected(option);
    const correct = option === pickedWord.artikel;
    setIsCorrect(correct);
    
    // Vänta 2 sekunder innan vi skickar svaret vidare
    setTimeout(() => {
        if (correct){
        <h>rätt svar</h>

      }
      onSecAnswer(pickedWord, correct);
      
    }, 2000);

};

return (

<div style={styles.container}>
      <h3>Vilken artikel har ordet?</h3>
     
         <div style={styles.buttonContainer}>
        {options.map((opt) => (
                
            <button
              key = {opt}
                onClick={() => handleSelect(opt)}
                style={{
                    ...styles.button,
                    border: selected === opt
                    ? (pickedWord.artikel === opt ? '1px solid #68af68ff' : '1px solid #cf535fff')
                    : '1px solid #ccc',
                    backgroundColor: selected === opt
                    ? (pickedWord.artikel === opt ? ' #294d29ff' : '#511117ff')
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
            ? '!'
            : `❌ Fel. Rätt svar är "${pickedWord.artikel}".`}
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