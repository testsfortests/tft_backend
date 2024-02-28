import express from 'express';
const router = express.Router();
import { TESTING_CHAT_ID,POLL_URL } from '../config/env.js';


router.post('/send-message', (req, res) => {
    // Replace 'CHAT_ID' with the chat ID where you want to send the message
    const chatId = process.env.TESTING_CHAT_ID;

    // Text message to send
    const message = 'Hello from your bot!';

    // Send the message
    bot.sendMessage(chatId, message)
        .then(() => {
            console.log('Message sent successfully');
            res.status(200).json({ message: 'Message sent successfully' });
        })
        .catch(error => {
            console.error('Error sending message:', error.message);
            res.status(500).json({ message: 'Failed to send message', error: error.message });
        });
});

router.post('/send-poll', (req, res) => {
    // let explanation = ""; // Set default explanation
    // if (explanation === "") {
    //     explanation = "VISIT TESTS FOR TESTS";
    // }
    
    // console.log(`question - ${question} , answer - ${answer} , options - ${options}`);
    
    const parameters = {
        "chat_id": process.env.TESTING_CHAT_ID,
        "question": "question",
        "options": JSON.stringify(["options","don"]), // Convert options to JSON string
        "is_anonymous": true,
        // "correct_option_id": answer - 1,
        // "explanation": explanation,
        // "type": "quiz"
    };

    // fetch(POLL_URL, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body:JSON.stringify(parameters)
    // })
    // .then(response => {
    //     if (response.ok) {
    //         console.log("Poll sent successfully.",response);
    //         res.json(response)
    //     } else {
    //         res.json(response)

    //         console.error("Failed to send poll.",response);
    //     }
    // })
    // .catch(error => {
    //     console.error("Error:", error);
    // });
    try {
        const response = await axios.post(POLL_URL, parameters, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log("Poll sent successfully.", response.data);
        res.status(200).json({ success: true, data: response.data }); // Send success response with data
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ success: false, error: error.message }); // Send error response
    }
    
});


export default router;