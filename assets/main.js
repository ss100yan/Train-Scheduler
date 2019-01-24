/* global moment firebase */

$(document).ready(function () {
  
     // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBFrK8o_sY_ms8QqXt-dPhMVXDI2QNF1TU",
    authDomain: "train-scheduler-stoyan.firebaseapp.com",
    databaseURL: "https://train-scheduler-stoyan.firebaseio.com",
    projectId: "train-scheduler-stoyan",
    storageBucket: "train-scheduler-stoyan.appspot.com",
    messagingSenderId: "200682727357"
  };
  firebase.initializeApp(config);
    
   // Create a variable to reference the database
    var database = firebase.database();
       $("#Submit-btn").on("click", function(event) {
         event.preventDefault();
           // Grabs user input
            var trainName = $("#train-name-input").val().trim();
              var destination = $("#destination-input").val().trim();
               var firstTrainTime = $("#Time-input").val().trim();
                 var friquency = $("#Friquency-input").val().trim();
                   // Creates local "temporary" object for holding the train data
                     var newTrain = {
                       trainName: trainName,
                         destination: destination,
                           firstTrainTime: firstTrainTime,
                            friquency: friquency,
                              dateAdded: firebase.database.ServerValue.TIMESTAMP
                                };
                                 // Uploads Train data to the database
                                    console.log(newTrain);
                                       database.ref().push(newTrain);
                                   // Clears all of the text-boxes
                                  $("#train-name-input").val("");
                                $("#destination-input").val("");
                             $("#Time-input").val("");
                           $("#Friquency-input").val("");
                         });
                       // 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
                    database.ref().on("child_added", function(childSnapshot) {
                console.log(childSnapshot.val());
            // Store everything into a variable.
          var htmlTrainName =childSnapshot.val().trainName;
        var htmldestination = childSnapshot.val().destination;
      var htmlfirstTrainTime = childSnapshot.val().firstTrainTime;
   var htmlfriquency = childSnapshot.val().friquency;
 // Train Info
  console.log(htmlTrainName);
    console.log(htmldestination);
      console.log(htmlfirstTrainTime);
        console.log(htmlfriquency);
    
            var minAway;
              // Chang year so first train comes before now
                  var firstTrainNew = moment(childSnapshot.val().firstTrainTime, "hh:mm").subtract(1, "years");
                       // Difference between the current and firstTrain
                          var diffTime = moment().diff(moment(firstTrainNew), "minutes");
                              var remainder = diffTime % childSnapshot.val().frequency;
                                  // Minutes until next train
                                      var minAway = childSnapshot.val().frequency - remainder;
                                             // Next train time
                                                var nextTrain = moment().add(minAway, "minutes");
                                                      nextTrain = moment(nextTrain).format("hh:mm");
     


                                                          var createRow = function(data) {
                                                       // Create a new table row element
                                                     var tRow = $("<tr>");
                                                // Methods run on jQuery selectors return the selector they we run on
                                             // This is why we can create and save a reference to a td in the same statement we update its text
                                            var TTName = $("<td>").text(htmlTrainName);
                                          var TTD = $("<td>").text(htmldestination);
                                       var TTnext = $("<td>").text(nextTrain);
                                     var TTaway = $("<td>").text(minAway);
                                    var TTF = $("<td>").text(htmlfriquency);
                                   // Append the newly created table data to the table row
                                 tRow.append(TTName, TTD, TTF, TTaway, TTnext);
                               // Append the table row to the table body
                            $("#currentEmployees").append(tRow);
                          };
                        createRow();
                      });
                   });
    
