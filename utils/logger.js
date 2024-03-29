import { createLogger, format, transports } from 'winston';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';

// Create log directory if it doesn't exist
const logDirectory = './resource/logs';
if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
}

// Color mapping for different log levels
const colorMap = {
    info: chalk.green,
    warn: chalk.red,
    error: chalk.red
};

// Create a logger instance
const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(info => {
            const timestamp = info.timestamp;
            const level = info.level.toLowerCase(); // Convert to lowercase for matching colorMap
            const message = info.message;
            const formattedMessage = `[${timestamp}] ${colorMap[level](`[${info.level}] ${message}`)}`;
            return formattedMessage.replace(/\x1b\[\d+m/g, ''); // Strip ANSI escape codes
        })
    ),
    transports: [
        new transports.Console(),
        new transports.File({
            filename: path.join(logDirectory, 'logfile.log'),
            format: format.combine(
                format.printf(info => {
                    const timestamp = info.timestamp;
                    const level = info.level.toLowerCase(); // Convert to lowercase for matching colorMap
                    const message = info.message;
                    const formattedMessage = `[${timestamp}] ${colorMap[level](`[${info.level}] ${message}`)}`;
                    return formattedMessage.replace(/\x1b\[\d+m/g, ''); // Strip ANSI escape codes
                })
            )
        })
    ]
});

export default logger;

// Example usage
// logger.info('This is an informational message.');
// logger.warn('This is a warning message.');
// logger.error('This is an error message.');
