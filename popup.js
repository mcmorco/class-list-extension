getClasses()



let addClassBtn = document.createElement("a");
addClassBtn.setAttribute("style","padding: 10px;margin:5px;");
addClassBtn.innerHTML = "Add a class";
addClassBtn.setAttribute("href","addPage.html")
addClassBtn.setAttribute("class","button")
document.getElementById("actionButtons").appendChild(addClassBtn);

let deleteClassBtn = document.createElement("a");
deleteClassBtn.setAttribute("style","padding: 10px;margin:5px;");
deleteClassBtn.innerHTML = "Delete classes";
deleteClassBtn.addEventListener("click",deleteClasses, false);
deleteClassBtn.setAttribute("class","button")
deleteClassBtn.setAttribute("href","popup.html")
document.getElementById("actionButtons").appendChild(deleteClassBtn);


//classesJSON.forEach(createButton)

function createButton(classData){
  let newDiv = document.createElement("div");

  let btn = document.createElement("div");
  btn.setAttribute("style","padding: 10px;margin:5px");
  btn.innerHTML = classData["ClassName"];
  btn.setAttribute("id",classData["ClassName"]+"Div");
  document.getElementById("classList").appendChild(btn);
  
  let deleteBtn = document.createElement("button");
  deleteBtn.setAttribute("id",classData["ClassName"]+"deleteBtn")
  deleteBtn.innerHTML = "x";
  deleteBtn.setAttribute("style","margin-left:5px;border-radius:13px;");
  deleteBtn.addEventListener("click",deleteClass, false);
  deleteBtn.myParam = classData["ClassName"];
  document.getElementById(classData["ClassName"]+"Div").appendChild(deleteBtn);
  
  document.getElementById(classData["ClassName"]+"Div").appendChild(document.createElement("br"))


  let classSite = document.createElement("a");
  classSite.innerHTML = "Class Site";
  classSite.setAttribute("href",classData["ClassUrl"])
  classSite.setAttribute("target","_blank")
  classSite.setAttribute("style","margin-right: 10px;");
  document.getElementById(classData["ClassName"]+"Div").appendChild(classSite);
  


  let zoomLink = document.createElement("a");
  zoomLink.innerHTML = "Meeting Link";
  zoomLink.setAttribute("id",classData["ClassName"]+"ZoomLink")
  zoomLink.setAttribute("href",classData["MeetingUrl"])
  zoomLink.setAttribute("target","_blank")
  document.getElementById(classData["ClassName"]+"Div").appendChild(zoomLink);

  document.getElementById(classData["ClassName"]+"Div").appendChild(document.createElement("br"))

  let pwdBtn = document.createElement("button");
  pwdBtn.innerHTML = "Copy Password";
  pwdBtn.addEventListener("click",myFunc, false);
  pwdBtn.myParam = classData["MeetingPassword"]
  document.getElementById(classData["ClassName"]+"Div").appendChild(pwdBtn)
}

function myFunc(evt){
  navigator.clipboard.writeText(evt.currentTarget.myParam);
}


function deleteClass(evt){
  let classNameToDelete = evt.currentTarget.myParam
  chrome.storage.sync.get((items=>{
    if (Object.keys(items).length > 0 && items.data) {
      
      let classesJSON = items.data
      
      if(classesJSON){
        let newArray = [];
        classesJSON.forEach(element => {
          if(element.ClassName != classNameToDelete){
            newArray.push(element)
          }
        });
        items.data = newArray;
        chrome.storage.sync.set(items, function() {
      });
      }


  }

  //reload
  location.reload();

  }))
}

function getClasses(){
  chrome.storage.sync.get((items=>{
    if (Object.keys(items).length > 0 && items.data) {
      
      let classesJSON = items.data
      
      if(classesJSON){
        classesJSON.forEach(element => {
          createButton(element)
        });
      }else{
        let noClassDiv = document.createElement("div");
        noClassDiv.setAttribute("style","padding: 10px;margin:5px");
        noClassDiv.innerHTML = "No classes";
        document.body.appendChild(noClassDiv);
      }


  } else {
    let noClassDiv = document.createElement("div");
    noClassDiv.setAttribute("style","padding: 10px;margin:5px");
    noClassDiv.innerHTML = "No classes yet!";
    document.getElementById("classList").appendChild(noClassDiv);
  }
  }))
}

function deleteClasses(){
  chrome.storage.sync.remove("data",function(){
  })
}

