import express from 'express';
import axios from 'axios';
const router = express.Router();
import { TESTING_CHAT_ID,POLL_URL,SEND_MSG_URL,BASE_URL } from '../config/env.js';


router.post('/send-message', async (req, res) => {
    try {
        const message = req.body && req.body.message ? req.body.message : "HELLO, I AM TFTBOT";
      
        const messageParams = {
            chat_id: TESTING_CHAT_ID, 
            text: message
        };
        const response = await axios.post(SEND_MSG_URL, messageParams);
        console.log('Message sent successfully:', response.data);
        res.status(200).json({ success: true, data: response.data });
    } catch (error) {
        console.error('Error sending message:', error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});

router.post('/send-poll', async(req, res) => {
    const question = req.body && req.body.question ? req.body.question :"What is the capital of India?";        
    const options = req.body && req.body.options ? req.body.options : ["Bombay","New Delhi","Calcutta","Delhi"];        
    const answer = req.body && req.body.answer ? req.body.answer :  2  ;        
    const explanation = req.body && req.body.explanation ? req.body.explanation : "VISIT TESTS FOR TESTS";        

    console.log(question)
    const parameters = {
        "chat_id": TESTING_CHAT_ID,
        "question": question,
        "options": JSON.stringify(options), 
        "is_anonymous": true,
        "correct_option_id": answer-1,
        "explanation": explanation,
        "type": "quiz"
    };

    try {
        const response = await axios.post(POLL_URL, parameters, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log("Poll sent successfully.", response.data);
        res.status(200).json({ success: true, data: response.data }); 
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ success: false, error: error }); 
    }
    
});


export default router;