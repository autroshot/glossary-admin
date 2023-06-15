import { MyTerm } from '@/types/models';
import { DataResponse } from '@/types/responses';
import axios from 'axios';

export async function getTerms(): Promise<MyTerm[]> {
  const res = await axios.get<DataResponse<MyTerm[]>>(`/api/my-glossary/terms`);

  return res.data.data;
}
