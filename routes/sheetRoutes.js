import express from 'express';
import {getGoogleSheetData} from "../utils/sheet.js";
const router = express.Router();

// Get All Data 
router.get('/getAllData', async (req, res) => {
      try {
        const data = await getGoogleSheetData();
        res.json(data)
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
});

export default router;
