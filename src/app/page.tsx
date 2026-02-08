"use client";

import { apiEndpoints } from "@/lib/api";
import { ApiTestPanel } from "@/components/api-test-panel";

export default function Home() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">API Retry Tester</h1>
          <p className="text-muted-foreground mt-1">
            Click each button to test an API endpoint. Failed calls automatically retry up to 3 times.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {apiEndpoints.map((endpoint) => (
            <ApiTestPanel
              key={endpoint.name}
              name={endpoint.name}
              apiFn={endpoint.fn}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
