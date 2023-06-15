import { Controller } from '@/types/controller';
import { MyTerm } from '@/types/models';
import { MyRow } from './types';
import { getRows, getSheet } from './utils';

const createTerm: Controller = async (req, res) => {
  const term = req.body as SpreadsheetIndexSignature;

  const sheet = await getSheet();
  await sheet.addRow(term);

  return res.status(200).json({ data: term });
};

const getTerms: Controller = async (req, res) => {
  const rows = await getRows();
  const terms = rows.map(toMyTerm);

  return res.status(200).json({ data: terms });

  function toMyTerm(row: MyRow): MyTerm {
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

interface SpreadsheetIndexSignature {
  [header: string]: string | number | boolean;
}

export { createTerm, getTerms };
