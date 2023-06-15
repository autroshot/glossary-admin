// 기존 리소스 - https://cloud.google.com/translate/docs/reference/rest/v3/projects.locations.glossaries
interface MyGoogleGlossary {
  // 기존 리소스의 displayName
  id: string;
}

// 기존 리소스 - https://cloud.google.com/translate/docs/reference/rest/v3/projects.locations.glossaries.glossaryEntries
interface MyGoogleTerm extends GoogleTerm {
  // 기존 리소스의 name에서 마지막 / 뒤의 문자열
  id: string;
}

interface GoogleTerm {
  english: string;
  korean: string;
}

interface MyTerm extends SpreadsheetIndexSignature {
  english: string;
  korean: string;
  type: string;
  field: string;
  description: string;
  source: string;
}

interface SpreadsheetIndexSignature {
  [header: string]: string | number | boolean;
}

export type { MyGoogleGlossary, MyGoogleTerm, GoogleTerm, MyTerm };
