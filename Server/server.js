const express = require("express");
const cors = require("cors");
const multer = require("multer");
const storage = require("./storage");

const app = express();

app.use(cors());
app.use(express.json());

// File upload configuration
const upload = multer({
    dest: "uploads/",
    limits: {
        fileSize: 100 * 1024 * 1024 // 100 MB
    }
});

// Generate 6-digit code
function generateCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send Text
app.post("/send-text", (req, res) => {
    try {
        const { text } = req.body;

        if (!text || !text.trim()) {
            return res.status(400).json({
                message: "Text is required"
            });
        }

        const code = generateCode();

        storage.save(code, {
            type: "text",
            data: text
        });

        res.json({ code });

    } catch (error) {
        console.error("Send text error:", error);
        res.status(500).json({
            message: "Failed to send text"
        });
    }
});

// Receive Text/File information
app.get("/receive/:code", (req, res) => {
    try {
        const code = req.params.code;
        const data = storage.peek(code);

        if (!data) {
            return res.status(404).json({
                message: "Expired or invalid code"
            });
        }

        if (data.type === "file") {
            return res.json({
                type: "file",
                originalName: data.originalName
            });
        }

        res.json(data);

    } catch (error) {
        console.error("Receive error:", error);
        res.status(500).json({
            message: "Failed to receive data"
        });
    }
});

// Upload File
app.post("/upload", upload.single("file"), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "No file uploaded"
            });
        }

        const code = generateCode();

        storage.save(code, {
            type: "file",
            filePath: req.file.path,
            originalName: req.file.originalname
        });

        res.json({ code });

    } catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({
            message: "Failed to upload file"
        });
    }
});

// Download File
app.get("/download/:code", (req, res) => {
    try {
        const code = req.params.code;
        const data = storage.get(code);

        if (!data || data.type !== "file") {
            return res.status(404).send("Invalid or expired code");
        }

        res.download(
            data.filePath,
            data.originalName,
            (error) => {
                if (error) {
                    console.error("Download error:", error);

                    if (!res.headersSent) {
                        res.status(500).send("Failed to download file");
                    }
                }
            }
        );

    } catch (error) {
        console.error("Download error:", error);

        if (!res.headersSent) {
            res.status(500).send("Failed to download file");
        }
    }
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});