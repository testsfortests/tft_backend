// Import necessary modules or define any required dependencies
import axios from "axios";

// Define the function or logic you want to execute as part of the cron job
async function myCronJob() {
    try {
        // Perform tasks such as fetching data from an API, updating a database, etc.
        const response = await axios.post('tft-backend.vercel.app/api/send-message');

        // Process the response data or perform other operations
        console.log('Cron job executed successfully:', response.data);
    } catch (error) {
        console.error('Error executing cron job:', error.message);
    }
}

// Call the function to execute the cron job logic
myCronJob();
