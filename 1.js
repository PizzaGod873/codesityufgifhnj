const correctPasscode = "toes";
let countdownTime = 1000;
let countdownInterval;

function checkPasscode() {
  const pass = document.getElementById("passcodeInput").value.trim();
  if (pass === correctPasscode) {
    document.getElementById("passcodeContainer").style.display = "none";
    document.getElementById("mainContent").style.display = "block";
    startCountdown();
  } else {
    alert("❌ Wrong passcode!");
  }
}

function startCountdown() {
  document.getElementById("timer").textContent = countdownTime;

  countdownInterval = setInterval(() => {
    countdownTime--;
    document.getElementById("timer").textContent = countdownTime;

    if (countdownTime <= 0) {
      clearInterval(countdownInterval);
      alert("⏰ Session expired. Reloading...");
      location.reload();
    }
  }, 1000);
}

function openGameWindow() {
  let url = document.getElementById('urlInput').value.trim();
  if (!url) {
    alert("⚠️ Please enter a valid URL.");
    return;
  }

  if (!url.startsWith('https://')) {
    url = 'https://' + url.replace(/^http:\/\//, '');
  }

  const newWindow = window.open("", "_blank");

  if (!newWindow) {
    alert("🚫 Popup blocked! Please allow popups.");
    return;
  }

  newWindow.document.write(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Viewer</title>
      <style>
        html, body {
          margin: 0;
          padding: 0;
          height: 100%;
          background: black;
          overflow: hidden;
        }
        iframe {
          width: 100%;
          height: 100%;
          border: none;
        }
      </style>
    </head>
    <body>
      <iframe src="${url}" allowfullscreen sandbox="allow-scripts allow-same-origin allow-popups allow-forms"></iframe>
    </body>
    </html>
  `);
  newWindow.document.close();
}
