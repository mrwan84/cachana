#!/usr/bin/env node

import express from "express";
import { Cachana } from "../src/index.js";

const app = express();
const port = 7070;
const cache = new Cachana();

app.use(express.json());

// Routes
app.post("/set", (req, res) => {
  const { key, value, ttl } = req.body;
  cache.set(key, value, ttl);
  res.json({ status: "ok" });
});

app.get("/get/:key", (req, res) => {
  const value = cache.get(req.params.key);
  res.json({ value });
});

app.get("/has/:key", (req, res) => {
  res.json({ exists: cache.has(req.params.key) });
});

app.delete("/delete/:key", (req, res) => {
  cache.delete(req.params.key);
  res.json({ deleted: true });
});

app.post("/clear", (req, res) => {
  cache.clear();
  res.json({ cleared: true });
});

app.get("/all", (req, res) => {
  res.json(cache.getAll());
});

app.get("/size", (req, res) => {
  res.json({ size: cache.size });
});

app.listen(port, () => {
  console.log(`🧠 Cachana server running at http://localhost:${port}`);
});
