// Firebase SDK Import
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc } 
  from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyD68lKJtGSN_EKFidP5rkGRhykNr5BMy5E",
  authDomain: "daily-log-web.firebaseapp.com",
  projectId: "daily-log-web",
  storageBucket: "daily-log-web.firebasestorage.app",
  messagingSenderId: "23967236055",
  appId: "1:23967236055:web:f8ed671f6b8fdfe1619592",
  measurementId: "G-EPY3E1P0Y3"
};

// DOM loaded
document.addEventListener("DOMContentLoaded", () => {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const form = document.getElementById("entry-form");
  const dateInput = document.getElementById("date");
  const textInput = document.getElementById("entry");
  const entriesList = document.getElementById("entries");
  const toggleMode = document.getElementById("toggleMode");

  // Default date
  function getTodayDate() {
    return new Date().toISOString().split("T")[0];
  }

  // Load entries
  async function loadEntries() {
    entriesList.innerHTML = "";
    const querySnapshot = await getDocs(collection(db, "entries"));
    querySnapshot.forEach((docSnap) => {
      const entry = docSnap.data();
      const li = document.createElement("li");
      li.className = "p-3 bg-white dark:bg-gray-700 rounded-lg shadow flex justify-between items-center";
      li.innerHTML = `
        <div>
          <strong>${entry.date}</strong>
          <p>${entry.text}</p>
        </div>
        <div class="flex gap-2">
          <button class="edit-btn bg-blue-500 text-white px-3 py-1 rounded">Edit</button>
          <button class="delete-btn bg-red-500 text-white px-3 py-1 rounded">Delete</button>
        </div>
      `;

      // Delete
      li.querySelector(".delete-btn").addEventListener("click", async () => {
        await deleteDoc(doc(db, "entries", docSnap.id));
        loadEntries();
      });

      // Edit
      li.querySelector(".edit-btn").addEventListener("click", async () => {
        const newText = prompt("Edit your entry:", entry.text);
        if (newText !== null && newText.trim() !== "") {
          await updateDoc(doc(db, "entries", docSnap.id), { text: newText });
          loadEntries();
        }
      });

      entriesList.appendChild(li);
    });
  }

  // Save Entry
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const dateValue = dateInput.value || getTodayDate();
    const textValue = textInput.value.trim();

    if (!textValue) {
      alert("Please write something!");
      return;
    }

    await addDoc(collection(db, "entries"), {
      date: dateValue,
      text: textValue
    });

    textInput.value = "";
    dateInput.value = "";
    loadEntries();
  });

  // Dark Mode toggle
  toggleMode.addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });

  // Initial load
  loadEntries();
});
