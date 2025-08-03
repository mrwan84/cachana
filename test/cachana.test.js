import { strict as assert } from "assert";
import { Cachana } from "../src/index.js";

const cache = new Cachana(100); // 100 ms TTL

console.log("🧪 Running unit tests...");

// Test: Set and get
cache.set("foo", "bar");
assert.equal(cache.get("foo"), "bar");

// Test: Expiry
setTimeout(() => {
  assert.equal(cache.get("foo"), null);
  console.log("✔️ TTL expiration test passed");
}, 150);

// Test: has()
cache.set("baz", 123);
assert.equal(cache.has("baz"), true);

// Test: delete()
cache.delete("baz");
assert.equal(cache.has("baz"), false);

// Test: clear()
cache.set("one", 1);
cache.set("two", 2);
cache.clear();
assert.equal(cache.size, 0);

console.log("✔️ Unit tests passed");
