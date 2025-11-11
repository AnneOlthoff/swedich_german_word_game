export function selectTrainingWords(wordBank, count = 6) {
  const {
    nouns = [],
    verbs = [],
    adj_declension = [],
    prepositions = [],
    conjunction = [],
    other = []
  } = wordBank;

  const getRandom = arr => arr.length > 0 ? arr[Math.floor(Math.random() * arr.length)] : null;

  // Välj minst en från varje kategori
  const selected = [
    getRandom(adj_declension),
    getRandom(adj_declension),
    getRandom(adj_declension),
    getRandom(adj_declension),
    getRandom(adj_declension)
  ].filter(Boolean);

  console.log("nouns:", nouns);
  console.log("verbs:", verbs);
  console.log("adj_declension:", adj_declension);
  console.log("prepositions:", prepositions);
  console.log("conjunction:", conjunction);
  console.log("other:", other);

  const allQuestions = [...nouns, ...verbs, ...adj_declension, ...prepositions, ...conjunction, ...other];

  // Beräkna hur många extra vi behöver
  const extraNeeded = Math.max(0, count - selected.length);

  const remaining = allQuestions.filter(q => !selected.includes(q));
  const extra = [...remaining].sort(() => 0.5 - Math.random()).slice(0, extraNeeded);

  console.log("selected:", selected);
  console.log("extra:", extra);

  return [...selected, ...extra].sort(() => 0.5 - Math.random());
}