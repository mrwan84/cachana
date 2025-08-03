import { CachanaClient } from "../client/cachana-client.js";

const client = new CachanaClient("http://localhost:7070");

console.log("🧪 Testing CachanaClient...");

try {
  // Basic set/get
  await client.set("foo", "bar");
  const val = await client.get("foo");
  console.assert(val === "bar", '❌ Failed: get(foo) !== "bar"');
  console.log("✔️ get/set basic passed");

  // TTL test (short expiration)
  await client.set("temp", "short-lived", 1000); // 1 second
  const beforeExpire = await client.get("temp");
  console.assert(
    beforeExpire === "short-lived",
    "❌ Failed: value missing before TTL"
  );

  await new Promise((r) => setTimeout(r, 1100)); // wait just over TTL
  const afterExpire = await client.get("temp");
  console.assert(
    afterExpire === null,
    "❌ Failed: value not expired after TTL"
  );
  console.log("✔️ TTL test passed");

  // has/delete test
  await client.set("toDelete", "bye");
  console.assert(
    (await client.has("toDelete")) === true,
    "❌ Failed: has(toDelete) !== true"
  );

  await client.delete("toDelete");
  console.assert(
    (await client.has("toDelete")) === false,
    "❌ Failed: delete failed"
  );

  console.log("✔️ has/delete test passed");

  // getAll test
  await client.set("a", 1);
  await client.set("b", 2);
  const all = await client.getAll();
  console.assert(all.a === 1 && all.b === 2, "❌ Failed: getAll missing keys");

  console.log("✔️ getAll test passed");

  console.log("🎉 All CachanaClient tests passed!");
} catch (err) {
  console.error("❌ Test failed:", err.message);
  process.exit(1);
}
