import axios from 'axios';

export async function createGlossary() {
  const res = await axios.post('/api/google-glossary');

  return res.data;
}
