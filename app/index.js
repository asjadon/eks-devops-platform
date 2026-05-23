const express = require("express");
const client = require("prom-client");

const app = express();

const PORT = 3000;

const collectDefaultMetrics = client.collectDefaultMetrics;

collectDefaultMetrics();

app.get("/", (req, res) => {
  res.send(process.env.APP_MESSAGE || "Default App Message");
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    message: "Application is healthy"
  });
});

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
