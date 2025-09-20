const entriesList=document.getElementById("entries");
let logs=JSON.parse(localStorage.getItem("logs"))||[];

function addLog(){
  const date=document.getElementById("dateInput").value;
  const note=document.getElementById("noteInput").value.trim();
  if(!date||!note)return alert("Enter date & note!");
  logs.push({date,note});
  localStorage.setItem("logs",JSON.stringify(logs));
  renderLogs();
  document.getElementById("noteInput").value="";
}

function renderLogs(filter=""){
  entriesList.innerHTML="";
  logs.filter(log=>log.note.toLowerCase().includes(filter.toLowerCase())).forEach((log,index)=>{
    const li=document.createElement("li");
    li.innerHTML=`<span><strong>${log.date}</strong>: ${log.note}</span>
    <div class="actions">
      <button onclick="editLog(${index})">✏</button>
      <button onclick="deleteLog(${index})">🗑</button>
    </div>`;
    entriesList.appendChild(li);
  });
}

function deleteLog(index){
  if(confirm("Are you sure to delete this entry?")){
    logs.splice(index,1);
    localStorage.setItem("logs",JSON.stringify(logs));
    renderLogs();
  }
}

function editLog(index){
  const newNote=prompt("Edit your note:",logs[index].note);
  if(newNote!==null&&newNote.trim()!==""){
    logs[index].note=newNote.trim();
    localStorage.setItem("logs",JSON.stringify(logs));
    renderLogs();
  }
}

function searchLogs(){
  const query=document.getElementById("searchInput").value;
  renderLogs(query);
}

document.getElementById("toggleMode").addEventListener("click",()=>{document.body.classList.toggle("dark");});
renderLogs();
