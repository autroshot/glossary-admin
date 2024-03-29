import { Controller } from '@/types/controller';
import { MyTerm } from '@/types/models';
import { createDataResponse, createErrorResponse } from '../utils';
import { MyRow, MyWorkSheet } from './types';
import { getRows, getSheet } from './utils';

const createTerm: Controller = async (req, res) => {
  const term = req.body as MyTermWithIndexSignature;

  const sheet = await getSheet();

  if (await isDuplicatedTerm(sheet, term)) {
    return res.status(409).json({ message: '중복된 용어가 존재합니다.' });
  }
  await sheet.addRow(term);

  return res.status(200).json(createDataResponse(term));

  async function isDuplicatedTerm(
    sheet: MyWorkSheet,
    term: MyTermWithIndexSignature
  ): Promise<boolean> {
    const rows = await sheet.getRows();
    const result = rows.some((row) => {
      return row.english === term.english;
    });

    return result;
  }
};

const getTerms: Controller = async (req, res) => {
  const rows = await getRows();
  const terms = rows.map(toMyTerm);

  return res.status(200).json(createDataResponse(terms));

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

const updateTerm: Controller = async (req, res) => {
  const english = String(req.query.english);
  const term = req.body as MyTermWithIndexSignature;

  const rows = await getRows();

  const foundRow = rows.find((row) => row.english === english);
  if (!foundRow)
    return res
      .status(404)
      .json(createErrorResponse('용어를 찾을 수 없습니다.'));

  foundRow.korean = term.korean;
  foundRow.type = term.type;
  foundRow.field = term.field;
  foundRow.description = term.description;
  foundRow.source = term.source;

  await foundRow.save();

  return res.status(200).end();
};

const deleteTerm: Controller = async (req, res) => {
  const english = String(req.query.english);

  const rows = await getRows();
  const foundRow = rows.find((row) => row.english === english);
  if (!foundRow)
    return res
      .status(404)
      .json(createErrorResponse('용어를 찾을 수 없습니다.'));

  await foundRow.delete();

  return res.status(200).end();
};

type MyTermWithIndexSignature = MyTerm & SpreadsheetIndexSignature;

interface SpreadsheetIndexSignature {
  [header: string]: string | number | boolean;
}

export { createTerm, getTerms, updateTerm, deleteTerm };
