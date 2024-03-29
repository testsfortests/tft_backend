import axios from 'axios';
import fs from 'fs'
import FormData from 'form-data'
import path from 'path';
import logger from '../utils/logger.js';

import dotenv from "dotenv" 
dotenv.config()

const filePaths = [
    './resource/image/image_que.png',
    './resource/image/image_ans.png',
    './resource/music/music_que.mp3',
    './resource/music/music_ans.mp3',   
];

async function sendFiles(subject) {
    logger.info("SEND FILES TO PA CALLED!")
    const formData = new FormData();

    try {

        // Iterate over the file paths array
        for (const filePath of filePaths) {

            const fileStream = fs.createReadStream(filePath);

            // Extract file name from the path
            const fileName = path.basename(filePath);

            // Append file to FormData object with a dynamic field name
            formData.append('files', fileStream, fileName);
            logger.info(filePath)
        }
        formData.append('message',subject);

        const response = await axios.post(`${process.env.BASE_URL_PA}upload/`, formData, {
            headers: {
                ...formData.getHeaders(), // Include headers from FormData object
                // Add any additional headers if needed
            },
        });

        logger.info('Response:', response.data);
    } catch (error) {
        logger.error('Error:', error.response);
    }
}

// Function to delete files
async function deleteFiles() {
    try {
        for (const filePath of filePaths) {
            await fs.promises.unlink(filePath);
            logger.info(`File ${filePath} deleted successfully`);
        }
    } catch (error) {
        logger.error('Error deleting files:', error);
    }
}



// sendFiles(filePaths);
// deleteFiles();

export {sendFiles,deleteFiles};
