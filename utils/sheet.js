import { google } from 'googleapis';
import { SHEET_SCOPE_URL } from '../utils/constants.js';

async function getGoogleSheetData(SPREADSHEET_KEY, SHEET_NAME) {
  const RANGE = SHEET_NAME + '!A1:Z';

  const credentialsData = await fs.readFile(process.env.CREDENTIAL_JSON_PATH);
  const credentials = JSON.parse(credentialsData);

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: [SHEET_SCOPE_URL],
  });

  // Create a client instance
  const sheets = google.sheets({ version: 'v4', auth });

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_KEY,
      range: RANGE,
    });

    const data = response.data.values;
    return data;
  } catch (error) {
    console.error('Error fetching data from Google Sheet:', error.message);
    return error;
  }
}

export {getGoogleSheetData};