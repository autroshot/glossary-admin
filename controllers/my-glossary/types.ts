import {
  GoogleSpreadsheetRow,
  GoogleSpreadsheetWorksheet,
  PaginationOptions,
} from 'google-spreadsheet';

interface MyTerm {
  english: string;
  korean: string;
  type: string;
  field: string;
  description: string;
  source: string;
}

type MyRow = MyTerm & GoogleSpreadsheetRow;

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

export type { MyTerm, MyRow, MyWorkSheet };
