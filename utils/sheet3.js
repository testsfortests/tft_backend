
import axios from 'axios';
import { JWT } from 'google-auth-library';
import serviceAccount from '../resource/credentials.json' assert { type: 'json' };
import {DATA_SPREADSHEET_KEY,DATA_SHEET_NAME,generateSheetUrl } from '../config/env.js';
// const sheetsUrl = 'https://sheets.googleapis.com/v4/spreadsheets/178Jr7nTOk24Iac-f3-OdXz9vWgmLFp1D419B0w00Meg/values/DATA!A1:Z';

const sheetsUrl = generateSheetUrl(DATA_SPREADSHEET_KEY,DATA_SHEET_NAME)

// Get access token using service account credentials
async function getAccessToken() {
    try {
        const jwtClient = new JWT(
            {
                email: serviceAccount.client_email,
                key: serviceAccount.private_key,
                scopes: ['https://www.googleapis.com/auth/spreadsheets']
            }
        );

        // Use the provided credentials to generate a token
        const tokens = await jwtClient.authorize();
        return tokens.access_token;
    } catch (error) {
        console.error('Error getting access token:', error.message);
        throw error;
    }
}

async function getDataFromSheet() {
    try {
        const accessToken = await getAccessToken();

        const response = await axios.get(sheetsUrl, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        console.log('Data:', response.data.values);
        return response.data.values;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export {getDataFromSheet};
