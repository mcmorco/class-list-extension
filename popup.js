
const classesJSON = [
  {
    "Class Name": "Hello, World!",
       "Class Site": "https://www.google.com",
       "Zoom Link": "https://www.google.com",
       "Password": "123456"
  }
]
/**
 * Should look like:
 * const classesJSON = [
 * {
 *  "Class Name": "Math 21",
    "Class Site": "https://www.google.com",
    "Zoom Link": "https://www.google.com",
    "Password": "123456"
 * },{
 *  "Class Name": "Physics 71",
    "Class Site": "https://www.google.com",
    "Zoom Link": "https://www.google.com",
    "Password": "123456"
 * }
 * ]
 */


classesJSON.forEach(createButton)

function createButton(classData){
  let newDiv = document.createElement("div");

  let btn = document.createElement("div");
  btn.setAttribute("style","padding: 10px;margin:5px");
  btn.innerHTML = classData["Class Name"];
  btn.setAttribute("id",classData["Class Name"]+"Div");
  document.body.appendChild(btn);
  
  
  
  document.getElementById(classData["Class Name"]+"Div").appendChild(document.createElement("br"))

  let classSite = document.createElement("a");
  classSite.innerHTML = "Class Site";
  classSite.setAttribute("href",classData["Class Site"])
  classSite.setAttribute("target","_blank")
  classSite.setAttribute("style","margin-right: 10px;");
  document.getElementById(classData["Class Name"]+"Div").appendChild(classSite);


  let zoomLink = document.createElement("a");
  zoomLink.innerHTML = "Zoom Link";
  zoomLink.setAttribute("id",classData["Class Name"]+"ZoomLink")
  zoomLink.setAttribute("href",classData["Zoom Link"])
  zoomLink.setAttribute("target","_blank")
  document.getElementById(classData["Class Name"]+"Div").appendChild(zoomLink);

  document.getElementById(classData["Class Name"]+"Div").appendChild(document.createElement("br"))

  let pwdBtn = document.createElement("button");
  pwdBtn.innerHTML = "Copy Password";
  pwdBtn.addEventListener("click",myFunc, false);
  pwdBtn.myParam = classData["Password"]
  document.getElementById(classData["Class Name"]+"Div").appendChild(pwdBtn)
}

function myFunc(evt){
  navigator.clipboard.writeText(evt.currentTarget.myParam);
}

