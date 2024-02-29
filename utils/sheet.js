// // import { google } from 'googleapis';
// import axios from 'axios';
// // import credentials from '../resource/credentials.json' assert { type: 'json' };
// import {SHEET_SCOPE_URL,API_KEY,generateSheetUrl } from '../config/env.js';
// // const RANGE = 'SHEET22!A1:Z'; 

// // async function getGoogleSheetData() {
// //   const auth = new google.auth.GoogleAuth({
// //     credentials,
// //     scopes: [SHEET_SCOPE_URL],
// //   });

// //   // Create a client instance
// //   const sheets = google.sheets({ version: 'v4', auth });

// //   try {
// //     const response = await sheets.spreadsheets.values.get({
// //       spreadsheetId: SPREADSHEET_KEY,
// //       range: RANGE,
// //     });

// //     const data = response.data.values;
// //     console.log('Google Sheet Data:', data);
// //     return data;
// //   } catch (error) {
// //     console.error('Error fetching data from Google Sheet:', error.message);
// //     return error;
// //   }
// // }

// async function getDataFromSheet(SPREADSHEET_KEY,SHEET_NAME) {
//   try {
//     console.log(SPREADSHEET_KEY,SHEET_NAME,"pawan")
//     sheet_url = generateSheetUrl(SPREADSHEET_KEY,SHEET_NAME)
//     console.log(sheet_url,"and",API_KEY)
//     const response = await axios.get(sheet_url, {
//         params: {
//             key: API_KEY, // Replace with your Google Sheets API key
//             // Additional parameters as needed
//         }
//     });
//     return response.data; 
//   } catch (error) {
//     console.error('Error retrieving data:', error.message);
//     throw error;
//   }
// }
// export {getDataFromSheet};
