"use client";

import { useState, useRef, useCallback } from "react";

export type LogType = "info" | "warning" | "error" | "success";

export interface LogEntry {
  timestamp: string;
  message: string;
  type: LogType;
}

interface UseRetryOptions {
  maxRetries?: number;
  delayMs?: number;
}

export function useRetry({ maxRetries = 3, delayMs = 1500 }: UseRetryOptions = {}) {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const runningRef = useRef(false);

  const addLog = useCallback((message: string, type: LogType) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prev) => [...prev, { timestamp, message, type }]);
  }, []);

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const execute = useCallback(
    async (name: string, fn: () => Promise<void>) => {
      if (runningRef.current) return;
      runningRef.current = true;
      setIsRunning(true);

      addLog(`Calling ${name}...`, "info");

      for (let attempt = 1; attempt <= maxRetries + 1; attempt++) {
        try {
          await fn();
          addLog(`${name} succeeded`, "success");
          break;
        } catch {
          if (attempt <= maxRetries) {
            addLog(
              `Attempt ${attempt} failed. Retrying in ${delayMs / 1000}s...`,
              "warning"
            );
            await sleep(delayMs);
          } else {
            addLog(
              `All ${maxRetries + 1} attempts failed. ${name} is unavailable.`,
              "error"
            );
          }
        }
      }

      runningRef.current = false;
      setIsRunning(false);
    },
    [maxRetries, delayMs, addLog]
  );

  const clearLogs = useCallback(() => {
    setLogs([]);
  }, []);

  return { logs, isRunning, execute, clearLogs };
}
