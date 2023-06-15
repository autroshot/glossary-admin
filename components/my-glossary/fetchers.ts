import { Glossary } from '@/controllers/my-glossary/types';
import { DataResponse } from '@/types/responses';
import axios from 'axios';

export async function getTerms(): Promise<Glossary[]> {
  const res = await axios.get<DataResponse<Glossary[]>>(
    `/api/my-glossary/terms`
  );

  return res.data.data;
}
