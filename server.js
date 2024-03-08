import express from "express"
import cors from "cors"

import dotenv from "dotenv" 
dotenv.config()

const app = express()
app.use(cors())

import telegramRoutes from "./routes/telegramRoutes.js"
import sheetRoutes from "./routes/sheetRoutes.js"
import testRoutes from "./routes/testRoutes.js"
import appRoutes from "./routes/appRoutes.js"

import { initializeTelegramBot } from './utils/telegram.js';

const bot = initializeTelegramBot();

app.use(express.json()) 

app.use("/sheet", sheetRoutes)
app.use("/tele", telegramRoutes)
app.use("/test", testRoutes)

app.use("/api", appRoutes)

app.get('/', (req, res) => {
    const htmlContent = `
    <html>
    <head>
        <title>Hello World</title>
        <style>
            /* Define CSS styles */
            .blue-text {
                color: blue;
            }
        </style>
    </head>
    <body>
        <h1>Hello World, Welcome !!!</h1>
        <footer>
            <marquee behavior="scroll" direction="left" class="blue-text">Developed by Pawan Kumar</marquee>
        </footer>
    </body>
    </html>
    `;
    res.send(htmlContent);
});


const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log(`Server running at http://${host}:${port}`);
});
