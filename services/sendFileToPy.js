import axios from 'axios';
import fs from 'fs'
import FormData from 'form-data'

async function sendFiles(filePaths) {
    const formData = new FormData();

    try {
        // Iterate over the file paths array
        for (const filePath of filePaths) {
            const fileStream = fs.createReadStream(filePath);
            // Extract file name from the path
            const fileName = filePath.split('/').pop();
            // Append file to FormData object with a dynamic field name
            formData.append(fileName, fileStream);
        }

        const response = await axios.post(`${BASE_URL_PY}upload/`, formData, {
            headers: {
                ...formData.getHeaders(), // Include headers from FormData object
                // Add any additional headers if needed
            },
        });

        console.log('Response:', response.data);
    } catch (error) {
        console.error('Error:', error.response.data);
    }
}

// Example usage: Send 5 files in one go with paths
const filePaths = [
    './resource/image/image_que.png',
    './resource/image/image_ans.png',
    './resource/image/music_que.png',
    './resource/image/music_ans.png',   
];

sendFiles(filePaths);
