import express from "express"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()
const app = express()
app.use(cors())

import { initializeTelegramBot } from './utils/telegram.js';
import telegramRoutes from "./routes/telegramRoutes.js"
import sheetRoutes from "./routes/sheetRoutes.js"
import appRoutes from "./routes/appRoutes.js"
import { PORT } from './config/env.js';

const bot = initializeTelegramBot();

app.use(express.json()) 

app.use("/sheet", sheetRoutes)
app.use("/tel", telegramRoutes)
app.use("/api", appRoutes)

app.get("/",(req,res)=>{
    res.send("<h1>Hello World!!!</h1>")
})

const server = app.listen(PORT, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log(`Server running at http://${host}:${port}`);
});
