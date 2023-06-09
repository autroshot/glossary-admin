import { MyTerm } from '@/types/models';
import { DataResponse } from '@/types/responses';
import axios from 'axios';

async function createTerm(term: MyTerm): Promise<void> {
  await axios.post('/api/my-glossary/terms', term);

  return;
}

async function getTerms(): Promise<MyTerm[]> {
  const res = await axios.get<DataResponse<MyTerm[]>>('/api/my-glossary/terms');

  return res.data.data;
}

async function updateTerm(term: MyTerm): Promise<void> {
  await axios.put(`/api/my-glossary/terms/${term.english}`, term);

  return;
}

async function deleteTerm(english: string): Promise<void> {
  await axios.delete(`/api/my-glossary/terms/${english}`);

  return;
}

export { createTerm, getTerms, updateTerm, deleteTerm };
