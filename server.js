import express from "express"
import cors from "cors"
import cookieParser from 'cookie-parser';

import dotenv from "dotenv" 
dotenv.config()

const app = express()
app.use(cors())
app.use(cookieParser());

import telegramRoutes from "./routes/telegramRoutes.js"
import sheetRoutes from "./routes/sheetRoutes.js"
import serviceRoute from "./routes/serviceRoute.js"
import testRoutes from "./routes/testRoutes.js"
import appRoutes from "./routes/appRoutes.js"

// import { initializeTelegramBot } from './utils/telegram.js';

// const bot = initializeTelegramBot();

app.use(express.json()) 
app.use(express.urlencoded({ extended: true }));

app.use("/sheet", sheetRoutes)
app.use("/tele", telegramRoutes)
app.use("/service", serviceRoute)
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
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7611708809151256"
     crossorigin="anonymous"></script>
    </html>
    `;
    res.send(htmlContent);
});

app.get('/start', (req, res) => {
    let deviceId = req.cookies.deviceId;

    // If deviceId cookie doesn't exist, generate a new one
    if (!deviceId) {
        deviceId = generateDeviceId();
        res.cookie('deviceId', deviceId, { maxAge: 365 * 24 * 60 * 60 * 1000 }); // Set cookie to expire in 1 year
    }

    res.send(`Device ID: ${deviceId}`);
  });

function generateDeviceId() {
    // Generate a random alphanumeric string
    return Math.random().toString(36).substr(2, 10);
}

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log(`Server running at http://${host}:${port}`);
});
