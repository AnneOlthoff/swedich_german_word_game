"use client";
export default function CategorySelector({ categories, selectedCategories, onToggle, onStart }) {
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h3>Välj vilka typer av frågor du vill ha:</h3>
      {categories.map(cat => (
        <button
          key={cat}
          onClick={() => onToggle(cat)}
          style={{
            backgroundColor: selectedCategories.includes(cat) ? "lightgreen" : "lightgray",
            margin: "0.5rem",
            padding: "0.5rem 1rem",
            borderRadius: "6px"
          }}
        >
          {cat}
        </button>
      ))}
      <br />
      <button
        onClick={onStart}
        style={{
          marginTop: "1rem",
          padding: "0.7rem 1.5rem",
          backgroundColor: "#0070f3",
          color: "white",
          borderRadius: "6px"
        }}
      >
        Starta spelet
      </button>
    </div>
  );
}