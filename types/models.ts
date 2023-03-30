// https://cloud.google.com/translate/docs/reference/rest/v3/projects.locations.glossaries
export interface MyGoogleGlossary {
  // displayName
  id: string;
}

// https://cloud.google.com/translate/docs/reference/rest/v3/projects.locations.glossaries.glossaryEntries
export interface MyGoogleTerm extends Term {
  // name에서 마지막 / 뒤의 문자열
  index: string;
}

export interface Term {
  english: string;
  korean: string;
}
