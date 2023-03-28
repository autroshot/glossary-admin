import axios from 'axios';
import { Glossary } from './types/models';
import { DataResponse } from './types/responses';

export async function getGlossaries() {
  const res = await axios.get<DataResponse<Glossary[]>>(
    '/api/google-glossaries'
  );

  return res.data.data;
}
