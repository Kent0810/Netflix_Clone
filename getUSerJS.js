var PostManAPI = "http://localhost:3000/user";

function start(){
    handleCreateForm();
    SignIn();
}
start();

async function handleCreateForm(){
    var createBtn = document.querySelector(".sign_btn");
    var id = 0;
    createBtn.addEventListener("click",async ()=>{
        await fetch(PostManAPI)
            .then((response)=>{
                return response.json()
            })
            .then((data)=>{
                id =data.length+1;
            })
        var name =document.querySelector(".sign_input").value;
        var pass =document.querySelector(".pass_input").value;    
        var formData = {
            id: id,
            email: name,
            pass: pass
        }
        if(formData.email!=""&&formData.pass!=""){
            if(await checkforDuplicate(formData)){
                // sendData(formData);
                document.querySelector(".sign_input").textContent = "";
                document.querySelector(".pass_input").textContent = "";
                setTimeout('Redirect()', 1000);
            }
            else alert("Wrong Account or PassWord")
        }
        else alert("Please Enter Your Email or PassWord")
    })
}
function sendData(data){
    let option = {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    console.log(option)
    //POST TO POSTMAN AND NOT TALKING ANY RESPONSE
    fetch(PostManAPI,option);
}


function Redirect() 
{  
    window.location="./index.html"; 
}

function SignIn(){
    var signBtn = document.querySelector(".sign-in");
    var form = document.querySelector(".signin-form");
    var netflix_body = document.querySelector(".netflix-body");
    signBtn.addEventListener("click",()=>{
        form.style.visibility = "visible";
        form.style.opacity = 0.9
    })
    var back = document.querySelector(".fa-arrow-left")
    back.addEventListener("click",()=>{
        form.style.visibility = "hidden";
        form.style.opacity = 0
    })
   
}
async function checkforDuplicate(input){
    var flag = false;
    await fetch(PostManAPI)
        .then((response)=>{
            return response.json();
        })
        .then((data)=>{       
            data.forEach(element => {
                if((element.email == input.email)&&(element.pass == input.pass)){
                    flag = true;
                }
            });        
        })
    return flag; 
}