import {
  GoogleSpreadsheetRow,
  GoogleSpreadsheetWorksheet,
  PaginationOptions,
} from 'google-spreadsheet';

interface Glossary extends IndexSignature {
  english: string;
  korean: string;
  type: string;
  field: string;
  description: string;
  source: string;
}

type MyRow<T extends IndexSignature> = {
  [Property in keyof T]: T[Property];
} & GoogleSpreadsheetRow;

class MyWorkSheet extends GoogleSpreadsheetWorksheet {
  async getRows(options?: PaginationOptions): Promise<MyRow<Glossary>[]> {
    return (await super.getRows(options)) as MyRow<Glossary>[];
  }

  async addRow(
    values:
      | {
          [header: string]: string | number | boolean;
        }
      | Array<string | number | boolean>,
    options?: { raw: boolean; insert: boolean }
  ): Promise<MyRow<Glossary>> {
    return (await super.addRow(values, options)) as MyRow<Glossary>;
  }

  async addRows(
    rowValues: Array<
      | {
          [header: string]: string | number | boolean;
        }
      | Array<string | number | boolean>
    >,
    options?: { raw: boolean; insert: boolean }
  ): Promise<MyRow<Glossary>[]> {
    return (await super.addRows(rowValues, options)) as MyRow<Glossary>[];
  }
}

interface IndexSignature {
  [key: string]: string | number | boolean;
}

export type { Glossary, MyRow, MyWorkSheet };
