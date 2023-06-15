import { GoogleSpreadsheet } from 'google-spreadsheet';
import { MyRow, MyWorkSheet } from './types';

async function getRows(): Promise<MyRow[]> {
  const sheet = await getSheet();
  const rows = await sheet.getRows();

  return rows;
}

async function getSheet(): Promise<MyWorkSheet> {
  const doc = await getDoc();
  const workSheet = doc.sheetsByTitle['glossary'] as MyWorkSheet;

  return workSheet;
}

async function getDoc() {
  const googleSheetId = process.env.SPREADSHEET_GOOGLE_SHEET_ID;
  const googleServiceAccountEmail =
    process.env.SPREADSHEET_GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const googlePrivateKey = process.env.SPREADSHEET_GOOGLE_PRIVATE_KEY;

  if (
    googleSheetId === undefined ||
    googleServiceAccountEmail === undefined ||
    googlePrivateKey === undefined
  ) {
    throw new Error('환경 변수에 스프레드시트 구글 키가 존재하지 않습니다.');
  }

  const doc = new GoogleSpreadsheet(googleSheetId);

  await doc.useServiceAccountAuth({
    client_email: googleServiceAccountEmail,
    private_key: googlePrivateKey.replace(/\\n/gm, '\n'),
  });
  await doc.loadInfo();

  return doc;
}
