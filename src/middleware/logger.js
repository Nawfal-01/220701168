// src/middleware/logger.js

let logs = [];

export function logEvent(type, message, metadata = {}) {
  const log = {
    type,
    message,
    metadata,
    timestamp: new Date().toISOString(),
  };
  logs.push(log);
  sessionStorage.setItem("logs", JSON.stringify(logs)); // store logs temporarily
}

export function getLogs() {
  return logs;
}
