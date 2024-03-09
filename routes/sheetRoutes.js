import express from 'express';
import {readCellValue,writeCellValue, getInfoBySubjectAndSheetName} from "../utils/sheet.js";
const router = express.Router();
import axios from 'axios';
import dotenv from "dotenv" 
import { callbackPromise } from 'nodemailer/lib/shared/index.js';
dotenv.config()

router.get('/getAllData', async (req, res) => {
  console.log("Get All Data handler called !!!")
  const { subject, sheet, sheetKey } = req.body;

  // Check if subject or sheet is missing
  if (!subject || !sheet) {
      return res.status(400).json({ success: false, message: "Subject or sheet is missing" });
  }
  try {
      let finalSheetKey = sheetKey; // Initialize finalSheetKey with the provided sheetKey

      // If sheetKey is not provided, fetch it first
      if (!sheetKey) {

          const getInfoResponse = await axios.get(`${process.env.BASE_URL}sheet/getInfoBySubjectAndSheetName`, {data : { subject, sheet }});

          if (!getInfoResponse.data.success) {
              return res.status(500).json({ success: false, message: "Call to getinfo of sheet failed" });
          }

          finalSheetKey = getInfoResponse.data.data.sheetKey;
      }

      const data = await readCellValue(finalSheetKey, sheet);
      if (!data || (Array.isArray(data) && data.length === 0))  {        
          return res.json({ success: false, message: "Failed to fetch all data for the sheet" });
      }

      res.json({ success: true, message: "Fetched all data successfully", data });
  } catch (error) {
      res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/getQData', async (req, res) => {
  try {
    const data = await readCellValue(process.env.DATA_SPREADSHEET_KEY,process.env.DATA_SHEET_NAME);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false,message :'Error in retrieving data from Google Sheet', error: error.message });
  } 
});

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

    const data = await readCellValue(process.env.DATA_SPREADSHEET_KEY,process.env.DATA_SHEET_NAME);
    if(!data){
      return res.status(400).json({success:false, message: "Data sheet didn't get access" });
    }

    const info = getInfoBySubjectAndSheetName(data, subject_name, sheet_name);
    
    if (!info) {
      return res.status(400).json({success:false, message: "Data not found for given subject and sheet" });
    } 
    res.json({ success: true,message:"Fetched info for given subject and sheet", data:info });
  } catch (error) {
    res.status(500).json({ success: false,message :'Error in retrieving data from Google Sheet', error: error.message });
  }
});


export default router;