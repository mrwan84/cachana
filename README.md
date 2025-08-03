# 🧠 Cachana

**Cachana** is a lightweight, in-memory key-value cache with TTL (Time-To-Live), CLI tools, REST API server, and a simple JavaScript client.

> Ideal for fast caching, development utilities, and remote memory storage.

---

## 🚀 Features

- ⚡ Fast in-memory key-value store
- ⏱️ Built-in TTL expiration (per-entry)
- 💻 CLI tools for shell-based access
- 🌐 REST API for remote interaction
- 🧪 JavaScript client for easy integration

---

## 🧠 Usage

### Programmatically (in Node.js):

📦Install locally:

```bash
npm install  cachana
```

🛠 Cachana Class

```js
new Cachana((ttl = 60000));
```

| Method            | Description                      |
| ----------------- | -------------------------------- |
| `set(k, v, ttl?)` | Set a value with key             |
| `get(k)`          | Get a value or `null` if expired |
| `has(k)`          | Returns `true` if value is alive |
| `delete(k)`       | Removes a key                    |
| `clear()`         | Clears the cache                 |
| `getAll()`        | Returns all unexpired key-values |
| `size`            | Number of active keys            |

example:

```js
import { Cachana } from "cachana";

const cache = new Cachana(60000); // TTL: 60 seconds

cache.set("foo", "bar");
console.log(cache.get("foo")); // bar

setTimeout(() => {
  console.log(cache.get("foo")); // null (expired)
}, 61000);
```

### 💻 CLI / server Usage

📦 Installation

```bash
npm install -g cachana
```

Start the cache server:

```bash
cachana-server

```

#### CLI:

Then, in another terminal:

```bash
cachana set username alice
cachana get username         # ➜ alice
cachana has username         # ➜ true
cachana delete username
cachana get username         # ➜ null

```

## 📡 REST API

```bash
http://localhost:7070

```

| Method | Endpoint       | Description            |
| ------ | -------------- | ---------------------- |
| GET    | `/get/:key`    | Get value by key       |
| GET    | `/has/:key`    | Check if key exists    |
| POST   | `/set`         | Set key and value      |
| DELETE | `/delete/:key` | Delete key             |
| GET    | `/all`         | Get all unexpired keys |

POST /set Body

```json
{
  "key": "session",
  "value": "abc123",
  "ttl": 5000 // optional, in ms
}
```

## 🔗 JavaScript Client

📦Install locally:

```bash

npm install cachana

```

## ✨ Usage

```js
import { CachanaClient } from "cachana/client";

const api = new CachanaClient("http://localhost:7070");

await api.set("token", "xyz", 10000); // with TTL
console.log(await api.get("token")); // 'xyz'

await api.delete("token");
console.log(await api.has("token")); // false
```

API Methods

```js
set(key, value, ttl?)
get(key)
has(key)
delete(key)
getAll()

```

## 🔬 Testing

Make sure the server is running:

```bash

cachana-server

```

Then run:

```bash
npm test

```

## 🧩 Project Structure

- /src - Core TTL cache library
- /server - REST API interface
- /client - JS client for remote use
- /test - Unit + integration tests

## 📄 License

MIT — © 2025 M.Alsouki
