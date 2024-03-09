import fs from 'fs';
import path from 'path';
import { Storage } from 'megajs'
import { config } from 'dotenv';
config();

const email = process.env.MEGA_EMAIL;
const password = process.env.MEGA_PASS;

// Define the uploadFile function

// Function to upload file to Mega without encryption
async function uploadFile(filePath) {
    try {
        // Create a new instance of Storage and wait until it's ready
        const storage = await new Storage({
            email: process.env.MEGA_EMAIL,
            password: process.env.MEGA_PASS
        }).ready;

        // Upload the file using streams
        const uploadStream = storage.upload({
            name: path.basename(filePath), // Use the original file name
            size: fs.statSync(filePath).size // Use the file size
        });

        // Pipe the file stream to the upload stream
        fs.createReadStream(filePath).pipe(uploadStream);

        // Wait for the upload to complete
        await uploadStream.complete;

        // Delete the uploaded file from the server's upload folder
        fs.unlinkSync(filePath);
    } catch (error) {
        console.error('Error uploading file to Mega:', error);
        throw error;
    }
}
export {uploadFile};

// // Example usage
// const filePath = './resource/video.mp4'; // Provide the actual file path
// uploadFile(filePath);
