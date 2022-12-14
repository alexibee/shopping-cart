const express = require("express");
const path = require("path");
const assetsRouter = require("./server/assets-router.cjs");
const app = express();
app.use("/", express.static(path.join(__dirname, "public" )));
app.get("/api/v1", (req, res) => {
  res.json({
    stuff: "Response",
  });
});
app.get("/*", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
})
const { PORT = 5173 } = process.env;
app.listen(PORT, () => {
  console.log();
  console.log(`  App running in port ${PORT}`);
  console.log();
  console.log(`  > Local: \x1b[36mhttp://localhost:\x1b[1m${PORT}/\x1b[0m`);
});
app.use("/src", assetsRouter);
