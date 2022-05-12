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

user_name = localStorage.getItem("user_name");
document.getElementById("user_name").innerHTML = "welcome " + user_name + " !";

function add_room() {
  room_name = document.getElementById("room_name").value;
  firebase.database().ref("/").child(room_name).update({
    purpose: "adding room name"
  });
  localStorage.setItem("room_name", room_name);
  window.location = "kwitter_page.html";

}



function getData() {
  firebase.database().ref("/").on('value', function (snapshot) {
    document.getElementById("output").innerHTML = "";
    snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key;
      Room_names = childKey;
      console.log("Room Name - " + Room_names);
      row = "<div class='room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)' >#" + Room_names + "</div><hr>";
      document.getElementById("output").innerHTML += row;
    });
  });

}

getData();

function redirectToRoomName(name) {
  localStorage.setItem("room_name", name);
  window.location = "kwitter_page.html";
}