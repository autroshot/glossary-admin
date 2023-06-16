import { MyTerm } from '@/types/models';
import { DataResponse } from '@/types/responses';
import axios from 'axios';

export async function createTerm(term: MyTerm): Promise<void> {
  await axios.post('/api/my-glossary/terms', term);

  return;
}

export async function getTerms(): Promise<MyTerm[]> {
  const res = await axios.get<DataResponse<MyTerm[]>>('/api/my-glossary/terms');

  return res.data.data;
}

export async function updateTerm(term: MyTerm): Promise<void> {
  await axios.put<DataResponse<MyTerm>>(
    `/api/my-glossary/terms/${term.english}`,
    term
  );

  return;
}
