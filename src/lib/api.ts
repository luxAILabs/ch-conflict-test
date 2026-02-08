export interface ApiEndpoint {
  name: string;
  fn: () => Promise<void>;
  maxRetries?: number;
}

function makeFailingApi(name: string): ApiEndpoint {
  return {
    name,
    fn: () =>
      new Promise((_, reject) => {
        const delay = 200 + Math.random() * 600;
        setTimeout(() => reject(new Error(`${name} request failed`)), delay);
      }),
  };
}

export const apiEndpoints: ApiEndpoint[] = [
  makeFailingApi("Users"),
  makeFailingApi("Database"),
  makeFailingApi("Interfaces"),
  makeFailingApi("Flows"),
  makeFailingApi("Webhooks"),
  makeFailingApi("Analytics"),
  makeFailingApi("Notifications"),
  makeFailingApi("Storage"),
  makeFailingApi("Buckets"),
  makeFailingApi("Logs"),
  { ...makeFailingApi("Payments"), maxRetries: 0 },
];
