$(document).ready(function() {

  // Required init for dropdowns to work.
  $('select').material_select();

  // Required init for dropdowns to work.
  $(".rotate").rotator();

  // For modals to work.
  $('.modal').modal();

  $('.collapsible').collapsible();

  // -----------------------------------------------------------
  let addressPicker = new AddressPicker();

  $('#zip_code').typeahead(null, {
    displayKey: 'description',
    source: addressPicker.ttAdapter()
  });
  // Initialize Firebase
  const config = {
    apiKey: "AIzaSyDWOzsO-5lWbobwqB0XodtPUEbvHaei6pU",
    authDomain: "petproject-ebbc1.firebaseapp.com",
    databaseURL: "https://petproject-ebbc1.firebaseio.com",
    projectId: "petproject-ebbc1",
    storageBucket: "petproject-ebbc1.appspot.com",
    messagingSenderId: "1068542777472"
  };
  firebase.initializeApp(config);


  let database = firebase.database();
  let zipInput;
  let petName;
  let petGender;
  let petPhone;
  let petEmail;
  let aboutPet;
  let petAddress;
  let petCity;
  let petState;
  let petZipcode;
  let petImgURL;
  let petSearchResults = [];

  $("#submit").on("click", function() {

    event.preventDefault();

    $('#animalResults').html('')

    petSearchResults = [];
    console.log(petSearchResults);

    // -----------------------------------------------------------
    zipInput = $('#zip_code').val().trim()
    console.log(zipInput);

    var soughtAnimal = $('#choiceAnimal>option:selected').val().trim();
    console.log(soughtAnimal);
    var newSearch = {
      newSoughtAnimal: soughtAnimal,
      newZipInput: zipInput
    };
    database.ref().push(newSearch);

    var queryURL = `https://api.petfinder.com/pet.find?format=json&key=dd9016ebaee01ff97c4bd3319ee97eaf&animal=${soughtAnimal}&location=${zipInput}&?count=5&callback=?`
    console.log(queryURL);

    $.ajax({
      type: 'GET',
      url: queryURL,
      processData: true,
      data: {},
      dataType: "json",
      success: function(petApiData) {
        processData(petApiData);
      }
    });

    function processData(petApiData) {

      var results = petApiData.petfinder.pets

      $('#modalTitle').html(
        `Showing ${soughtAnimal}s near ${zipInput}`
      )


      for (var i = 0; i < 25; i++) {

        petSearchResults.push({
          petName: results.pet[i].name.$t,
          animalType: results.pet[i].animal.$t,
          petGender: results.pet[i].sex.$t,
          petPhone: results.pet[i].contact.phone.$t,
          petEmail: results.pet[i].contact.email.$t,
          aboutPet: results.pet[i].description.$t,
          petAddress: results.pet[i].contact.address1.$t,
          petCity: results.pet[i].contact.city.$t,
          petState: results.pet[i].contact.state.$t,
          petZipcode: results.pet[i].contact.zip.$t,
          petImgURL: results.pet[i].media.photos.photo[2].$t
        });
        console.log(petSearchResults)


        console.log("--------");
        console.log(`${petCity} ${petState} ${petZipcode}`);

        var location = `${petCity} ${petState} ${petZipcode}`;
        petImgURL = results.pet[i].media.photos.photo[2].$t;

        console.log('Image source link:');
        console.log(petImgURL);

        // console.log(breed1);
        // console.log(breed2);
        console.log("____________________");

        var petId = results.pet[i].id.$t;

        var animalModalId = "petId" + petId
        console.log(animalModalId);

        function filterEmailResults(results) {
          if (!results.pet[i].contact.email || !('$t' in results.pet[i].contact.email)) {
            return `<span class="noEmail">None Provided</span>`;
          } else {
            return `<a href="mailto:${results.pet[i].contact.email.$t}" class="email">${results.pet[i].contact.email.$t}</a>`;
          };
        };

        function filterPhoneResults(results) {
          if (!('$t' in results.pet[i].contact.phone)) {
            return 'None Provided';
          } else {
            return `${results.pet[i].contact.phone.$t}`;
          };
        };
        let email = filterEmailResults(results);
        let phone = filterPhoneResults(results);

        let animalCard = `<div class="col s12 m6 l3">
          <div class="card medium sticky-action">
          <div class="card-image" id="imgCustom" >
          <img class="activator" src="${petImgURL}">
          <span class="card-title" id="txtCustom">${petSearchResults[i].petName} (${petSearchResults[i].petGender})<br>${petSearchResults[i].petCity}</span>
          <a class="btn-floating btn-large waves-effect halfway-fab waves-light red petFav" data-value="${i}"><i class="material-icons">add</i></a>
          </div>
          <div class="card-content">
          <p>Phone: ${petSearchResults[i].petPhone}</p>
          <p>Email: <a href="mailto:${petSearchResults[i].petEmail}">${petSearchResults[i].petEmail}</a></p>
          </div>
          <div class="card-action">
          <a class="activator" href="#">Read more...</a>
          </div>
          <div class="card-reveal">
          <span class="card-title grey-text text-darken-4">${petSearchResults[i].petName}<i class="material-icons right">close</i></span>
          <p>${petSearchResults[i].aboutPet}</p>
          <iframe
          width="100%"
          height="300px"
          frameborder="0" style="border:0"
          src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBVnpyx6VUOqZt71-xpQox5I19np1HBjig&q=${ petSearchResults[i].petCity}${petSearchResults[i].petState}${petSearchResults[i].petZipcode}" allowfullscreen>
          </iframe>
          </div>
          </div>
          </div>`

        $('#animalResults').append(animalCard);
      }

    }
  });

  let queryURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${zipInput}&key=AIzaSyANo9S84eZ7PVyuKP2DSVE4wOawDLvocSE`;

  $.ajax({
    url: queryURL,
    method: "GET",
    success: function(response) {
      // response goes here

      console.log(response)
      console.log("-----------------------")
      console.log(response.results[0].geometry.location.lat)
      console.log(response.results[0].geometry.location.lng)
      latitude = response.results[0].geometry.location.lat;
      longitude = response.results[0].geometry.location.lng;
    }
  });

  var map;
  var infowindow;
  var longitude;
  var latitude;

  function initMap() {
    var newArea = {
      lat: latitude,
      lng: longitude
    };

    map = new google.maps.Map(document.getElementById('map'), {
      center: newArea,
      zoom: 15
    });

    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
      location: newArea,
      radius: 500,
      type: ['park']
    }, callback);
  }

  function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
    }
  }

  function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(place.name);
      infowindow.open(map, this);
    });
  }


  $(document).on("click", ".petFav", function() {

    event.preventDefault();

    console.log('Button has been clicked.');
    var animalDataIndex = $(this).data('value');
    // console.log(animalDataIndex);

    var newPetName = petSearchResults[animalDataIndex].petName;
    // console.log(newPetName)

    var newPetType= petSearchResults[animalDataIndex].animalType;
    // console.log(newPetGender)

    var newPetCity = petSearchResults[animalDataIndex].petCity;
    // console.log(newPetCity)

    var newPetFav = {
      name: newPetName,
      type: newPetType,
      city: newPetCity
    }
    database.ref().push(newPetFav);

  });

  database.ref().on("child_added", function(childSnapshot) {
    var petName = childSnapshot.val().name;
    var petType = childSnapshot.val().type;
    var petCity = childSnapshot.val().city;

    console.log(petName + '+' + petType + '+' + petCity);

    var tabRow = $('<tr />')
    var tabName = $('<td />')
    var tabCity = $('<td />')
    var tabType = $('<td />')

    $(tabName).html(petName)
    $(tabRow).append(tabName)

    $(tabType).html(petType)
    $(tabRow).append(tabType)

    $(tabCity).html(petCity)
    $(tabRow).append(tabCity)

    $('tbody').append(tabRow)

  })
    //get the object from firebase when clicked. repopulated on the favorites
    // $().on("click", function() {
    //
    // })
});

//Components that we need in general terms
// What should appear when the page opens. Dynamically generated
// Install firebase
//Ajax call for PetFinder
//Ajax call for Google Places
// Match results to Google maps
