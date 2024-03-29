import { google } from 'googleapis';
import { SHEET_SCOPE_URL } from '../utils/constants.js';
import fs from 'fs/promises';
import logger from '../utils/logger.js';

async function readCellValue(SPREADSHEET_KEY, SHEET_NAME, CELL = "A1:Z") {
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
      range: `${SHEET_NAME}!${CELL}`,
    });

    const data = response.data.values;

    if (!data || data.length === 0) {
      logger.info('Sheet is empty.');
      return [];
    }
    return data;
  } catch (error) {
      logger.error('SHEET is not available', error.message);
      return [];
  }
}

async function writeCellValue(SPREADSHEET_KEY, SHEET_NAME, CELL, VALUE) {
    try {
        // Read the credentials file
        const credentialsData = await fs.readFile(process.env.CREDENTIAL_JSON_PATH);
        const credentials = JSON.parse(credentialsData);

        // Create a Google Auth object
        const auth = new google.auth.GoogleAuth({
            credentials,
            scopes: [SHEET_SCOPE_URL],
        });

        // Create a client instance
        const sheets = google.sheets({ version: 'v4', auth });

        // Write data to Google Sheets
        const result = await sheets.spreadsheets.values.update({
            spreadsheetId: SPREADSHEET_KEY,
            range: `${SHEET_NAME}!${CELL}`,
            valueInputOption: 'RAW',
            resource: {
                values: [[VALUE]],
            },
        });

        // Check if the write operation was successful
        const success = result.status === 200;
        return success;
    } catch (error) {
        logger.error('Error writing cell value:', error.message);
        return false;
    }
}

function getInfoBySubjectAndSheetName(data, subject, sheetName) {  
  for (let i = 1; i < data.length; i++) {
      if (data[i][0] === subject) {
          const sheetIndex = data[i].indexOf(sheetName);
          if (sheetIndex !== -1) {
              const sheetKey = data[i][1];
              const chatId = data[i][2];
              const qIndex = data[i][sheetIndex+1]
              const qCell = getColumnLetter(sheetIndex + 1) + (i + 1);;
              return { sheetKey, chatId , qIndex, qCell} ;
          }
      }
  }
  return null; 
}

function getColumnLetter(columnIndex) {
  let dividend = columnIndex + 1;
  let columnLetter = '';
  let modulo;

  while (dividend > 0) {
      modulo = (dividend - 1) % 26;
      columnLetter = String.fromCharCode(65 + modulo) + columnLetter;
      dividend = Math.floor((dividend - modulo) / 26);
  }

  return columnLetter;
}

export { readCellValue, writeCellValue, getInfoBySubjectAndSheetName};


