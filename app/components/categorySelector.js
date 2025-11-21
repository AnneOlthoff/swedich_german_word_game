"use client";

import "../globals.css";


export default function CategorySelector({ categories, selectedCategories, onToggle, onStart }) {
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h3>Välj vilka typer av frågor du vill ha:</h3>
      {categories.map(cat => (
       <div>
         <button
          key={cat}
          onClick={() => onToggle(cat)} 
           style={{
          ...styles.button,
          border:  selectedCategories.includes(cat)
            ? '1px solid #68af68ff'
            : '1px solid var(--heading)',
          backgroundColor:  selectedCategories.includes(cat)
            ? 'var(--correctAnswer)' 
            : 'var(--background-third)'
        }}
        >
          {cat}
        </button>
        
        </div>
        
      ))}
      <br />
      <button
        onClick={onStart}
        className="mainButton"
      >
        Starta spelet
      </button>
    </div>
  );
} 


const styles = {
  
  button: {
    width: "calc(100%)",
    textAlign: "center",
    display: "fill",
    margin: "0.5rem 0",
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    cursor: "pointer",
    borderRadius: "4px",
    border: "1px solid #ccc",
    color: "var(--text)",
    maxWidth: "30rem",
  },
};