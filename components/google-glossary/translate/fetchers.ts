import { MyGoogleGlossary } from '@/types/models';
import { DataResponse } from '@/types/responses';
import axios from 'axios';

export async function translate(
  glossaryId: MyGoogleGlossary['id'],
  text: string
) {
  const res = await axios.post<DataResponse<string>>(
    `/api/google-glossaries/${glossaryId}/translate`,
    { text }
  );

  return res.data.data;
}
