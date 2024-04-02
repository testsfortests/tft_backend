import express from 'express';
import axios from 'axios';
const router = express.Router();
import {getInfoBySubjectAndSheetName, writeCellValue} from "../utils/sheet.js"
import { createQuestionImage,createAnswerImage } from '../services/image.js';
import { createMusic } from '../services/music.js';
import { deleteFileOrDirectory, sendFiles } from '../services/sendFileToPy.js';
import logger from '../utils/logger.js';
import path from 'path';
import fs from 'fs';
import FormData from 'form-data';

const logDirectory = './resource/logs';
const logFilePath = path.join(logDirectory, 'logfileJS.log');

router.all('/send', async (req, res) => {
    // Clear the log file before writing logs
    fs.writeFileSync(logFilePath, '');
    logger.info("API MAIN FUNC CALLED...")
    try {
        const getInfoResponse = await axios.get(`${process.env.BASE_URL}sheet/getQData`);
        logger.info("Q DATA FETCHED...")

        const data = getInfoResponse.data.data
        // data.length
        for (let i = 1; process.env.TEST_MODE === "QA" ? i < 2 : i < data.length; i++) {
          const [subject, sheetKey, chatId, ...sheets] = data[i];
          logger.info(`SUBJECT - ${subject} starting...`)

          const numberOfPairs = sheets.length / 2;
          if(numberOfPairs == 0){
            logger.warn(`Skipping SUBJECT - ${subject} `)
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
          else{
            logger.info(`Info fetched By Subject and Sheet for : SUBJECT - ${subject} & SHEET - ${sheet}`)
          }
          let { qIndex, qCell } = info;
          qIndex = parseInt(qIndex, 10); 
          qIndex += 1

          const getAllData = await axios.get(`${process.env.BASE_URL}sheet/getAllData`,{data :{subject,sheet,sheetKey}});
          if (!getAllData || !getAllData.data || !getAllData.data.success){
            logger.error(`Data not found for subject ${subject} and sheet ${sheet}`);
            continue;
          }
          else {
            logger.info(`Data found for SUBJECT - ${subject} & SHEET - ${sheet}`);
          }
          const responseData = getAllData.data.data;
          if (responseData.length == qIndex){
              qIndex = 1
              logger.warn(`Reinitializing QIndex for  SUBJECT - ${subject} & SHEET - ${sheet}`);
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
            logger.error(`Telegram Failed to send poll...`);
            continue;
          }          
          else {
            logger.info(`Telegram Successful to send poll...`);
          }
          const haveWritten = await writeCellValue(process.env.DATA_SPREADSHEET_KEY,process.env.DATA_SHEET_NAME,qCell,qIndex)
          if (!haveWritten){
            logger.error(`Not written to the cell SHEET - ${sheet}, CELL - ${qCell}, VALUE - ${qIndex}`);
            continue;
          }
          else{
            logger.info(`written to the cell SHEET - ${sheet}, CELL - ${qCell}, VALUE - ${qIndex}`);
          }
          // TODO 
          await deleteFileOrDirectory()
          logger.info(`Deleted unnecessary files from server...`);
          // createQuestionImage(question,options,answer)
          await Promise.all([
            createQuestionImage(question, options, answer),
            createAnswerImage(question, options, answer)
            ]);
          logger.info("Image creation completed...")
          // createAnswerImage(question,options,answer)
          await createMusic(question,options,answer)
          logger.info("Music creation completed...")
          logger.info("Sending files to PA server for further process...")
          await sendFiles(subject)
          // await deleteFiles()
          logger.info("Files processed successfully from PA Server...")
        }

        const logFilePath = "./resource/logs/logfileJS.log";
        const formData = new FormData();
        const file_data = fs.readFileSync(logFilePath);
        const fileBuffer = Buffer.from(file_data);
        formData.append('file', fileBuffer, {
          filename: 'logfileJS.log' // Provide filename if needed
        });
        const response = await axios.post(`${process.env.BASE_URL}tele/send-file`, formData, {
            headers: {
                ...formData.getHeaders(),
            },
        });
        console.log("Sent log file to Telegram ");

        res.json({ success: true, message:"API MAIN EXECUTED SUCCESSFULLY" });

    } catch (error) {
        const logFilePath = "./resource/logs/logfileJS.log";
        const formData = new FormData();
        const file_data = fs.readFileSync(logFilePath);
        const fileBuffer = Buffer.from(file_data);
        formData.append('file', fileBuffer, {
          filename: 'logfileJS.log' // Provide filename if needed
        });
        const response = await axios.post(`${process.env.BASE_URL}tele/send-file`, formData, {
            headers: {
                ...formData.getHeaders(),
            },
        });
        console.log("Sent log file to Telegram ");
        
      res.status(500).json({ success: false,message :'Error in sending full poll', error: error });
    }

  });

export default router;


