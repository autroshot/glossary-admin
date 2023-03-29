export interface MyGoogleGlossary {
  path: string;
  name: string;
}

export interface MyGoogleTerm extends Term {
  index: string;
}

export interface Term {
  english: string;
  korean: string;
}
