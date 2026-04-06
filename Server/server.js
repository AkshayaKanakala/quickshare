const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const storage = require("./storage");

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: "uploads/" });

// Generate 6-digit code
function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// 📩 Send Text
app.post("/send-text", (req, res) => {
  const { text } = req.body;
  const code = generateCode();

  storage.save(code, { type: "text", data: text });

  res.json({ code });
});

// 📥 Get Text/File
app.get("/receive/:code", (req, res) => {
  const data = storage.get(req.params.code);

  if (!data) {
    return res.status(404).json({ message: "Expired or invalid code" });
  }

  res.json(data);
});

// 📁 Upload File
app.post("/upload", upload.single("file"), (req, res) => {
  const code = generateCode();

  storage.save(code, {
    type: "file",
    filePath: req.file.path,
    originalName: req.file.originalname
  });

  res.json({ code });
});

// 📥 Download File
app.get("/download/:code", (req, res) => {
  const data = storage.get(req.params.code);

  if (!data || data.type !== "file") {
    return res.status(404).send("Invalid");
  }

  res.download(data.filePath, data.originalName);
});

app.listen(5000, () => console.log("Server running on port 5000"));