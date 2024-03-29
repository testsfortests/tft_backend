import dotenv from "dotenv" 
dotenv.config()

export const SHEET_SCOPE_URL = 'https://www.googleapis.com/auth/spreadsheets';

export function generateSheetUrl(spreadsheetKey, sheetName) {
    return `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetKey}/values/${sheetName}`;
}

export const POLL_URL = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendPoll`;
export const SEND_MSG_URL = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`;
export const SEND_FILE_URL = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendDocument`
