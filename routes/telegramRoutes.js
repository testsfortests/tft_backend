import express from 'express';
import axios from 'axios';
const router = express.Router();
import { TESTING_CHAT_ID,POLL_URL,SEND_MSG_URL,BASE_URL } from '../config/env.js';

//done
router.post('/send-message', async (req, res) => {
    try {
        const message = req.body && req.body.message ? req.body.message : "HELLO, I AM TFTBOT";
        const chatId = req.body && req.body.chatId ? req.body.chatId :  TESTING_CHAT_ID  ;        

        const messageParams = {
            chat_id: chatId, 
            text: message
        };
        const response = await axios.post(SEND_MSG_URL, messageParams);
        res.status(200).json({ success: true,message:'Message sent successfully', data: response.data });
    } catch (error) {
        res.status(500).json({ success: false,message:'Error sending message', error: error.message });
    }
});

//done
router.post('/send-poll', async(req, res) => {
    const question = req.body && req.body.question ? req.body.question :"What is the capital of India?";        
    const options = req.body && req.body.options ? req.body.options : ["Bombay","New Delhi","Calcutta","Delhi"];        
    const answer = req.body && req.body.answer ? req.body.answer :  2  ;        
    const explanation = req.body && req.body.explanation ? req.body.explanation : "VISIT TESTS FOR TESTS";        
    const chatId = req.body && req.body.chatId ? req.body.chatId :  TESTING_CHAT_ID  ;        

    const parameters = {
        "chat_id": chatId, // handle
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
        res.status(200).json({ success: true,message:"Poll sent successfully", data: response.data }); 
    } catch (error) {
        console.error("Error:", error.message,"API POLL FAILED");
        res.status(500).json({ success: false,message:"API POLL FAILED", error: error.message }); 
    }
    
});

export default router;
