import fetch from "node-fetch";
import assert from "assert";
import { spawn } from "child_process";
import http from "http";

// Start the server
const serverProcess = spawn("node", ["server/index.js"], {
  stdio: "inherit",
});

// Wait for server to be ready
function waitForServer(url, timeout = 5000) {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const check = () => {
      http
        .get(url, () => resolve())
        .on("error", () => {
          if (Date.now() - start > timeout) {
            reject(new Error("Server did not start in time"));
          } else {
            setTimeout(check, 100);
          }
        });
    };
    check();
  });
}

async function runTests() {
  const base = "http://localhost:7070";

  console.log("🧪 Waiting for server...");
  await waitForServer(`${base}/has/any`);

  console.log("🧪 Running REST API tests...");

  await fetch(`${base}/set`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ key: "api", value: "works" }),
  });

  const getRes = await fetch(`${base}/get/api`);
  const { value } = await getRes.json();
  assert.equal(value, "works");

  const hasRes = await fetch(`${base}/has/api`);
  const { exists } = await hasRes.json();
  assert.equal(exists, true);

  await fetch(`${base}/delete/api`, { method: "DELETE" });

  const afterDel = await fetch(`${base}/get/api`);
  const { value: deleted } = await afterDel.json();
  assert.equal(deleted, null);

  console.log("✔️ REST API tests passed");

  // Shut down the server
  serverProcess.kill();
}

runTests().catch((err) => {
  console.error("❌ REST test failed:", err.message);
  serverProcess.kill();
  process.exit(1);
});
