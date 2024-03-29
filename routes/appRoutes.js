import express from 'express';
import axios from 'axios';
const router = express.Router();
import {getInfoBySubjectAndSheetName, writeCellValue} from "../utils/sheet.js"
import { createQuestionImage,createAnswerImage } from '../services/image.js';
import { createMusic } from '../services/music.js';
import { deleteFiles, sendFiles } from '../services/sendFileToPy.js';
import logger from '../utils/logger.js';
import path from 'path';
import fs from 'fs';
import FormData from 'form-data';

const logDirectory = './resource/logs';
const logFilePath = path.join(logDirectory, 'logfile.log');

router.get('/send', async (req, res) => {
    // Clear the log file before writing logs
    fs.writeFileSync(logFilePath, '');
    logger.info("API MAIN FUNC CALLED!!!")
    try {
        const getInfoResponse = await axios.get(`${process.env.BASE_URL}sheet/getQData`);
        const data = getInfoResponse.data.data
        // data.length
        for (let i = 1; i<2; i++) {
          const [subject, sheetKey, chatId, ...sheets] = data[i];
          const numberOfPairs = sheets.length / 2;
          if(numberOfPairs == 0){
            logger.info(`Skipping SUBJECT - ${subject} `)
            continue
          }

          const today = new Date();
          const utcTime = today.getTime();
          const istOffset = 5.5 * 60 * 60 * 1000; 
          const istTime = new Date(utcTime + istOffset);
          const day = istTime.getDate();
          const remainder = day % numberOfPairs;

          const selectedSheetIndex = remainder * 2;
          const sheet = sheets[selectedSheetIndex];
          // const sheet = "SHEET2"

          const info = getInfoBySubjectAndSheetName(data,subject,sheet)
          if (info === null) {
            logger.error(`Info not found for subject ${subject} and sheet ${sheet}`);
            continue; 
          }

          let { qIndex, qCell } = info;
          qIndex = parseInt(qIndex, 10); 
          qIndex += 1

          const getAllData = await axios.get(`${process.env.BASE_URL}sheet/getAllData`,{data :{subject,sheet,sheetKey}});
          if (!getAllData || !getAllData.data || !getAllData.data.success){
            logger.error(`Data not found for subject ${subject} and sheet ${sheet}`);
            continue;
          }
          const responseData = getAllData.data.data;
          if (responseData.length == qIndex){
              qIndex = 1
          }
          let queData = responseData[qIndex];

          while (queData.length < 6 || (queData.length>=6 && (queData[0]==='' || queData[1]==='' || queData[2]==='' || queData[3]==='' || queData[4]==='' || queData[5]===''))) {
            if (responseData.length == qIndex){
              break;
            }
            qIndex += 1;
            queData = responseData[qIndex];
          }

          if (responseData.length == qIndex){
            break;
          }
        
          const question = queData[0]
          const options = queData.slice(1,5)
          const answer = queData[5]
          
          const teleResponse = await axios.post(`${process.env.BASE_URL}tele/send-poll`,{question,options,answer,chatId});
          if (!teleResponse && !teleResponse.data && !teleResponse.data.success){
            logger.error(`Telegram Failed to send poll!`);
            continue;
          }          
          const haveWritten = await writeCellValue(process.env.DATA_SPREADSHEET_KEY,process.env.DATA_SHEET_NAME,qCell,qIndex)
          if (!haveWritten){
          logger.error(`Not written to the cell SHEET - ${sheet}, CELL - ${qCell}, VALUE - ${qIndex}`);
          continue;
          }
          // TODO 
          await deleteFiles()
          // createQuestionImage(question,options,answer)
          await Promise.all([
            createQuestionImage(question, options, answer),
            createAnswerImage(question, options, answer)
            ]);

          // createAnswerImage(question,options,answer)
          await createMusic(question,options,answer)
          await sendFiles(subject)
          // await deleteFiles()
        }

        const logFilePath = "./resource/logs/logfile.log";
        const logFileData = fs.readFileSync(logFilePath); // Read the file synchronously

        // Write the contents to a temporary file
        const tempFilePath = './temp.log';
        fs.writeFileSync(tempFilePath, logFileData);

        // Create a read stream from the temporary file
        const fileStream = fs.createReadStream(tempFilePath);

        const formData = new FormData();
        formData.append('file', fileStream);

        const response = await axios.post(`${process.env.BASE_URL}tele/send-file`, formData, {
            headers: {
                ...formData.getHeaders(),
            },
        });

        console.log("Sent log file to Telegram ");
        res.json({ success: true, message:"API MAIN EXECUTED SUCCESSFULLY" });

    } catch (error) {
      res.status(500).json({ success: false,message :'Error in sending full poll', error: error });
    }

  });

export default router;


