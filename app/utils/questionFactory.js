// utils/questionFactory.js
import SingleWordQ from "../components/questions/SingleWordQ";

import KasusQ from "../components/questions/KasusQ";
import ConjugationQ from "../components/questions/followupQ/conjugationQ";
import PrepositionQ from "../components/questions/followupQ/prepositionQ";
import AdjDeclensionQ from "../components/questions/AdjDeclensionQ";

export function getQuestionComponent(word) {


  if (word.options) return KasusQ;
  if (word.adj_declension) return AdjDeclensionQ;
  if (word.conjugation) return ConjugationQ;
  if (word.preposition) return PrepositionQ;
  
  return SingleWordQ;
}
