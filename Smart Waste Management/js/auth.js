document.addEventListener("DOMContentLoaded",()=>{

const login=document.getElementById("loginForm");
const signup=document.getElementById("signupForm");

if(login){
login.addEventListener("submit",e=>{
e.preventDefault();
window.location.href="dashboard.html";
});
}

if(signup){
signup.addEventListener("submit",e=>{
e.preventDefault();
window.location.href="dashboard.html";
});
}

});
