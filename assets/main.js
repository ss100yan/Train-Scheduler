

$(document).ready(function () {
  
     // ..................Initialize Firebase
  var config = {
    apiKey: "AIzaSyBFrK8o_sY_ms8QqXt-dPhMVXDI2QNF1TU",
    authDomain: "train-scheduler-stoyan.firebaseapp.com",
    databaseURL: "https://train-scheduler-stoyan.firebaseio.com",
    projectId: "train-scheduler-stoyan",
    storageBucket: "train-scheduler-stoyan.appspot.com",
    messagingSenderId: "200682727357"
  };
  firebase.initializeApp(config);
    
   // .........Create a database variable
    var database = firebase.database();
       $("#Submit-btn").on("click", function(event) {
         event.preventDefault();
           // User input
            var trainName = $("#train-name-input").val().trim();
              var destination = $("#destination-input").val().trim();
               var firstTrainTime = $("#Time-input").val().trim();
                 var frequency = $("#Frequency-input").val().trim();
                   // Creates local "temporary" object for holding the train data
                     var newTrain = {
                       trainName: trainName,
                         destination: destination,
                           firstTrainTime: firstTrainTime,
                           frequency: frequency,
                              dateAdded: firebase.database.ServerValue.TIMESTAMP
                                };
                                 // Uploads data to firebase
                                    console.log(newTrain);
                                       database.ref().push(newTrain);
                                   
                                  $("#train-name-input").val("");
                                $("#destination-input").val("");
                             $("#Time-input").val("");
                           $("#Frequency-input").val("");
                         });
                      
                    database.ref().on("child_added", function(childSnapshot) {
                console.log(childSnapshot.val());
                    
          var htmlTrainName =childSnapshot.val().trainName;
        var htmldestination = childSnapshot.val().destination;
      var htmlfirstTrainTime = childSnapshot.val().firstTrainTime;
   var htmlfrequency = childSnapshot.val().frequency;
 // Train Info
  console.log(htmlTrainName);
    console.log(htmldestination);
      console.log(htmlfirstTrainTime);
        console.log(htmlfrequency);

         
            var minAway;
             
                  var firstTrainNew = moment(childSnapshot.val().firstTrainTime, "hh:mm").subtract(1, "years");
                       // Difference between the current and firstTrain
                          var diffTime = moment().diff(moment(firstTrainNew), "minutes");
                              var remainder = diffTime % childSnapshot.val().frequency;
                                  // Minutes until next train
                                      var minAway = childSnapshot.val().frequency - remainder;
                                             // Next train time
                                                var nextTrain = moment().add(minAway, "minutes");
                                                      nextTrain = moment(nextTrain).format("hh:mm");
                                                        console.log(minAway);
                                                            console.log(firstTrainNew);
                                                                console.log(diffTime);
                                                              console.log(remainder);
                                                            console.log(nextTrain);
                                                          var createRow = function(data) {
                                                       // Create a new table row element
                                                     var tRow = $("<tr>");

                                            var TTName = $("<td>").text(htmlTrainName);
                                          var TTD = $("<td>").text(htmldestination);
                                       var TTnext = $("<td>").text(nextTrain);
                                     var TTaway = $("<td>").text(minAway);
                                    var TTF = $("<td>").text(htmlfrequency);
                                   // Append the newly created table data to the table row
                                 tRow.append(TTName, TTD, TTF, TTnext, TTaway);
                               // Append the table row to the table body
                            $("#currentEmployees").append(tRow);
                          };
                        createRow();
                      });
                   });

                function display_c(){
              var refresh=1000; // Refresh rate in milli seconds
            mytime=setTimeout('display_ct()',refresh)
          }
       function display_ct() {
     var x = new Date()
   document.getElementById('ct').innerHTML = x;
display_c();
}

    
