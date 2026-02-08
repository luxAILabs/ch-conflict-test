"use client";

import { useEffect, useRef } from "react";
import { useRetry, LogType } from "@/hooks/use-retry";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const logColors: Record<LogType, string> = {
  info: "text-muted-foreground",
  warning: "text-yellow-500",
  error: "text-red-500",
  success: "text-green-500",
};

interface ApiTestPanelProps {
  name: string;
  apiFn: () => Promise<void>;
  triggerKey?: number;
  maxRetries?: number;
}

export function ApiTestPanel({ name, apiFn, triggerKey = 0, maxRetries }: ApiTestPanelProps) {
  const { logs, isRunning, execute, clearLogs } = useRetry({ maxRetries });
  const initialRef = useRef(true);

  useEffect(() => {
    if (initialRef.current) {
      initialRef.current = false;
      return;
    }
    if (triggerKey > 0) {
      execute(name, apiFn);
    }
  }, [triggerKey, name, apiFn, execute]);

  const status = isRunning ? "Retrying..." : logs.some((l) => l.type === "error") ? "Failed" : "Idle";

  const badgeVariant =
    status === "Retrying..."
      ? "secondary"
      : status === "Failed"
        ? "destructive"
        : "outline";

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg">{name}</CardTitle>
        <Badge variant={badgeVariant}>{status}</Badge>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex gap-2">
          <Button
            onClick={() => execute(name, apiFn)}
            disabled={isRunning}
            size="sm"
          >
            {isRunning ? "Running..." : "Test API"}
          </Button>
          <Button onClick={clearLogs} variant="outline" size="sm">
            Clear
          </Button>
        </div>
        <ScrollArea className="h-48 rounded-md border p-3 font-mono text-sm">
          {logs.length === 0 ? (
            <p className="text-muted-foreground">No logs yet.</p>
          ) : (
            logs.map((entry, i) => (
              <p key={i} className={logColors[entry.type]}>
                <span className="text-muted-foreground">[{entry.timestamp}]</span>{" "}
                {entry.message}
              </p>
            ))
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
