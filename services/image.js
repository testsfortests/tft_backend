import fs from 'fs';
import { createCanvas } from 'canvas';

function createQuestionImage(question, options, ans) {    
    const img_width = 1080;
    const img_height = 1920;
    
    const canvas = createCanvas(img_width, img_height);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgba(255, 255, 255, 1)'; // White background
    ctx.fillRect(0, 0, img_width, img_height);
    
    let x_cord = 50;
    let y_cord = 60;
    const line_height = 60
    
    ctx.fillStyle = 'rgba(0, 0, 240, 0.1)'; // Red text color
    ctx.font = 'bold 60px Arial, sans-serif'; 
    
    const starter = "PROBLEM OF THE DAY"
    let rectWidth = ctx.measureText(starter).width + 20; 
    let rectHeight = 80;
    let rectX = 150 + x_cord;
    let rectY = y_cord - 40;
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 3; 
    ctx.strokeRect(rectX, rectY, rectWidth, rectHeight);
    
    ctx.fillStyle = 'rgba(0, 0, 240, 0.1)';
    ctx.fillRect(rectX, rectY, rectWidth, rectHeight);
    
    ctx.fillStyle = '#FF0000'; // Red text color
    ctx.font = 'bold 60px Arial, sans-serif'; 
    ctx.fillText(starter, 160 + x_cord, y_cord+20);
    
    y_cord += line_height*2 

    ctx.fillStyle = '#8c5ad6'; // Purple text color
    ctx.font = 'bold 45px serif';
    
    let lines = question.split('\n');
    
    for (let line of lines) {
        const words = line.split(' ');
        let current_line = '';
    
        for (let word of words) {
            const testWidth = ctx.measureText(current_line + ' ' + word).width;
            if (testWidth > img_width - x_cord - 45) {
                ctx.fillText(current_line, x_cord, y_cord);
                
                y_cord += line_height;
                current_line = '';
            }
    
            current_line += (current_line === '' ? '' : ' ') + word;
        }
            ctx.fillText(current_line, x_cord, y_cord);
            y_cord += line_height;
    }
    
    
    x_cord = 45;
    y_cord += line_height*2; // for leaving a line gap
    
    ctx.fillText("Options are :", x_cord, y_cord);
    const textWidth = ctx.measureText("Options are :").width;
    const x1 = x_cord;
    const y1 = y_cord + 5; 
    const x2 = x_cord + textWidth;
    const y2 = y1;
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2; 
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    
    y_cord += line_height*2;
    
    let num = 1;
    
    let alpha = ["a","b","c","d"]
    for (let option of options) {
        const isCorrectAnswer = num === ans;
        let lines = option.split('\n');
        ctx.fillText(`(${alpha[num-1]}). ` , x_cord-2, y_cord);
    
        if (!isCorrectAnswer) {
            for (let line of lines) {
                const words = line.split(' ');
                let current_line = '';
            
                for (let word of words) {
                    const testWidth = ctx.measureText(current_line + ' ' + word).width;
                    if (testWidth > img_width - x_cord - 45- 90) {
                        ctx.fillText(current_line, x_cord+90, y_cord);
                        y_cord += line_height;
                        current_line = '';
                    }            
                    current_line += (current_line === '' ? '' : ' ') + word;
                }            
                ctx.fillText(current_line, x_cord+90, y_cord);
                            y_cord += line_height;
            }
        }
        else {
            let rectX = x_cord + 90
            let rectY = y_cord
            const optionWidth = img_width - x_cord - 20;
            const optionHeight = 60; 
            let line_counter = 0;
            for (let line of lines) {
                const words = line.split(' ');
                let current_line = '';
                for (let word of words) {
                    const testWidth = ctx.measureText(current_line + ' ' + word).width;
                    if (testWidth > img_width - x_cord - 45 - 90) {
                        current_line = '';
                        line_counter += 1; 
                    }            
                    current_line += (current_line === '' ? '' : ' ') + word;
                }
                line_counter += 1;
            }
    
            // ctx.fillStyle = 'yellow';
            // ctx.fillRect(rectX+2, rectY +2 - 45, optionWidth-2, (optionHeight-2)*line_counter);
    
            for (let line of lines) {
                const words = line.split(' ');
                let current_line = '';
            
                for (let word of words) {
                    const testWidth = ctx.measureText(current_line + ' ' + word).width;
                    if (testWidth > img_width - x_cord - 45 - 90 ) {
                        ctx.fillStyle = '#8c5ad6'; 
                        ctx.fillText(current_line, x_cord+90, y_cord); 
                        y_cord += line_height;
                        current_line = '';
                    }
            
                    current_line += (current_line === '' ? '' : ' ') + word;
                }
                ctx.fillStyle = '#8c5ad6'; 
                ctx.fillText(current_line, x_cord+90, y_cord);
            
                y_cord += line_height;
            }
            
        }
        num += 1;
    } 
    
    ctx.fillStyle = '#FF0000'; // Red text color
    ctx.font = 'bold 60px Arial, sans-serif'; 
    
    const footer = "TESTS FOR TESTS"
    rectWidth = ctx.measureText(footer).width + 20; 
    rectHeight = 80;
    rectX = 200 + x_cord;
    rectY = img_height - 100;
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 3; 
    ctx.strokeRect(rectX, rectY, rectWidth, rectHeight);
    
    ctx.fillStyle = 'rgba(0, 0, 240, 0.1)';
    ctx.fillRect(rectX, rectY, rectWidth, rectHeight);
    
    ctx.fillStyle = '#FF0000'; // Red text color
    ctx.font = 'bold 60px Arial, sans-serif'; 
    ctx.fillText(footer, 210 + x_cord, img_height-40);
    
    y_cord += line_height*2 
        
    const buffer = canvas.toBuffer('image/png');
    
    fs.writeFileSync('./resource/image/image_que.png', buffer);
}

