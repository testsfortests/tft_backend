import express from 'express';
import {getDataFromSheet} from "../utils/sheet.js";
const router = express.Router();

// Get All Data 
// router.get('/getAllData', async (req, res) => {
//       try {
//         const data = await getGoogleSheetData();
//         res.json(data)
//       } catch (error) {
//         res.status(500).json({ message: error.message });
//       }
// });

// Route for retrieving data from Google Sheet
router.get('/getAllData', async (req, res) => {
  try {
    // const sheetId = 'YOUR_SHEET_ID';
    // const range = 'Sheet1!A1:B5';

    const data = await getDataFromSheet();
    res.json({ success: true, data });
  } catch (error) {
    console.error('Error in retrieving data from Google Sheet:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});


export default router;
