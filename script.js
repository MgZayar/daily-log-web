const entriesList=document.getElementById("entries");
let logs=JSON.parse(localStorage.getItem("logs"))||[];

function addLog(){
  let date=document.getElementById("dateInput").value;
  const note=document.getElementById("noteInput").value.trim();
  
  // Date default to today if not selected
  if(!date){
    const today=new Date();
    const yyyy=today.getFullYear();
    const mm=String(today.getMonth()+1).padStart(2,'0');
    const dd=String(today.getDate()).padStart(2,'0');
    date=`${yyyy}-${mm}-${dd}`;
  }

  if(!note) return alert("Enter note!");
  
  logs.push({date,note});
  localStorage.setItem("logs",JSON.stringify(logs));
  renderLogs();

  // Note cleared, date unchanged
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
  if(newNote!==null && newNote.trim()!==""){
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

function uploadBackground(){
  const fileInput=document.getElementById("bgFile");
  if(fileInput.files && fileInput.files[0]){
    const reader=new FileReader();
    reader.onload=function(e){
      document.body.style.background=`url('${e.target.result}') no-repeat center center fixed`;
      document.body.style.backgroundSize="cover";
    }
    reader.readAsDataURL(fileInput.files[0]);
  }
}

renderLogs();
