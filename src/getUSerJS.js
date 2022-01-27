
const firebaseConfig = {
  apiKey: "AIzaSyC2-BYuwxbV3Gd5c8uCrkYUV2SvIwMA8xI",
  authDomain: "netflix-clone-99ba6.firebaseapp.com",
  databaseURL: "https://netflix-clone-99ba6-default-rtdb.firebaseio.com",
  projectId: "netflix-clone-99ba6",
  storageBucket: "netflix-clone-99ba6.appspot.com",
  messagingSenderId: "818916190394",
  appId: "1:818916190394:web:0c32712f688d59266eba83"
};
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth()
const database = firebase.database()
var PostManAPI = "http://localhost:3000/user";

function start(){
    // signIn();
    // handleCreateForm();
    ActiveBtn();
}
function ActiveBtn(){
    var signBtn = document.querySelector(".sign-in");
    var signUpBtn = document.querySelector(".btn");
    var form = document.querySelector(".signin-form");
    var signUpForm = document.querySelector(".signup-form");
    var input =document.querySelector(".input");
    var netflix_body = document.querySelector(".netflix-body");
    signBtn.addEventListener("click",()=>{
        form.style.visibility = "visible";
        form.style.opacity = 0.9
    })
    signUpBtn.addEventListener("click",()=>{
        signUpForm.style.visibility = "visible";
        signUpForm.style.opacity = 0.9
        var signUp_input = document.querySelector(".signUp_input");
        signUp_input.value = input.value
    })
    var back = document.querySelectorAll(".fa-arrow-left")
    back[0].addEventListener("click",()=>{
        form.style.visibility = "hidden";
        form.style.opacity = 0
    })  
    back[1].addEventListener("click",()=>{
        signUpForm.style.visibility = "hidden";
        signUpForm.style.opacity = 0
    })    
}
//When SignUp Btn Clicked => 
var signUpbtnForm = document.querySelector(".signUp_btn");
signUpbtnForm.addEventListener("click",()=>{
    var NewUserData = {
        email: document.querySelector(".signUp_input").value,
        name: document.querySelector(".userName_input").value,
        country: document.querySelector(".userCountry_input").value,
        password: document.querySelector(".signUpPass_input").value
    }
    if (validate_email(NewUserData.email) == false || validate_password((NewUserData.password) == false)){
        alert('Email or Password is Outta Line!!')
        return
        // Don't continue running the code
    }
    if (validate_field((NewUserData.name) == false || validate_field((NewUserData.country) == false))) {
        alert('One or More Extra Fields is Outta Line!!')
        return
    }
    auth.createUserWithEmailAndPassword(NewUserData.email,NewUserData.password)
        .then(()=>{ 
            var user = auth.currentUser;
            var database_ref = database.ref();
            const DateNow = Date.now(); 
            var time = new Date(DateNow).toString();

            var user_data = {
                email : NewUserData.email,
                full_name : NewUserData.name,
                country :NewUserData.country,            
                last_login : time
            }
            database_ref.child('users/' + user.uid).set(user_data)
            alert('User Created!!')
        })
        .catch(function(error) {
            // Firebase will use this to alert of its errors
            var error_code = error.code
            var error_message = error.message
            console.log(error_message)
        })
    console.log("Sign Complete")
})
var signInBtn = document.querySelector(".sign_btn");
signInBtn.addEventListener("click",()=>{
    var UserInput = {
        email:document.querySelector(".signIn_email").value,
        password:document.querySelector(".signIn_pass").value
    }
    auth.signInWithEmailAndPassword(UserInput.email,UserInput.password)
        .then(()=>{
            var user = auth.currentUser;
            var database_ref=database.ref();
            const DateNow = Date.now(); 
            var time = new Date(DateNow).toString();
            var user_data = {
                last_login: time
            }
            database_ref.child('users/' + user.uid).update(user_data)
            alert('User Logged In!!')
            setTimeout(Redirect(),1000)
        })
        .catch((error)=> {
            // Firebase will use this to alert of its errors
            var error_code = error.code
            var error_message = error.message

            alert(error_message)
        })
})
function validate_email(email) {
  var expression = /^[^@]+@\w+(\.\w+)+\w$/
  if (expression.test(email) == true) {
    // Email is good
    return true
  } else {
    // Email is not good
    return false
  }
}

function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  if (password < 6) {
    return false
  }
    else {
    return true
  }
}
function validate_field(field) {
  if (field <= 0) {
    return false
  } 
  else {
    return true
  }
}


//TEST USING JSON SERVER => npm start to start JSON SERVER (LOCALLY)
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
    window.location="./main.html"; 
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
start();
