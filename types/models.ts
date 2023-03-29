export interface MyGoogleGlossary {
  path: string;
  name: string;
}

export interface GoogleGlossaryEntry {
  name: string;
  description: string;
  termsPair: {
    sourceTerm: GlossaryTerm;
    targetTerm: GlossaryTerm;
  };
}

export interface MyGoogleTerm extends Term {
  path: string;
}

interface Term {
  english: string;
  korean: string;
}

interface GlossaryTerm {
  languageCode: string;
  text: string;
}
