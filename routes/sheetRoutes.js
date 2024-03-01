import express from 'express';
import {getDataFromSheet,getInfoBySubjectAndSheetName} from "../utils/sheet.js";
const router = express.Router();
import axios from 'axios';
import { DATA_SPREADSHEET_KEY, DATA_SHEET_NAME, BASE_URL} from '../config/env.js';

//done
router.get('/getAllData', async (req, res) => {
  const { subject, sheet } = req.body;
  if(!subject || !sheet){
    return res.status(500).json({status:false,message: "subject or sheet is missing" });
  }
  try {
    const response = await axios.get(`${BASE_URL}sheet/getInfoBySubjectAndSheetName`, {data:{subject,sheet}});
    if (!response.data.success){
      return res.status(500).json({status:false,message: "call to getinfo of sheet got failed" });
    }
    const data = await getDataFromSheet(response.data.data.sheetKey,sheet+"!A1:Z");

    if(!data){
      return res.status(500).json({status:false,message: "failed to fetch all data for a sheet" });
    }
    res.json({ success: true,message:"Fetched all data successfully" ,data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//done
router.get('/getQData', async (req, res) => {
  try {
    const data = await getDataFromSheet(DATA_SPREADSHEET_KEY,DATA_SHEET_NAME);
    res.json({ success: true, data });
  } catch (error) {
    console.error('Error in retrieving data from Google Sheet:', error);
    res.status(500).json({ success: false, error: error.message });
  } 
});

// done
router.get('/getInfoBySubjectAndSheetName', async (req, res) => {
  try {
    // const subject = req.body 
    const subject_name = req.body.subject 
    const sheet_name = req.body.sheet 
    if (!subject_name) {
      return res.status(400).json({success:false, message: "Subject is not provided in the request body" });
    }
    if (!sheet_name) {
      return res.status(400).json({success:false, message: "Sheet is not provided in the request body" });
    }
    const data = await getDataFromSheet(DATA_SPREADSHEET_KEY,DATA_SHEET_NAME);
    if(!data){
      return res.status(400).json({success:false, message: "Data sheet didn't get access" });
    }

    const info = getInfoBySubjectAndSheetName(data, subject_name, sheet_name);
    if (!info) {
      return res.status(400).json({success:false, message: "Data not found for given subject and sheet" });
    } 
    res.json({ success: true,message:"Fetched info for given subject and sheet", data:info });
  } catch (error) {
    console.error('Error in retrieving data from Google Sheet:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;