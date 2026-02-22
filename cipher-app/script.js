function jarlEncrypt(text) {
  let out = "";
  let letterCount = 0;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (/[a-zA-Z]/.test(ch)) {
      out += ch;
      letterCount++;
      if (letterCount % 2 === 0) {
        out += "ra";
      }
    } else {
      if (letterCount % 2 !== 0) {
        out += "ra";
      }
      out += ch;
      letterCount = 0;
    }
  }

  if (letterCount % 2 !== 0) {
    out += "ra";
  }

  return out;
}

function jarlDecrypt(text) {
  let out = "";
  let i = 0;

  while (i < text.length) {
    const ch = text[i];

    if (/[a-zA-Z]/.test(ch)) {
      out += text[i];
      i++;

      if (i < text.length && /[a-zA-Z]/.test(text[i])) {
        out += text[i];
        i++;
      }

      if (text[i] === "r" && text[i + 1] === "a") {
        i += 2;
      }
    } else {
      out += ch;
      i++;
    }
  }

  return out;
}

function doEncrypt() {
  const text = document.getElementById("plainText").value;
  if (!text.trim()) {
    setStatus("Please enter some text to encrypt.", "warn");
    return;
  }
  const result = jarlEncrypt(text);
  document.getElementById("cipherText").value = result;
  showOutput(result);
  setStatus("✔ Encrypted successfully.", "ok");
}

function doDecrypt() {
  const text = document.getElementById("cipherText").value;
  if (!text.trim()) {
    setStatus("Please enter cipher text to decrypt.", "warn");
    return;
  }
  const result = jarlDecrypt(text);
  document.getElementById("plainText").value = result;
  showOutput(result);
  setStatus("✔ Decrypted successfully.", "ok");
}

function clearAll() {
  document.getElementById("plainText").value = "";
  document.getElementById("cipherText").value = "";
  const out = document.getElementById("output");
  out.textContent = "Result will appear here…";
  out.className = "";
  setStatus("", "");
}

function copyOutput() {
  const out = document.getElementById("output");
  if (!out.classList.contains("has-result")) {
    setStatus("Nothing to copy yet.", "warn");
    return;
  }
  const text = out.textContent;
  navigator.clipboard
    .writeText(text)
    .then(() => {
      const btn = document.getElementById("copyBtn");
      btn.textContent = "✔ Copied!";
      btn.classList.add("copied");
      setStatus("✔ Copied to clipboard.", "ok");
      setTimeout(() => {
        btn.textContent = "📋 Copy";
        btn.classList.remove("copied");
      }, 2000);
    })
    .catch(() => {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setStatus("✔ Copied (fallback).", "ok");
    });
}

function showOutput(text) {
  const out = document.getElementById("output");
  out.textContent = text;
  out.className = "has-result";
}

function setStatus(msg, type) {
  const bar = document.getElementById("status");
  bar.textContent = msg;
  bar.className = type || "";
}
