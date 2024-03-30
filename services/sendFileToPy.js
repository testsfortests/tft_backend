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
    './uploads/' 
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
        logger.error('Error:', error);
    }
}

// Function to delete files
async function deleteFileOrDirectory() {
    try {
        // Iterate over each path in filePaths
        for (const filePath of filePaths) {
            // Check if the path exists
            const exists = await fs.promises.access(filePath).then(() => true).catch(() => false);
            
            if (!exists) {
                logger.error(`Path ${filePath} does not exist.`);
                continue;
            }

            // Check if the path is a file or directory
            const stats = await fs.promises.lstat(filePath);

            if (stats.isFile()) {
                // If it's a file, delete the file
                await fs.promises.unlink(filePath);
                logger.info(`File ${filePath} deleted successfully`);
            } else if (stats.isDirectory()) {
                // If it's a directory, delete all files within it
                await deleteFilesInDirectory(filePath);
                logger.info(`All files inside directory ${filePath} deleted successfully`);
            }
        }
    } catch (error) {
        logger.error(`Error deleting files or directories: ${error.message}`);
    }
}

async function deleteFilesInDirectory(directoryPath) {
    try {
        // Get the list of files in the directory
        const files = await fs.promises.readdir(directoryPath);

        // Iterate over each file in the directory
        for (const file of files) {
            // Construct the full path of the file
            const filePath = path.join(directoryPath, file);
            // Delete the file
            await fs.promises.unlink(filePath);
            logger.info(`File ${filePath} deleted successfully`);
        }
    } catch (error) {
        logger.error(`Error deleting files in directory ${directoryPath}: ${error.message}`);
    }
}

// sendFiles(filePaths);
// deleteFiles();

export {sendFiles,deleteFileOrDirectory};
