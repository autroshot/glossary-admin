export interface Glossary {
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

export interface GlossaryEntry {
  name: string;
  description: string;
  termsPair: {
    sourceTerm: GlossaryTerm;
    targetTerm: GlossaryTerm;
  };
}

interface GlossaryTerm {
  languageCode: string;
  text: string;
}
