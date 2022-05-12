//YOUR FIREBASE LINKS
const firebaseConfig = {
      apiKey: "AIzaSyDGrKiReOJdFnxoQwnf2IPzaO6KKIZhL8Y",
      authDomain: "demo1-58dcf.firebaseapp.com",
      databaseURL: "https://demo1-58dcf-default-rtdb.firebaseio.com",
      projectId: "demo1-58dcf",
      storageBucket: "demo1-58dcf.appspot.com",
      messagingSenderId: "693564547035",
      appId: "1:693564547035:web:965644255f9c68a3ab91fe"
    };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


user_name = localStorage.getItem("username");
room_name = localStorage.getItem("room_name");

function button_send(){
      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
        name:user_name,
        message:msg,
        like:0
       });
    
      document.getElementById("msg").value = "";
    }
    
    function getData() {
      firebase.database().ref("/"+room_name).on('value', function(snapshot) {
          document.getElementById("output").innerHTML = "";
        snapshot.forEach(function(childSnapshot) {
           childKey  = childSnapshot.key;
           childData = childSnapshot.val();
           if(childKey != "purpose")
           {
             firebase_message_id = childKey;
             message_data = childData;
    
                 console.log(message_data);
                 name = message_data['name'];
                 message = message_data['message'];
                 like = message_data['like'];
             row = "<h4> "+ name +"<img class='user_tick' src='tick.png'></h4><h4 class='message_h4'>"+ message +"</h4><button class='btn btn-warning' id='"+firebase_message_id+"' value='"+like+"' onclick='updateLike(this.id)'><span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";       
            document.getElementById("output").innerHTML += row;
           }
        });
      });
    }
    
    getData();
    
    function updateLike(message_id)
    {
          button_id = message_id;
          likes = document.getElementById(button_id).value;
          likes_in_number = Number(likes) + 1;
          console.log(likes_in_number);
    
          firebase.database().ref(room_name).child(message_id).update({
                like : likes_in_number
           });
    
    }
    
    function logout() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location.replace("index.html");
    }