"use client";

import { useState } from "react";
import { apiEndpoints } from "@/lib/api";
import { ApiTestPanel } from "@/components/api-test-panel";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Home() {
  const [runAllActive, setRunAllActive] = useState(false);
  const [runAllKey, setRunAllKey] = useState(0);

  const handleRunAll = () => {
    setRunAllActive(true);
    setRunAllKey((k) => k + 1);
    setTimeout(() => setRunAllActive(false), 500);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">API Retry Tester</h1>
            <p className="text-muted-foreground mt-1">
              Click each button to test an API endpoint. Failed calls automatically retry up to 3 times.
            </p>
          </div>
          <Button
            onClick={handleRunAll}
            size="lg"
            className={cn(
              "shrink-0",
              runAllActive && "animate-pulse"
            )}
          >
            Run All
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {apiEndpoints.map((endpoint) => (
            <ApiTestPanel
              key={endpoint.name}
              name={endpoint.name}
              apiFn={endpoint.fn}
              triggerKey={runAllKey}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
