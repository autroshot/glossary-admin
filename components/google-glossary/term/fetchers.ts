import { MyGoogleGlossary, MyGoogleTerm, Term } from '@/types/models';
import { DataResponse } from '@/types/responses';
import axios from 'axios';

export async function createTerm(
  glossaryName: MyGoogleGlossary['name'],
  term: Term
): Promise<void> {
  await axios.post(`/api/google-glossaries/${glossaryName}/terms`, term);

  return;
}

export async function getTerms(glossaryName: MyGoogleGlossary['name']) {
  const res = await axios.get<DataResponse<MyGoogleTerm[]>>(
    `/api/google-glossaries/${glossaryName}/terms`
  );

  return res.data.data;
}
