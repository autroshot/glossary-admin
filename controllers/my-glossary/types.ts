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

type MyRow = Glossary & GoogleSpreadsheetRow;

class MyWorkSheet extends GoogleSpreadsheetWorksheet {
  async getRows(options?: PaginationOptions): Promise<MyRow[]> {
    return (await super.getRows(options)) as MyRow[];
  }

  async addRow(
    values:
      | {
          [header: string]: string | number | boolean;
        }
      | Array<string | number | boolean>,
    options?: { raw: boolean; insert: boolean }
  ): Promise<MyRow> {
    return (await super.addRow(values, options)) as MyRow;
  }

  async addRows(
    rowValues: Array<
      | {
          [header: string]: string | number | boolean;
        }
      | Array<string | number | boolean>
    >,
    options?: { raw: boolean; insert: boolean }
  ): Promise<MyRow[]> {
    return (await super.addRows(rowValues, options)) as MyRow[];
  }
}

interface IndexSignature {
  [key: string]: string | number | boolean;
}

export type { Glossary, MyRow, MyWorkSheet };
