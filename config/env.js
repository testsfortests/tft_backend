export const PORT=4000
// export const BASE_URL = 'https://tft-backend.vercel.app/'
export const BASE_URL = 'http://localhost:4000/'

export const DATA_SPREADSHEET_KEY="178Jr7nTOk24Iac-f3-OdXz9vWgmLFp1D419B0w00Meg"
export const DATA_SHEET_NAME="DATA!A1:Z"

export const SHEET_SCOPE_URL = 'https://www.googleapis.com/auth/spreadsheets.readonly';

export function generateSheetUrl(spreadsheetKey, sheetName) {
    return `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetKey}/values/${sheetName}`;
}
export const API_KEY = "AIzaSyAGAU7w5whpGwWbI-Cw6m1_6cqc0AkYuDM"


export const TESTING_CHAT_ID = "-1002141955840"
export const BOT_TOKEN = "6642256096:AAGqXFBKyzuM7dVvQOAVJ081ZRwHXQvbfcM"
export const POLL_URL = `https://api.telegram.org/bot${BOT_TOKEN}/sendPoll`;
export const SEND_MSG_URL = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

