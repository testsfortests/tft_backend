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


function getInfoBySubjectAndSheetName(data, subject, sheetName) {
  for (let i = 1; i < data.values.length; i++) {
      if (data.values[i][0] === subject) {
          const sheetIndex = data.values[i].indexOf(sheetName);
          if (sheetIndex !== -1 && sheetIndex % 2 !== 0) {
              const sheetKey = data.values[i][1];
              const chatId = data.values[i][2];
              const question_index = data.values[i][sheetIndex + 1];
              return { sheetKey, chatId, question_index };
          }
      }
  }
  return null; 
}

// can update data in sheet using googleapis and google-auth-library, but these are not supported by vercel 
export {getDataFromSheet, getInfoBySubjectAndSheetName};