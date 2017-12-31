$(document).ready(function() {

  // Required init for dropdowns to work.
  $('select').material_select();

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDWOzsO-5lWbobwqB0XodtPUEbvHaei6pU",
    authDomain: "petproject-ebbc1.firebaseapp.com",
    databaseURL: "https://petproject-ebbc1.firebaseio.com",
    projectId: "petproject-ebbc1",
    storageBucket: "",
    messagingSenderId: "1068542777472"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

});

//Testing push to Ahmet.

//Components that we need in general terms
// What should appear when the page opens. Dynamically generated
// Install firebase
//Ajax call for PetFinder
//Ajax call for Google Places
// Match results to Google maps
