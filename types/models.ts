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

export interface GoogleGlossaryEntry {
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
