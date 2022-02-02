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
console.log(auth)
auth.onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    getUserData(user.uid)
  } 
});

function getUserData(uid) {
    database.ref('users/' + uid).once("value", snap => {
      var listItem = document.querySelector(".content__container__list__userName")
        var userInfo ={
          userName: document.querySelector(".user_name"),
          userFullName:document.querySelector(".user_id"),
          userEmail:document.querySelector(".user_email"),
          userCountry:document.querySelector(".user_country"),
          userLastLogin:document.querySelector(".user_last_login")
        }
        userInfo.userName.textContent = snap.val().user_Name;
        if(userInfo.userName.textContent<=10){
          listItem.textContent = userInfo.userName.textContent;
        }
        else{
          var substr = userInfo.userName.textContent.substr(0,7)+"...";
          listItem.textContent = substr;
        }
        userInfo.userFullName.value = snap.val().full_Name;
        userInfo.userEmail.value = snap.val().email;
        userInfo.userCountry.value = snap.val().country;
        userInfo.userLastLogin.value = snap.val().last_login;
    })
}

var signOut_btn = document.querySelector(".logout_btn");

auth.onAuthStateChanged((user) => {
  //if there's a user  
  if (user) {
      return
  } 
  else{
    signOut_btn.textContent = "Log In"
  }
});

signOut_btn.addEventListener('click',()=>{
  auth.onAuthStateChanged((user)=>{
    if(user){
      auth.signOut().then(()=>{
        alert("User Logout...")
        // console.log(auth)
      }) 
    }
  })
  
  // console.log(auth)    
})


window.addEventListener("beforeunload", function (e) {

      // *********** perform database operation here
      // before closing the browser ************** //
      auth.signOut().then(()=>{
        alert("User Logout...")
      })
      .catch((error)=>{
        alert(error)
      })
      // added the delay otherwise database operation will not work
      setTimeout(()=>{
        console.log("")
      },3000)
      return undefined;
});





//Happy New Year!!!!!!!!!!!!!2022