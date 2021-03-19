require('winston-daily-rotate-file');
const WINSTON = require('winston')

const Config = require('./config')

const transport = new (WINSTON.transports.DailyRotateFile)({
  filename: './logs/ClinicApp-%DATE%.log',
  datePattern: 'yyyy-MM-DD',
  maxFiles: '7d',
  utc: true,
  timestamp: true,
  createTree: true
});
const logger = WINSTON.createLogger({
  level: (Config.environment === 'LOCAL') ? 'debug' : 'info',
  format: WINSTON.format.combine(
    WINSTON.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss.SSS'
    }),
    WINSTON.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}` + (info.splat !== undefined ? `${info.splat}` : " "))
  ),
  transports: [
    transport
  ]
});

module.exports = logger