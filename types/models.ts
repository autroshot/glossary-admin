export interface MyGoogleGlossary {
  path: string;
  name: string;
}

export interface MyGoogleTerm extends Term {
  path: string;
}

interface Term {
  english: string;
  korean: string;
}