function createAnswerImage(question, options, ans) {    
    const img_width = 1080;
    const img_height = 1920;
    
    const canvas = createCanvas(img_width, img_height);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgba(255, 255, 255, 1)'; // White background
    ctx.fillRect(0, 0, img_width, img_height);
    
    let x_cord = 50;
    let y_cord = 60;
    const line_height = 60
    
    ctx.fillStyle = 'rgba(0, 0, 240, 0.1)'; // Red text color
    ctx.font = 'bold 60px Arial, sans-serif'; 
    
    const starter = "PROBLEM OF THE DAY"
    let rectWidth = ctx.measureText(starter).width + 20; 
    let rectHeight = 80;
    let rectX = 150 + x_cord;
    let rectY = y_cord - 40;
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 3; 
    ctx.strokeRect(rectX, rectY, rectWidth, rectHeight);
    
    ctx.fillStyle = 'rgba(0, 0, 240, 0.1)';
    ctx.fillRect(rectX, rectY, rectWidth, rectHeight);
    
    ctx.fillStyle = '#FF0000'; // Red text color
    ctx.font = 'bold 60px Arial, sans-serif'; 
    ctx.fillText(starter, 160 + x_cord, y_cord+20);
    
    y_cord += line_height*2 

    ctx.fillStyle = '#8c5ad6'; // Purple text color
    ctx.font = 'bold 45px serif';
    
    let lines = question.split('\n');
    
    for (let line of lines) {
        const words = line.split(' ');
        let current_line = '';
    
        for (let word of words) {
            const testWidth = ctx.measureText(current_line + ' ' + word).width;
            if (testWidth > img_width - x_cord - 45) {
                ctx.fillText(current_line, x_cord, y_cord);
                
                y_cord += line_height;
                current_line = '';
            }
    
            current_line += (current_line === '' ? '' : ' ') + word;
        }
            ctx.fillText(current_line, x_cord, y_cord);
            y_cord += line_height;
    }
    
    
    x_cord = 45;
    y_cord += line_height*2; // for leaving a line gap
    
    ctx.fillText("Options are :", x_cord, y_cord);
    const textWidth = ctx.measureText("Options are :").width;
    const x1 = x_cord;
    const y1 = y_cord + 5; 
    const x2 = x_cord + textWidth;
    const y2 = y1;
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2; 
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    
    y_cord += line_height*2;
    
    let num = 1;
    
    let alpha = ["a","b","c","d"]
    for (let option of options) {
        const isCorrectAnswer = num == ans;
        let lines = option.split('\n');
        ctx.fillText(`(${alpha[num-1]}). ` , x_cord-2, y_cord);
    
        if (!isCorrectAnswer) {
            for (let line of lines) {
                const words = line.split(' ');
                let current_line = '';
            
                for (let word of words) {
                    const testWidth = ctx.measureText(current_line + ' ' + word).width;
                    if (testWidth > img_width - x_cord - 45- 90) {
                        ctx.fillText(current_line, x_cord+90, y_cord);
                        y_cord += line_height;
                        current_line = '';
                    }            
                    current_line += (current_line === '' ? '' : ' ') + word;
                }            
                ctx.fillText(current_line, x_cord+90, y_cord);
                            y_cord += line_height;
            }
        }
        else {
            let rectX = x_cord + 90
            let rectY = y_cord
            const optionWidth = img_width - x_cord - 20;
            const optionHeight = 60; 
            let line_counter = 0;
            for (let line of lines) {
                const words = line.split(' ');
                let current_line = '';
                for (let word of words) {
                    const testWidth = ctx.measureText(current_line + ' ' + word).width;
                    if (testWidth > img_width - x_cord - 45 - 90) {
                        current_line = '';
                        line_counter += 1; 
                    }            
                    current_line += (current_line === '' ? '' : ' ') + word;
                }
                line_counter += 1;
            }
    
            ctx.fillStyle = 'yellow';
                ctx.fillRect(rectX+2, rectY +2 - 45, optionWidth-2, (optionHeight-2)*line_counter);
    
            for (let line of lines) {
                const words = line.split(' ');
                let current_line = '';
            
                for (let word of words) {
                    const testWidth = ctx.measureText(current_line + ' ' + word).width;
                    if (testWidth > img_width - x_cord - 45 - 90 ) {
                        ctx.fillStyle = '#8c5ad6'; 
                        ctx.fillText(current_line, x_cord+90, y_cord); 
                        y_cord += line_height;
                        current_line = '';
                    }
            
                    current_line += (current_line === '' ? '' : ' ') + word;
                }
                ctx.fillStyle = '#8c5ad6'; 
                ctx.fillText(current_line, x_cord+90, y_cord);
            
                y_cord += line_height;
            }
            
        }
        num += 1;
    } 
    
    ctx.fillStyle = '#FF0000'; // Red text color
    ctx.font = 'bold 60px Arial, sans-serif'; 
    
    const footer = "TESTS FOR TESTS"
    rectWidth = ctx.measureText(footer).width + 20; 
    rectHeight = 80;
    rectX = 200 + x_cord;
    rectY = img_height - 100;
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 3; 
    ctx.strokeRect(rectX, rectY, rectWidth, rectHeight);
    
    ctx.fillStyle = 'rgba(0, 0, 240, 0.1)';
    ctx.fillRect(rectX, rectY, rectWidth, rectHeight);
    
    ctx.fillStyle = '#FF0000'; // Red text color
    ctx.font = 'bold 60px Arial, sans-serif'; 
    ctx.fillText(footer, 210 + x_cord, img_height-40);
    
    y_cord += line_height*2 
        
    const buffer = canvas.toBuffer('image/png');
    
    fs.writeFileSync('./resource/image/image_ans.png', buffer);
}

// Example usage:
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
// const answer = 3;

// createQuestionImage(question, options, answer);
// createAnswerImage(question, options, answer);

export {createQuestionImage,createAnswerImage}