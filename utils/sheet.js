import axios from 'axios';
import {API_KEY,generateSheetUrl } from '../config/env.js';

async function getDataFromSheet(SPREADSHEET_KEY,SHEET_NAME) {
  try {
    const sheet_url = generateSheetUrl(SPREADSHEET_KEY,SHEET_NAME)
    const response = await axios.get(sheet_url, {
        params: {
            key: API_KEY,
        }
    });
    return response.data; 
  } catch (error) {
    console.error('Error retrieving data:', error.message);
    throw error;
  }
}

export {getDataFromSheet};