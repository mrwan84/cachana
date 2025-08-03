import { execSync } from "child_process";
import assert from "assert";

console.log("🧪 CLI tests...");

execSync("cachana set cliTest value1");
const output = execSync("cachana get cliTest").toString().trim();

assert.equal(output, "value1");
console.log("✔️ CLI test passed");
