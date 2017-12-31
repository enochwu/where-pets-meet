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

$.getJSON('http://api.petfinder.com/pet.find?format=json&key=dd9016ebaee01ff97c4bd3319ee97eaf&animal=cat&location=94025&?count=5&callback=?')
  .done(function(petApiData) {

  // Looping through each result item
  var results = petApiData.petfinder.pets

  for (var i = 0; i < 25; i++) {

    // var breed1 = results.pet[i].breeds.breed[0].$t
    // var breed2 = results.pet[i].breeds.breed[1].$t
    var petName = results.pet[i].name.$t
    console.log(petName);

    var gender = results.pet[i].sex.$t
    console.log(gender);
    var petPhone = results.pet[i].contact.phone.$t
    console.log(results.pet[i].contact.phone.$t);

    console.log(results.pet[i].contact.email.$t);
    console.log(results.pet[i].description.$t);
    console.log(results.pet[i].contact.city.$t);
    console.log(results.pet[i].contact.state.$t);

    console.log(results.pet[i].contact.zip.$t);
    console.log("--------");
    console.log((results.pet[i].contact.city.$t)+" "+(results.pet[i].contact.state.$t)+" "+(results.pet[i].contact.zip.$t));
    console.log(results.pet[i].media.photos.photo[2].$t);

    // console.log(breed1);
    // console.log(breed2);
    console.log("____________________");

    // // Creating and storing a div tag
    // var animalPic = $("<img />");
    //
    // // Setting the src attribute of the image to a property pulled off the result item
    // animalPic.addClass('animalPic img-rounded media-middle');
    // animalPic.attr("src", results[i].images.fixed_height.url);
    // animalPic.attr("data-animate", results[i].images.fixed_height.url);
    // animalPic.attr("data-still", results[i].images.fixed_height_still.url);
    // animalPic.attr("data-still", results[i].images.fixed_height_still.url);
    // animalPic.attr("data-state", "animate");
    //
    // // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
    // $("#gifSpace").prepend(animalPic);
  }

})
  .error(function(err) {
    alert('Error retrieving data!');
});

// $.getJSON('http://api.petfinder.com/my.method?format=json&key=12345&callback=?')
//   .done(function(petApiData) { alert('Data retrieved!'; })
//   .error(function(err) { alert('Error retrieving data!');
// });


//Components that we need in general terms
// What should appear when the page opens. Dynamically generated
// Install firebase
//Ajax call for PetFinder
//Ajax call for Google Places
// Match results to Google maps
