// import fs from 'fs';
// import axios from 'axios';
// import jwt from 'jsonwebtoken';

// // Load service account credentials from a local file
// // import serviceAccount from './credentials.json';
// import serviceAccount from '../resource/credentials.json' assert { type: 'json' };

// import {DATA_SPREADSHEET_KEY,DATA_SHEET_NAME,generateSheetUrl } from '../config/env.js';

// const sheetsUrl = generateSheetUrl(DATA_SPREADSHEET_KEY,DATA_SHEET_NAME)

// // Google Sheets API URL
// // const sheetsUrl = 'https://sheets.googleapis.com/v4/spreadsheets/YOUR_SPREADSHEET_ID/values/Sheet1!A1:B5';

// async function getAccessToken() {
//     try {
//         // Create a JWT token using service account credentials
//         const token = jwt.sign({}, serviceAccount.private_key, {
//             issuer: serviceAccount.client_email,
//             subject: serviceAccount.client_email,
//             audience: 'https://www.googleapis.com/oauth2/v4/token', // Correct audience
//             expiresIn: '1h',
//             algorithm: 'RS256'
//         });

//         // Request a token using the JWT
//         const response = await axios.post('https://www.googleapis.com/oauth2/v4/token', {
//             grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
//             assertion: token,
//             scope: 'https://www.googleapis.com/auth/spreadsheets.readonly' // Correct scope
//         });

//         return response.data.access_token;
//     } catch (error) {
//         console.error('Error getting access token:', error.message);
//         throw error;
//     }
// }

// // Fetch data from Google Sheets
// async function getDataFromSheet() {
//     try {
//         const accessToken = await getAccessToken();

//         const response = await axios.get(sheetsUrl, {
//             headers: {
//                 Authorization: `Bearer ${accessToken}`
//             }
//         });

//         console.log('Data:', response.data.values);
//     } catch (error) {
//         console.error('Error fetching data:', error);
//     }
// }

// export {getDataFromSheet};
