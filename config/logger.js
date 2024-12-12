import winston from "winston";

const { combine, timestamp, printf, colorize } = winston.format;

const msgFormat = printf(({ level, timestamp, message }) => {
  return `${timestamp} [${level}]: ${message}`;
});

export const logger = winston.createLogger({
  level: 'info',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    colorize(),
    msgFormat
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'application.log' }) 
  ]
});
