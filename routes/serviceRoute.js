import express from 'express';
const router = express.Router();
import {uploadFile} from "../services/megad.js"

import {upload} from "../utils/multer.js"

router.post('/upload-to-mega',upload.single('file'), async (req, res) => {
    try {
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
