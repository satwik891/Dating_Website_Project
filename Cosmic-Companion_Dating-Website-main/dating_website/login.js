//Changing background image for every 6 seconds
const bgImg=['background/bg1.png','background/bg2.jpg','background/bg3.jpg','background/bg4.jpg','background/bg5.png','background/bg6.jpg'];
let i=1;
function changeBg(){
    document.body.style.backgroundImage="url('"+bgImg[i]+"')";
    i=(i+1)%bgImg.length;
}
setInterval(changeBg,6000);//calling changeBg function every 6 sec

let passwordInput=document.getElementById("password");
let usernameInput=document.getElementById("username");

passwordInput.addEventListener("focus",function(){
passwordInput.style.color="white"; //reverting input color to normal
})
usernameInput.addEventListener("focus",function(){
usernameInput.style.color="white"; //reverting input color to normal
})
document.getElementById("login-form").addEventListener("submit",function(event){
event.preventDefault();
const username=usernameInput.value;
const password=passwordInput.value;
//fetching login.json
fetch("login.json")
.then(response=>response.json())
.then(accounts=>{
for(const user of accounts){
    valid_username = user.username===username;
    valid_password = user.password===password;
    if(!valid_username){
        continue;
    }else if(!valid_password){
        document.getElementById("login-message").textContent="Incorrect Password!";//displaying error message
        passwordInput.style.color="red";//marking pwd input color to red
        break;
    }else{
        window.location.href="dating.html";
        break;
    }
}
if(!valid_username){
    document.getElementById("login-message").textContent="User not found!";//displaying error message
    usernameInput.style.color="red"; //marking username input to red
}
})
.catch(error=>{
console.error('Error:',error);
document.getElementById("login-message").textContent="An error occurred. Try again later."
});
})