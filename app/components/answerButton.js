"use client";

export default function AnsButton({ option, selected, correctValue, handleSelect}) {
  
    const isSelected = selected === option;
    const isCorrect = option === correctValue;

    return (    
    <div>
       
      <button
        key= {option}
        onClick={() => handleSelect(option)}
        style={{
          ...styles.button,
          border: isSelected
            ? isCorrect ? '1px var(-correctAnswer)' : '1px solid #cf535fff'
            : '1px solid var(--heading)',
          backgroundColor: isSelected
            ? isCorrect ? 'var(--correctAnswer)' : 'var(--wrongAnswer)'
            : 'var(--background-third)'
        }}
      >
        {option}
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