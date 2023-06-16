import { GoogleTerm, MyGoogleGlossary, MyGoogleTerm } from '@/types/models';
import { DataResponse } from '@/types/responses';
import axios from 'axios';

export async function createTerm(
  glossaryId: MyGoogleGlossary['id'],
  term: GoogleTerm
): Promise<void> {
  await axios.post(`/api/google-glossaries/${glossaryId}/terms`, term);

  return;
}

export async function getTerms(glossaryId: MyGoogleGlossary['id']) {
  const res = await axios.get<DataResponse<MyGoogleTerm[]>>(
    `/api/google-glossaries/${glossaryId}/terms`
  );

  return res.data.data;
}

export async function updateTerm(
  glossaryId: MyGoogleGlossary['id'],
  termId: MyGoogleTerm['id'],
  term: GoogleTerm
): Promise<void> {
  await axios.put(`/api/google-glossaries/${glossaryId}/terms/${termId}`, term);

  return;
}

export async function deleteTerm(
  glossaryId: MyGoogleGlossary['id'],
  termId: MyGoogleTerm['id']
): Promise<void> {
  await axios.delete(`/api/google-glossaries/${glossaryId}/terms/${termId}`);

  return;
}
