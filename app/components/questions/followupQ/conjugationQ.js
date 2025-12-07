"use client";
import { useState, useEffect } from "react";
import AnsButton from "../../answerButton.js";
import "../../../globals.css"
export default function ConjugationQuestion({ pickedWord, onSecAnswer }) {
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const [pronoun, setPronoun] = useState(null);
  const [correctForm, setCorrectForm] = useState(null);
  const [step, setStep] = useState(0); // 0 = presens, 1 = preteritum, 2 = mening
  const [sentenceType, setSentenceType] = useState(null);

  useEffect(() => {
    setSelected(null);
    setIsCorrect(null);

    if (step === 0 || step === 1) {
      // Presens eller Preteritum
      const conjugationPairs =
        step === 0
          ? Object.entries(pickedWord.conjugation_presens)
          : Object.entries(pickedWord.conjugation_preteritum);

      const [randomPronoun, randomForm] =
        conjugationPairs[Math.floor(Math.random() * conjugationPairs.length)];

      setPronoun(randomPronoun);
      setCorrectForm(randomForm);

      const wrongForms = conjugationPairs
        .filter(([_, f]) => f !== randomForm)
        .map(([_, f]) => f)
        .sort(() => 0.5 - Math.random())
        .slice(0, 5); //visa 5 alternativ

      const mixedOptions = [...wrongForms, randomForm].sort(
        () => 0.5 - Math.random()
      );
      setOptions(mixedOptions);
    } else if (step === 2) {
      // Meningsfråga – välj slumpmässigt tempus
      const sentenceRand = Math.random();
      if (sentenceRand < 0.33) setSentenceType("presens");
      else if (sentenceRand < 0.66) setSentenceType("preteritum");
      else setSentenceType("perfekt");

      const correctSentence =
        sentenceType === "presens"
          ? pickedWord.sentence.conjugation_presens
          : sentenceType === "preteritum"
          ? pickedWord.sentence.conjugation_preteritum
          : pickedWord.sentence.conjugation_perfekt;

      setCorrectForm(correctSentence);

      const wrongSentences = [
        pickedWord.sentence.conjugation_presens,
        pickedWord.sentence.conjugation_preteritum,
        pickedWord.sentence.conjugation_perfekt
      ].filter(s => s !== correctSentence);

      const mixedOptions = [...wrongSentences, correctSentence].sort(
        () => 0.5 - Math.random()
      );
      setOptions(mixedOptions);
      setPronoun(null);
    }
  }, [pickedWord, step, sentenceType]);

  const handleSelect = option => {
    setSelected(option);
    const correct = option === correctForm;
    setIsCorrect(correct);

    setTimeout(() => {
      if (step < 2) {
        setStep(step + 1); // gå till nästa fråga
      } else {
        onSecAnswer(pickedWord, correct); // sista frågan klar
      }
    }, 1500);
  };

  return (
    <div>
      <h3>
        {step === 2 ? (
          <>Vilken mening är korrekt i <strong>{sentenceType}</strong>?</>
        ) : (
          <>
            Hur böjer man <strong>{pickedWord.german}</strong> med{" "}
            <strong>{pronoun}</strong> i <strong>{step === 0 ? "presens" : "preteritum"}</strong>?
          </>
        )}
      </h3>

      <div className="buttonContainer">
        {options.map((opt, index) => (
          <div key={`${opt}-${index}`}>
            <AnsButton
              option={opt}
              selected={selected}
              correctValue={correctForm}
              handleSelect={() => handleSelect(opt)}
            />
          </div>
        ))}
      </div>
      {selected && (
        <p style={{ marginTop: "1rem" }}>
          {isCorrect ? <> Rätt!</> : <>❌ Fel! Rätt svar är "{correctForm}"</>}
        </p>
      )}
    </div>
  );
}


