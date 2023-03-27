import axios from 'axios';

export async function createGlossary() {
  const res = await axios.post('/api/google-glossaries');

  return res.data;
}

export async function getGlossaries() {
  const res = await axios.get('/api/google-glossaries');

  return res.data;
}
