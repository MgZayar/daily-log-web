// Save new log
function addLog() {
  const date = document.getElementById("dateInput").value;
  const note = document.getElementById("noteInput").value;

  if (!date || !note) {
    alert("Please fill in both fields!");
    return;
  }

  let entries = JSON.parse(localStorage.getItem("dailyLogs")) || [];
  entries.push({ date, note });
  localStorage.setItem("dailyLogs", JSON.stringify(entries));

  document.getElementById("dateInput").value = "";
  document.getElementById("noteInput").value = "";

  displayLogs();
}

// Display logs
function displayLogs(filter = "") {
  const entries = JSON.parse(localStorage.getItem("dailyLogs")) || [];
  const list = document.getElementById("entries");
  list.innerHTML = "";

  entries
    .filter(entry => entry.date.includes(filter) || entry.note.toLowerCase().includes(filter.toLowerCase()))
    .forEach(entry => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${entry.date}</strong><br>${entry.note}`;
      list.appendChild(li);
    });
}

// Search logs
function searchLogs() {
  const filter = document.getElementById("searchInput").value;
  displayLogs(filter);
}

// Dark mode toggle
document.getElementById("toggleMode").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Export TXT
function exportTXT() {
  const entries = JSON.parse(localStorage.getItem("dailyLogs")) || [];
  let text = entries.map(e => `${e.date}: ${e.note}`).join("\n\n");

  const blob = new Blob([text], { type: "text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "daily-log.txt";
  a.click();
}

// Export PDF (using browser print dialog)
function exportPDF() {
  window.print();
}

window.onload = displayLogs;
