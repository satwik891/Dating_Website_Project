
document.getElementById('showFilters').addEventListener('click', function() {
    var formContainer=document.getElementById('filterContainer');
    formContainer.style.top = '0';
});
  
document.getElementById('hideFilters').addEventListener('click', function() {
    var formContainer=document.getElementById('filterContainer');
    formContainer.style.top="-100%";
    
});
  
function resize(){
    let width=window.innerWidth;
    if(width>1200){
        document.getElementById("studentsContainer").style.gridTemplateColumns="repeat(4,1fr)"
    }
    else if(width>800){
              document.getElementById("studentsContainer").style.gridTemplateColumns="repeat(3,1fr)"
          }
          else if(width>500){
              document.getElementById("studentsContainer").style.gridTemplateColumns="repeat(2,1fr)"
          }
          else{
              document.getElementById("studentsContainer").style.gridTemplateColumns="repeat(1,1fr)"
          }
  
      }
resize();
window.addEventListener('resize',resize);
  
function viewProfiles(){
  
    document.getElementById("studentsContainer").innerHTML="";
  
    let gender=document.getElementById("gender").value;
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
  
  
fetch('students.json')
    .then(response => response.json())
    .then(accounts => {
      const studentsContainer = document.getElementById('studentsContainer');
  
      accounts.forEach(student => {
        let valid=true;
        
        if(year!="None" && year!=student["Year of Study"]){valid=false;}
        if(valid==true && age!=`0`&& age!=student.Age){ valid=false;}
        if(valid==true && gender!="None" && gender!=student.Gender){valid=false;}
        if(valid==true && interests!=[]){
          for(hobby of hobbies){
                  if(!student.Hobbies.includes(hobby)){valid=false;break;}
          }
        }
        if(valid==true && hobbies!=[]){
          for(interest of interests){
                  if(!student.Interests.includes(interest)){valid=false;break;}
          }
        }
        if(valid){
        const studentProfile = document.createElement('div');
        studentProfile.classList.add('student');
  
        const studentPhoto = document.createElement('img');
        studentPhoto.src = student.Photo;
        studentProfile.appendChild(studentPhoto);
  
        const studentDetails = document.createElement('div');
        studentDetails.classList.add('student-details');
        studentDetails.innerHTML = `
          <p>Name: ${student.Name}</p>
          <p>Year: ${student["Year of Study"]}</p>
          <p>Age: ${student.Age}</p>
          <p>Gender: ${student.Gender}</p>
          <p>Interests:${student.Interests}</p>
          <p>Hobbies:${student.Hobbies}</p>
        `;
        studentProfile.appendChild(studentDetails);
  
        studentsContainer.appendChild(studentProfile);
        }
        
      });
    })
    .catch(error => console.error('Error fetching students data:', error));
  }
  
  viewProfiles();
  
  document.getElementById("addFilters").addEventListener("submit",function(event){
    event.preventDefault();
    viewProfiles();
  })