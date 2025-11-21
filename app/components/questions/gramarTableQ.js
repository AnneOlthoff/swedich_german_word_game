"use client";
import { useState, useEffect } from "react";
import "../../globals.css";

export default function GrammarTableQ({ tableData, onFinish }) {
  const { name, columns, rows, data } = tableData;

  // Skapa en 2D-array för användarens svar
  const [userAnswers, setUserAnswers] = useState(
    rows.map(() => columns.map(() => "")) // tomma strängar
  );

  const [isCompleted, setIsCompleted] = useState(false);

  // Hantera input
  const handleInputChange = (rowIndex, colIndex, value) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[rowIndex][colIndex] = value.trim();
    setUserAnswers(updatedAnswers);
  };

  // ✅ Nollställ när tabellen byts
  
useEffect(() => {
  // Nollställ när tabellen byts
  setUserAnswers(rows.map(() => columns.map(() => "")));
}, [rows, columns]);


  return (
    <div>
      <h3>{name}</h3>
      <table
        className="grammar-table"
        style={{ margin: "auto", borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th></th>
            {columns.map((col, index) => (
              <th key={index}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td style={{ fontWeight: "bold" }}>{row}</td>
              {columns.map((col, colIndex) => {
                const userValue = (userAnswers[rowIndex]?.[colIndex] || "").trim();
                const correctValue = (
                  data[row]?.[colIndex] || ""
                ).toLowerCase();

                const isCorrect =
                  userValue.trim().toLowerCase() ===
                  (correctValue ? correctValue.toLowerCase() : "");

                return (
                  <td
                    key={colIndex}
                    style={{
                      padding: "0.5rem",
                      border: `2px ${
                        userValue
                          ? isCorrect
                            ? "var(-correctAnswer)"
                            : "#8e2832ff"
                          : "var(--text)"
                      }`,
                    }}
                  >
                    <input
                      type="text"
                      value={userValue}
                      onChange={(e) =>
                        handleInputChange(rowIndex, colIndex, e.target.value)
                      }
                      style={{
                        width: "5rem",
                        borderRadius: "4px",
                        textAlign: "center",
                        border: `1px solid ${
                          userValue
                            ? isCorrect
                              ? "var(--correctAnswer)" // grön kant om rätt
                              : "#8e2832ff" // röd kant om fel
                            : "var(--text)" // standardfärg innan man skriver
                        }`,
                      }}
                    />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
