import { Glossary } from '@/types/models';
import { DataResponse } from '@/types/responses';
import axios from 'axios';

export async function getGlossaries() {
  const res = await axios.get<DataResponse<Glossary[]>>(
    '/api/google-glossaries'
  );

  return res.data.data;
}
