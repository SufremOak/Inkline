import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// Setup __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// set view engine
app.set("view engine", "ejs");

// set view directory
app.set("views", path.join(__dirname, "public"));

// Serve static files
// app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "build"))); // serves styles.css, compiled scripts

// Optional: Separate route for compiled JS
app.use("/scripts", express.static(path.join(__dirname, "build/scripts")));

// Serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build/index.html"));
});

// Optional: Reader route (e.g. for book page)
app.get("/reader", (req, res) => {
  res.sendFile(path.join(__dirname, "build/reader.html")); // if you add a reader screen
});

// Start server
app.listen(port, () => {
  console.log(`📘 Inkline server running at http://localhost:${port}`);
});
