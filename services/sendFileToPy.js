const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

// Function to send audio and image files using Axios
async function sendFiles() {
    const formData = new FormData();

    // Add audio file
    const audioFilePath = 'path_to_your_audio_file'; // Update with the path to your audio file
    const audioFile = fs.createReadStream(audioFilePath);
    formData.append('audio', audioFile);

    // Add image file
    const imageFilePath = 'path_to_your_image_file'; // Update with the path to your image file
    const imageFile = fs.createReadStream(imageFilePath);
    formData.append('image', imageFile);

    try {
        const response = await axios.post('your_api_endpoint', formData, {
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

// Call the function to send files
sendFiles();
