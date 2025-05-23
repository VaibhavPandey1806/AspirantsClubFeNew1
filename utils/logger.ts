import { Platform } from 'react-native';

type LogLevel = 'info' | 'error' | 'warn' | 'debug';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  data?: any;
}

const logs: LogEntry[] = [];

function formatDate(date: Date): string {
  return date.toISOString();
}

function createLogEntry(level: LogLevel, message: string, data?: any): LogEntry {
  return {
    timestamp: formatDate(new Date()),
    level,
    message,
    data,
  };
}

function persistLog(entry: LogEntry) {
  logs.push(entry);
  
  // Log to console with appropriate styling
  const logMessage = `[${entry.timestamp}] ${entry.level.toUpperCase()}: ${entry.message}`;
  
  switch (entry.level) {
    case 'error':
      console.error(logMessage, entry.data || '');
      break;
    case 'warn':
      console.warn(logMessage, entry.data || '');
      break;
    case 'info':
      console.info(logMessage, entry.data || '');
      break;
    default:
      console.log(logMessage, entry.data || '');
  }
}

export const logger = {
  info: (message: string, data?: any) => {
    persistLog(createLogEntry('info', message, data));
  },
  
  error: (message: string, data?: any) => {
    persistLog(createLogEntry('error', message, data));
  },
  
  warn: (message: string, data?: any) => {
    persistLog(createLogEntry('warn', message, data));
  },
  
  debug: (message: string, data?: any) => {
    if (Platform.OS === 'web' && process.env.NODE_ENV === 'development') {
      persistLog(createLogEntry('debug', message, data));
    }
  },
  
  getLogs: () => [...logs],
};