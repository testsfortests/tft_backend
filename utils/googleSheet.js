import { google } from 'googleapis';
// import axios from 'axios';
import credentials from '/etc/secrets/credentials.json' assert { type: 'json' };
// import { SPREADSHEET_KEY,SHEET_SCOPE_URL,API_KEY,SHEET_URL } from '../config/env.js';


const RANGE = 'SHEET22!A1:Z'; 

async function getGoogleSheetData() {
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
    console.log('Google Sheet Data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching data from Google Sheet:', error.message);
    return error;
  }
}

// async function getDataFromSheet() {
//   try {
//     const response = await axios.get(SHEET_URL, {
//         params: {
//             key: API_KEY, // Replace with your Google Sheets API key
//             // Additional parameters as needed
//         }
//     });
//     return response.data; 
//   } catch (error) {
//     console.error('Error retrieving data:', error);
//     throw error;
//   }
// }
export {getGoogleSheetData};