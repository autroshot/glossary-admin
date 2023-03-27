import axios from 'axios';

export async function getGlossaries() {
  const res = await axios.get('/api/google-glossaries');

  return res.data;
}
