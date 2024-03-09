import express from 'express';
const router = express.Router();
import multer from 'multer';
import path from 'path'
// const sanitizeFilename = require('sanitize-filename'); // Install sanitize-filename
import sanitizeFilename from 'sanitize-filename'
import {uploadFile} from "../services/megad.js"

// const upload = multer({ dest: 'uploads/' }); // Define the destination folder for uploaded files

// Configure Multer storage
// Function to sanitize filename
const sanitizeFile = (req, file, cb) => {
    const sanitized = path.basename(sanitizeFilename(file.originalname), path.extname(file.originalname));
    cb(null, sanitized);
  };
  
  const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
      sanitizeFile(req, file, (err, sanitizedName) => {
        if (err) return cb(err);
        // Extract the extension from the original filename (lowercase)
        const ext = path.extname(file.originalname).toLowerCase();
  
        const now = new Date();
        // Convert to IST (adjust offset as needed)
        const istDate = new Date(now.getTime() + 5.5 * 60 * 60 * 1000); // IST is UTC +5:30
  
        const timestamp = istDate
          .toISOString()
          .replace(/T/, '-') // Replace 'T' with hyphen
          .replace(/\..+/, '') // Remove milliseconds
          .substring(0, 16); // Extract mmddhh without seconds
  
        cb(null, sanitizedName + '-' + timestamp + (ext ? ext : '')); // Append extension only if it exists
      });
    }
  });
  
  
  const upload = multer({ storage: storage });

router.post('/upload-to-mega',upload.single('file'), async (req, res) => {
    try {
        // const { filePath } = req.body; // Assuming the client sends the file path in the request body
        // if (!filePath) {
        //     return res.status(400).json({ success: false, message: "Provide filePath " });
        // }
        if (!req.file) {
            return res.status(400).send('No file was uploaded.');
        }
        const filePath = req.file.path; // Get the file path of the uploaded file

        // Call the uploadFile function with the provided file path
        await uploadFile(filePath);

        res.status(200).send('File uploaded successfully!');
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).send('Internal server error');
    }
});


export default router;
