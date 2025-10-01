let usernameInput=document.getElementById("username");
let answerInput=document.getElementById("answer");
usernameInput.addEventListener("focus",function(){
    usernameInput.style.color="white";
})
answerInput.addEventListener("focus",function(){
    answerInput.style.color="white";
})
document.getElementById("forgot-form").addEventListener("submit",function(event){
    event.preventDefault();
    const username=document.getElementById("username").value;
    document.getElementById("i").textContent="Enter Username";
    document.getElementById("question-section").style.display='none';
    document.getElementById("aIncorrect").textContent="";
    document.getElementById("password-section").style.display='none';
    fetch("login.json")
    .then(response=>response.json())
    .then(accounts=>{
        for(const user of accounts){
            valid_username= username===user.username;
            if(valid_username){
                question=user.secret_question;
                secretAnswer=user.secret_answer;
                password=user.password;
                document.getElementById("uIncorrect").innerHTML=""
                document.getElementById("question").textContent=question;
                document.getElementById("question-section").style.display='block';
                document.getElementById("i").textContent="Answer the Question";
                break;
            } 
        }
        if(!valid_username){
            document.getElementById("username").style.color="red";
            document.getElementById("uIncorrect").innerHTML="Invalid Username!";
        }
    })
    .catch(error=>{
        console.error('Error:',error);
        document.getElementById("uIncorrect").textContent="An error occured. Try again later"
    })
})
function checkAnswer(){
    answer=document.getElementById("answer").value;
    if(answer===secretAnswer){
        document.getElementById("question-section").style.display='none';
        document.getElementById("aIncorrect").textContent="";
        document.getElementById("password").textContent=password;
        document.getElementById("password-section").style.display='block';
        document.getElementById("i").textContent="Password Recovered";
        document.getElementById("i").style.color='#0f0';
        document.body.style.backgroundColor='#020';
        element=document.querySelector(".container");
    } else{
        document.getElementById("answer").style.color="red";
        document.getElementById("aIncorrect").textContent="Incorrect Answer";
        document.getElementById("password-section").style.display='none';
    }
}