export const PORT=4000
export const BASE_URL = 'https://tft-backend.vercel.app/'


export const SPREADSHEET_KEY="14PY1yNdKIImeoKPikhH9RNMcLrD8WK7tev8CjEre51I"
export const SHEET_NAME="SHEET2!A1:Z"

export const DATA_SPREADSHEET_KEY="178Jr7nTOk24Iac-f3-OdXz9vWgmLFp1D419B0w00Meg"
export const DATA_SHEET_NAME="DATA!A1:Z"

export const SHEET_SCOPE_URL = 'https://www.googleapis.com/auth/spreadsheets.readonly';

// export const SHEET_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_KEY}/values/${SHEET_NAME}`;
export function generateSheetUrl(spreadsheetKey, sheetName) {
    console.log("callled",spreadsheetKey,sheetName)
    console.log("callled2",`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetKey}/values/${sheetName}`)
    return `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetKey}/values/${sheetName}`;
}
export const API_KEY = "AIzaSyAGAU7w5whpGwWbI-Cw6m1_6cqc0AkYuDM"

export const TESTING_CHAT_ID = "-1002141955840"
export const BOT_TOKEN = "6642256096:AAGqXFBKyzuM7dVvQOAVJ081ZRwHXQvbfcM"
export const POLL_URL = `https://api.telegram.org/bot${BOT_TOKEN}/sendPoll`;
export const SEND_MSG_URL = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

