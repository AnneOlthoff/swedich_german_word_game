export function selectTrainingWords(wordBank, selectedCategories = [], count = 7) {
  const {
    nouns = [],
    verbs = [],
    adj_declension = [],
    prepositions = [],
    conjunctions = [],
    tables = [],
    other = []
  } = wordBank;

  // Mapp för kategorier + meta-kategorier
  //vilka kategorier man väljer bland anges i -> pages->index
  const categoryMap = {
  
    Substantiv: [ ...nouns],
    Adjektivändelser: [ ...adj_declension],
    Prepositioner: [ ...prepositions],
    Verb: [ ...verbs],
    Konjunktioner: [...conjunctions],
    Ordförståelse: [ ...verbs, ...nouns, ...other], // sammanslagen kategori
    Tabeller: [...tables]
  };

  // Om användaren har valt kategorier → använd dem
  const chosenPools = selectedCategories.flatMap(cat => categoryMap[cat] || []);

  // Om inget val → ta alla ord
  const pool = chosenPools.length > 0 ? chosenPools : Object.values(categoryMap).flat();

  // Slumpa ord från poolen
  const shuffled = [...pool].sort(() => 0.5 - Math.random());
  

  

  // Begränsa till count
  return shuffled.slice(0, count);
}
