'use client';
import { useState, useEffect, useRef } from 'react';

import '../globals.css'

export default function ConjugationQuestion({ pickedWord }) {
const [options, setOptions] = useState([]);
const [selected, setSelected] = useState(null);
const [isCorrect, setIsCorrect] = useState(null);

useEffect(() => {

    
}, []);





return (

<div style={styles.container}>
      <h3>har böjing <strong>{pickedWord.conjugation.du}</strong>?</h3>
     

      
      
      
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