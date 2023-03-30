export interface MyGoogleGlossary {
  id: string;
}

export interface MyGoogleTerm extends Term {
  index: string;
}

export interface Term {
  english: string;
  korean: string;
}
