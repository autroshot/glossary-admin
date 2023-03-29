export interface GoogleGlossary {
  name: string;
  inputConfig: {
    gcsSource: {
      inputUri: string;
    };
  };
  entryCount: number;
  submitTime: string;
  endTime: string;
  displayName: string;
  languagePair: {
    sourceLanguageCode: string;
    targetLanguageCode: string;
  };
}

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
