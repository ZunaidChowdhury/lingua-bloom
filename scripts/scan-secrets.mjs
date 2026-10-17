#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import { readFileSync, statSync } from "node:fs";

const allowMarker = "scan-" + "secrets: allow";

const patterns = [
  ["Groq API key", new RegExp("g" + "sk_[A-Za-z0-9_]{8,}")],
  ["database URL with password", new RegExp("postgre" + "sql://[^:/\\s]+:[^@\\s]+@")],
  ["JWT-like token", new RegExp("ey" + "J[A-Za-z0-9_-]{8,}\\.")],
];

const files = execFileSync(
  "git",
  ["ls-files", "--cached", "--others", "--exclude-standard"],
  { encoding: "utf8" },
)
  .split("\n")
  .filter(Boolean);

const findings = [];

for (const name of files) {
  let text;
  try {
    if (!statSync(name).isFile()) continue;
    text = readFileSync(name, "utf8");
  } catch {
    continue;
  }
  const lines = text.split("\n");
  lines.forEach((line, index) => {
    if (line.includes(allowMarker)) return;
    for (const [label, pattern] of patterns) {
      if (pattern.test(line)) findings.push(`${name}:${index + 1}: ${label}`);
    }
  });
}

if (findings.length > 0) {
  findings.forEach((finding) => console.log(finding));
  console.error(`Secret scan failed: ${findings.length} finding(s).`);
  process.exit(1);
}

console.log("Secret scan passed: no secrets found.");
