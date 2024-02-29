import express from 'express';
import {getDataFromSheet} from "../utils/sheet.js";
const router = express.Router();
import { SPREADSHEET_KEY,SHEET_NAME, DATA_SPREADSHEET_KEY, DATA_SHEET_NAME} from '../config/env.js';

router.get('/getAllData', async (req, res) => {
      try {
        const data = await getDataFromSheet(SPREADSHEET_KEY,SHEET_NAME);
        res.json({ success: true, data });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
});

router.get('/getQI', async (req, res) => {
  try {
    const data = await getDataFromSheet(DATA_SPREADSHEET_KEY,DATA_SHEET_NAME);
    res.json({ success: true, data });
  } catch (error) {
    console.error('Error in retrieving data from Google Sheet:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
