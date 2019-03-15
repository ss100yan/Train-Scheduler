//............Jquery document ready function waiting for the page to load............
$(document).ready(function () {
  
     // ..................Initialize Firebase................
  var config = {
    apiKey: "AIzaSyBFrK8o_sY_ms8QqXt-dPhMVXDI2QNF1TU",
    authDomain: "train-scheduler-stoyan.firebaseapp.com",
    databaseURL: "https://train-scheduler-stoyan.firebaseio.com",
    projectId: "train-scheduler-stoyan",
    storageBucket: "train-scheduler-stoyan.appspot.com",
    messagingSenderId: "200682727357"
  };
  firebase.initializeApp(config);
    
   // .........Create a database variable....................
    var database = firebase.database();
       $("#Submit-btn").on("click", function(event) {
         event.preventDefault();
           // .............User input variables......................
            var trainName = $("#train-name-input").val().trim();
              var destination = $("#destination-input").val().trim();
               var firstTrainTime = $("#Time-input").val().trim();
                 var frequency = $("#Frequency-input").val().trim();
                  //..................Object for firebase................
                    var newTrain = {
                       trainName: trainName,
                         destination: destination,
                           firstTrainTime: firstTrainTime,
                           frequency: frequency
                               };
                                 // ......Pushinh the new object data to firebase............
                                    console.log(newTrain);
                                       database.ref().push(newTrain);
                                  $("#train-name-input").val("");
                                $("#destination-input").val("");
                             $("#Time-input").val("");
                           $("#Frequency-input").val("");
                         });
                        //.................Storing the data from firebase in to variables...........
                    database.ref().on("child_added", function(childSnapshot) {
              console.log(childSnapshot.val());    
          var htmlTrainName =childSnapshot.val().trainName;
        var htmldestination = childSnapshot.val().destination;
      var htmlfirstTrainTime = childSnapshot.val().firstTrainTime;
   var htmlfrequency = childSnapshot.val().frequency;
 // .........Loging in the data in the console..........................
  console.log(htmlTrainName);
    console.log(htmldestination);
      console.log(htmlfirstTrainTime);
        console.log(htmlfrequency);
          //...............Using Moment.js to calculate   minutes away and next train arrival time.........................
            var minAway;
                 //..................First train time ............................................ 
                  var firstTrainNew = moment(childSnapshot.val().firstTrainTime, "hh:mm");
                       //............. Difference between the current and firstTrain.................
                          var diffTime = moment().diff(moment(firstTrainNew), "minutes");
                           //.....reminder of the difference between the current and firstTrain and the train friquency....
                              var remainder = diffTime % childSnapshot.val().frequency;
                                  // ..............Minutes until next train......................
                                      var minAway = childSnapshot.val().frequency - remainder;
                                             // .............Next train time....................
                                                var nextTrain = moment().add(minAway, "minutes");
                                                      nextTrain = moment(nextTrain).format("hh:mm");
                                                       // .........Loging in the data in the console...............
                                                        console.log(minAway);
                                                            console.log(firstTrainNew);
                                                                console.log(diffTime);
                                                              console.log(remainder);
                                                            console.log(nextTrain);
                                                          // ...Creating a new table row element....
                                                       var createRow = function(data) {
                                                  var tRow = $("<tr>");
                                             var TTName = $("<td>").text(htmlTrainName);
                                          var TTD = $("<td>").text(htmldestination);
                                       var TTnext = $("<td>").text(nextTrain);
                                     var TTaway = $("<td>").text(minAway);
                                    var TTF = $("<td>").text(htmlfrequency);
                                   // .......Append the newly created table data to the table row
                                 tRow.append(TTName, TTD, TTF, TTnext, TTaway);
                               // .....Append the table row to the table body
                            $("#currentEmployees").append(tRow);
                          };
                        createRow();
                      });
                   });
                  // .................Current time display widget function...........
                function display_c(){
              var refresh=1000; 
            mytime=setTimeout('display_ct()',refresh)
          }
       function display_ct() {
     var x = new Date()
   document.getElementById('ct').innerHTML = x;
display_c();
}

    
