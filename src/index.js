export class Cachana {
  constructor(ttl = 60000) {
    this.cache = new Map();
    this.ttl = ttl;
  }

  set(key, value, ttl) {
    this.cache.set(key, {
      value,
      timestamp: Date.now(),
      ttl: ttl ?? this.ttl,
    });
  }

  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;

    const effectiveTTL = item.ttl ?? this.ttl;
    if (Date.now() - item.timestamp > effectiveTTL) {
      this.cache.delete(key);
      return null;
    }

    return item.value;
  }

  has(key) {
    return this.get(key) !== null;
  }

  delete(key) {
    return this.cache.delete(key);
  }

  clear() {
    this.cache.clear();
  }

  getAll() {
    const result = {};
    for (const [key, item] of this.cache.entries()) {
      const value = this.get(key);
      if (value !== null) result[key] = value;
    }
    return result;
  }

  get size() {
    return Object.keys(this.getAll()).length;
  }
}
