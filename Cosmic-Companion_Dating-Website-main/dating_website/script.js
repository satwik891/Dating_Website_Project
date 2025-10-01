function tryAgain(){
    document.getElementById("match").style.display="none";
    document.getElementById("noMatch").style.display="none";   
    document.forms[0].style.display="block";
}

let vInterests={
    "Traveling":14,
    "Sports":14,
    "Movies":12,
    "Music":14,
    "Literature":18,
    "Technology":16,
    "Fashion":16,
    "Art":18
}
let vHobbies={
    "Reading":16,
    "Cooking":14,
    "Coding":16,
    "Gardening":14,
    "Painting":18,
    "Watching Youtube/Instagram":10,
    "Photography":18,
    "Playing musical instruments":16
}


document.getElementById("dating-form").addEventListener("submit",function(event){
    event.preventDefault();

    document.body.style.animation="change 1s linear infinite";

    let gender=document.getElementById("gender").value;
    if(gender=="Other"){
        gender="None"
    }
    let int=document.getElementsByName("interest");
    let interests=[];
    for(i=0;i<int.length;i++){
        if(int[i].checked){
            interests.push(int[i].value)
        }
    }
    let hobb=document.getElementsByName("hobby");
    let hobbies=[];
    for(i=0;i<hobb.length;i++){
        if(hobb[i].checked){
            hobbies.push(hobb[i].value)
        }
    }

    let year=document.getElementById("year").value;
    let age=document.getElementById("age").value;

    document.forms[0].style.display="none";

    fetch("students.json")
    .then(response=>response.json())
    .then(students=>{
        let best=[];
        for(i=0;i<students.length;i++){
            const student=students[i];
            if(student.Gender==gender){
                continue;
            }
            let current=[0,0];
            for(hobby of student.Hobbies){
                if(hobbies.includes(hobby)){
                    current[0]+=vHobbies[hobby];
                    current[1]+=vHobbies[hobby];
                }
            }
            for(interest of student.Interests){
                if(interests.includes(interest)){
                    current[0]+=vInterests[interest];
                }
            }

            if(student["Year of Study"]==year){
                current[2]=1;
            }
            else{
                current[2]=0;
            }
            current[3]=-1*Math.abs(age-student.Age);
            current[4]=i;

            if(!best.length){
                best=current;
                continue;
            }
            for(j=0;j<4;j++){
                if(current[j]<best[j]){break;}
                if(current[j]>best[j]){best=current;}
            }
        }
        
        setTimeout(function(){
            document.body.style.animation="change 30s ease infinite";
            var style=document.createElement("style");
            var css=`
            #match{
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
            }`;
            style.textContent=css;
            document.head.appendChild(style);
        if(!best.length){
            document.getElementById("noMatch").textContent="No Match Found";
            document.getElementById("noMatch").style.display="block";   
        }
        else{
            match=students[best[4]];
            document.getElementById("mName").textContent=match.Name;
            document.getElementById("photo").src=match.Photo;
            document.getElementById("mAge").textContent=match.Age;
            document.getElementById("mYear").textContent=match["Year of Study"];
            document.getElementById("mGender").textContent=match.Gender;
            document.getElementById("mInterests").textContent=match.Interests;
            document.getElementById("mHobbies").textContent=match.Hobbies;
            document.getElementById("match").style.display="block";
        }
    },2000)
 
    })
})


