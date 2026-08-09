const API = "http://localhost:5000";

// Send text
async function sendText() {
    try {
        const text = document.getElementById("text").value;

        if (!text.trim()) {
            alert("Please enter some text");
            return;
        }

        const res = await fetch(`${API}/send-text`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text })
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.message || "Failed to send text");
            return;
        }

        document.getElementById("sendCode").innerText =
            "Code: " + data.code;

    } catch (error) {
        console.error("Send text error:", error);
        alert("Cannot connect to server");
    }
}


// Upload file
async function uploadFile() {
    try {
        const file = document.getElementById("file").files[0];

        if (!file) {
            alert("Please select a file");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch(`${API}/upload`, {
            method: "POST",
            body: formData
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.message || "Failed to upload file");
            return;
        }

        document.getElementById("fileCode").innerText =
            "Code: " + data.code;

    } catch (error) {
        console.error("Upload error:", error);
        alert("Cannot connect to server");
    }
}


// Receive data
async function receive() {
    try {
        const code = document.getElementById("code").value.trim();

        if (!code) {
            alert("Please enter a code");
            return;
        }

        const res = await fetch(`${API}/receive/${code}`);

        if (!res.ok) {
            alert("Invalid or expired code");
            return;
        }

        const data = await res.json();

        if (data.type === "text") {
            document.getElementById("output").innerText = data.data;
        } else if (data.type === "file") {
            document.getElementById("output").innerText =
                "File: " + data.originalName;

            window.open(`${API}/download/${code}`, "_blank");
        }

    } catch (error) {
        console.error("Receive error:", error);
        alert("Cannot connect to server");
    }
}