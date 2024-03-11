import axios from 'axios';
import fs from 'fs'
import FormData from 'form-data'
import path from 'path';
import dotenv from "dotenv" 
dotenv.config()

const filePaths = [
    './resource/image/image_que.png',
    './resource/image/image_ans.png',
    './resource/music/music_que.mp3',
    './resource/music/music_ans.mp3',   
];

async function sendFiles() {
    const formData = new FormData();

    try {
        console.log("hiii")

        // Iterate over the file paths array
        for (const filePath of filePaths) {

            const fileStream = fs.createReadStream(filePath);

            // Extract file name from the path
            const fileName = path.basename(filePath);

            // Append file to FormData object with a dynamic field name
            formData.append('files', fileStream, fileName);
            console.log(filePath)

        }

        const response = await axios.post(`${process.env.BASE_URL_PY}upload/`, formData, {
            headers: {
                ...formData.getHeaders(), // Include headers from FormData object
                // Add any additional headers if needed
            },
        });

        console.log('Response:', response.data);
    } catch (error) {
        console.error('Error:', error.response);
    }
}

// Function to delete files
function deleteFiles() {
    // Iterate over the array of file paths
    filePaths.forEach(filePath => {
        // Use fs.unlink to delete the file
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error(`Error deleting file ${filePath}:`, err);
                return;
            }
            console.log(`File ${filePath} deleted successfully`);
        });
    });
}


// sendFiles(filePaths);
// deleteFiles();

export {sendFiles,deleteFiles};
