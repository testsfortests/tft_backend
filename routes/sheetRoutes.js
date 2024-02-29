import express from 'express';
import {getDataFromSheet,getInfoBySubjectAndSheetName} from "../utils/sheet.js";
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

router.get('/getQData', async (req, res) => {
  try {
    const data = await getDataFromSheet(DATA_SPREADSHEET_KEY,DATA_SHEET_NAME);
    res.json({ success: true, data });
  } catch (error) {
    console.error('Error in retrieving data from Google Sheet:', error);
    res.status(500).json({ success: false, error: error.message });
  } 
});

router.get('/getInfoBySubjectAndSheetName', async (req, res) => {
  try {
    // const subject = req.body 
    const subject_name = req.body.subject 
    const sheet_name = req.body.sheet 
    if (!subject_name) {
      return res.status(400).json({ error: "Subject is not provided in the request body" });
    }
    if (!sheet_name) {
      return res.status(400).json({ error: "Sheet is not provided in the request body" });
    }
    const data = await getDataFromSheet(DATA_SPREADSHEET_KEY,DATA_SHEET_NAME);

    const info = getInfoBySubjectAndSheetName(data, subject_name, sheet_name);
    if (!info) {
      return res.status(400).json({ error: "Subject or sheet name not found." });
    } 
    res.json({ success: true, info });
  } catch (error) {
    console.error('Error in retrieving data from Google Sheet:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;