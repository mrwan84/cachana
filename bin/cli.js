#!/usr/bin/env node

import fetch from "node-fetch";
const base = "http://localhost:7070";
const [, , cmd, ...args] = process.argv;

async function main() {
  switch (cmd) {
    case "set": {
      const [key, value, ttl] = args;
      await fetch(`${base}/set`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key,
          value,
          ttl: ttl ? Number(ttl) : undefined,
        }),
      });
      console.log(`✔️ Set "${key}" = "${value}"`);
      break;
    }

    case "get": {
      const [key] = args;
      const res = await fetch(`${base}/get/${key}`);
      const { value } = await res.json();
      console.log(value ?? "❌ Not found or expired");
      break;
    }

    case "has": {
      const [key] = args;
      const res = await fetch(`${base}/has/${key}`);
      const { exists } = await res.json();
      console.log(exists ? "✅ Exists" : "❌ Does not exist or expired");
      break;
    }

    case "delete": {
      const [key] = args;
      await fetch(`${base}/delete/${key}`, { method: "DELETE" });
      console.log(`🗑️ Deleted "${key}"`);
      break;
    }

    case "clear": {
      await fetch(`${base}/clear`, { method: "POST" });
      console.log("🧹 Cache cleared");
      break;
    }

    case "all": {
      const res = await fetch(`${base}/all`);
      const all = await res.json();
      console.log(all);
      break;
    }

    case "size": {
      const res = await fetch(`${base}/size`);
      const { size } = await res.json();
      console.log(`📦 ${size} item(s)`);
      break;
    }

    default:
      console.log(`
Usage:
  cachana <command> [...args]

Commands:
  set <key> <value> [ttl]   Set key with optional TTL (in ms)
  get <key>                 Get value
  has <key>                 Check existence
  delete <key>              Delete key
  clear                     Clear all keys
  all                       Show all keys
  size                      Show key count
`);
  }
}

main();
