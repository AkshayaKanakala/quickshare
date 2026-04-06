const API = "http://localhost:5000";

// Send text
async function sendText() {
  const text = document.getElementById("text").value;

  const res = await fetch(`${API}/send-text`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  });

  const data = await res.json();
  document.getElementById("sendCode").innerText = "Code: " + data.code;
}

// Upload file
async function uploadFile() {
  const file = document.getElementById("file").files[0];
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API}/upload`, {
    method: "POST",
    body: formData
  });

  const data = await res.json();
  document.getElementById("fileCode").innerText = "Code: " + data.code;
}

// Receive data
async function receive() {
  const code = document.getElementById("code").value;

  const res = await fetch(`${API}/receive/${code}`);

  if (!res.ok) {
    alert("Invalid or expired");
    return;
  }

  const data = await res.json();

  if (data.type === "text") {
    document.getElementById("output").innerText = data.data;
  } else {
    window.open(`${API}/download/${code}`);
  }
}