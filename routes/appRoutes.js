import express from 'express';
import axios from 'axios';
const router = express.Router();
import { TESTING_CHAT_ID,POLL_URL,SEND_MSG_URL,BASE_URL } from '../config/env.js';

// no need for now
router.post('/send-message', async (req, res) => {
    try {
        const message = req.body && req.body.message ? req.body.message : "HELLO, I AM TFTBOT";
      
        const messageParams = {
            chat_id: TESTING_CHAT_ID, 
            text: message
        };
        const response = await axios.post(SEND_MSG_URL, messageParams);
        res.status(200).json({ success: true, message:'Message sent successfull', data: response.data });
    } catch (error) {
        res.status(500).json({ success: false,message : 'Error sending message', error: error.message });
    }
});


router.post('/send-poll', async (req, res) => {
    const { subject, sheet } = req.body;

    try {
        const infoResponse = await axios.get(`${BASE_URL}sheet/getInfoBySubjectAndSheetName`, {data : { subject, sheet }});

        if (!infoResponse.data.success) {
            return res.status(500).json({ success: false, message: "Call to getinfo of sheet failed" });
        }
        const sheetKey = infoResponse.data.data.sheetKey;
        const chatId = infoResponse.data.data.chatId;

        // Fetch data from the sheet using sheetKey and subject
        const dataResponse = await axios.get(`${BASE_URL}sheet/getAllData`, { data: { subject, sheet,sheetKey } });

        if (!dataResponse || !dataResponse.data.success) {
            return res.status(500).json({ success: false, message: `Failed to fetch data from the sheet ${dataResponse.message}` });
        }

        const qiResponse = await axios.get(`${BASE_URL}mongo/QI`,{data : { subject, sheet }});

        if (!qiResponse.data.success) {
            return res.status(500).json({ success: false, message: "Failed to fetch question index" });
        }

        let questionIndex = qiResponse.data.data[0].numbers.questionIndex + 1;

        // Use questionIndex to get the question, options, answer, and explanation from the data
        let questionData = dataResponse.data.data.values[questionIndex]; // Assuming data is an array of questions

        // Check if any of the required elements are missing or empty
        while (questionData.length < 6 || !questionData[0] || !questionData[1] || !questionData[2] || !questionData[3] || !questionData[4] || !questionData[5]) {
            questionIndex = questionIndex + 1
            questionData = dataResponse.data.data.values[questionIndex]; 
        }
        const question = questionData[0];
        const options = questionData.slice(1,5);
        const answer = questionData[5];
        const explanation = questionData[6] || undefined;

        // Send poll using retrieved data
        const parameters = {
            "chat_id": TESTING_CHAT_ID,
            "question": question,
            "options": JSON.stringify(options),
            "is_anonymous": true,
            "correct_option_id": answer - 1,
            "explanation": explanation,
            "type": "quiz"
        };
        const pollResponse = await axios.post(POLL_URL, parameters, { headers: { 'Content-Type': 'application/json' } });
        
        const postQIResponse = await axios.post(`${BASE_URL}mongo/QI`,{ subject, sheet, questionIndex });
        
        if (!postQIResponse.data.success) {
            return res.status(500).json({ success: false, message: "Failed to post question index" });
        }
        res.status(200).json({ success: true,message:"Poll sent successfully", data: pollResponse.data });
    } catch (error) {
        res.status(500).json({ success: false,message:"Failed while sending the Poll" ,error: error });
    }
});

router.get('/cron',(req,res)=>{
    res.status(200).end('Hello Cron2!');
})
export default router;