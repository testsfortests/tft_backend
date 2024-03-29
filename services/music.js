import gtts from "gtts";
import logger from '../utils/logger.js';

// const num1 = ["first","second","third","fourth"]
const num2 = ["a","b","c","d"]

// Function to convert text to speech and save to MP3 file using async/await
async function saveToMP3Async(text, filename) {
    return new Promise((resolve, reject) => {
        const tts = new gtts(text, 'en');
        tts.save(filename, function(err, result) {
            if (err) {
                reject(err); // Reject promise if there's an error
            } else {
                logger.info(`Speech saved to ${filename}`);
                resolve(); // Resolve promise if saving is successful
            }
        });
    });
}

// Function to create music files for the question and answer
async function createMusic(question, options, ans) {
    try {
        // Construct text for the question
        let text1 = `The problem of the day is: ${question}\n\nOptions are:\n`;
        options.forEach((option, index) => {
            text1 += `${num2[index]}. ${option}\n`;
        });

        // Construct text for the answer
        let text2 = `\nThe correct answer is: ${num2[ans-1]} that is ${options[ans - 1]}`;

        // Save question and answer to MP3 files using async/await
        await saveToMP3Async(text1, './resource/music/music_que.mp3');
        await saveToMP3Async(text2, './resource/music/music_ans.mp3');

        logger.info('Music files created successfully.');
    } catch (error) {
        logger.error('Error creating music files:', error);
    }
}



// // Example
// const question = `Which of the following activities is part of India's GDP? 
// 1. Activities in Indian embassies and consulates in other countries 
// 2. Air India services between two different countries 
// 3. Economic activities of residents of India in international waters 
// 4. Purchase of movie tickets by foreigners in India 
// Select the correct answer using the 
// code given below: `;

// const options = [
//     "1 only  ",
//     "1, 2 & 3 only",
//     "3 & 4 only",
//     "All of the above"
// ];
// const answer = "3";


// await createMusic(question,options,answer)

export {createMusic};