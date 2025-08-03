export class CachanaClient {
  /**
   * @param {string} baseURL - Base URL of the Cachana REST server (e.g., http://localhost:7070)
   */
  constructor(baseURL = "http://localhost:7070") {
    this.base = baseURL.replace(/\/$/, "");
  }

  /**
   * Set a value with optional TTL
   * @param {string} key
   * @param {*} value
   * @param {number} [ttl] - Optional TTL in milliseconds
   */
  async set(key, value, ttl) {
    const payload = { key, value };
    if (typeof ttl === "number") payload.ttl = ttl;

    const res = await fetch(`${this.base}/set`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error(`Failed to set key "${key}"`);
    return true;
  }

  async get(key) {
    const res = await fetch(`${this.base}/get/${encodeURIComponent(key)}`);
    const json = await res.json();
    return json.value ?? null;
  }

  async has(key) {
    const res = await fetch(`${this.base}/has/${encodeURIComponent(key)}`);
    const json = await res.json();
    return json.exists;
  }

  async delete(key) {
    const res = await fetch(`${this.base}/delete/${encodeURIComponent(key)}`, {
      method: "DELETE",
    });
    return res.ok;
  }

  async getAll() {
    const res = await fetch(`${this.base}/all`);
    return await res.json(); // returns { key: value, ... }
  }
}
