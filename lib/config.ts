const raw = process.env.NEXT_PUBLIC_API_URL;

if (!raw) {
  throw new Error(
    "Missing NEXT_PUBLIC_API_URL. Copy .env.example to .env.local and set it to the backend base URL, for example http://localhost:8000.",
  );
}

export const API_URL: string = raw.replace(/\/+$/, "");
