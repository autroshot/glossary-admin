import { Controller } from '@/types/controller';
import { Glossary, MyRow } from './types';
import { getRows } from './utils';

const getTerms: Controller = async (req, res) => {
  const rows = await getRows();
  const terms = rows.map(toMyTerm);

  return res.status(200).json({ data: terms });

  function toMyTerm(row: MyRow): Glossary {
    return {
      english: row.english,
      korean: row.korean,
      type: row.type,
      field: row.field,
      description: row.description,
      source: row.source,
    };
  }
};

export { getTerms };
