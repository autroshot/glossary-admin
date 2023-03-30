// 기존 리소스 - https://cloud.google.com/translate/docs/reference/rest/v3/projects.locations.glossaries
export interface MyGoogleGlossary {
  // 기존 리소스의 displayName
  id: string;
}

// 기존 리소스 - https://cloud.google.com/translate/docs/reference/rest/v3/projects.locations.glossaries.glossaryEntries
export interface MyGoogleTerm extends Term {
  // 기존 리소스의 name에서 마지막 / 뒤의 문자열
  index: string;
}

export interface Term {
  english: string;
  korean: string;
}
