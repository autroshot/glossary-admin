import { GoogleGlossary } from '@/types/models';
import { DataResponse } from '@/types/responses';
import axios from 'axios';

export async function getGlossaries() {
  const res = await axios.get<DataResponse<GoogleGlossary[]>>(
    '/api/google-glossaries'
  );

  return res.data.data;
}
