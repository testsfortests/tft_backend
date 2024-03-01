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

router.put('/updateQuestionIndex', async (req, res) => {
  try {
    const subject_name = req.body.subject;
    const sheet_name = req.body.sheet;

    if (!subject_name) {
      return res.status(400).json({ error: "Subject is not provided in the request body" });
    }
    if (!sheet_name) {
      return res.status(400).json({ error: "Sheet is not provided in the request body" });
    }

    const data = await getDataFromSheet(DATA_SPREADSHEET_KEY, DATA_SHEET_NAME);
    console.log("paw1",data)

    // Find the question index based on subject and sheet name
    // const questionIndex = findQuestionIndex(data, subject_name, sheet_name);
    const response = getInfoBySubjectAndSheetName(data, subject_name, sheet_name);
    console.log("paw2",response)

    const question_index = response.question_index

    console.log("paw3",question_index)
    // if (questionIndex === -1) {
    //   return res.status(400).json({ error: "Subject or sheet name not found." });
    // }

    // // Update the question index by 1
    // data[questionIndex].questionIndex += 1;

    // Perform the update in the spreadsheet (not shown here, you need to implement this)
    const CELL = "M2"
    const res = updateDataToSheet(DATA_SPREADSHEET_KEY,DATA_SHEET_NAME,CELL,parseInt(question_index)+1)
    // console.log("paw4",res)


    res.json({ success: true, message: `Question index updated successfully to ${question_index}` });
  } catch (error) {
    console.error('Error in updating question index:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});


export default router;