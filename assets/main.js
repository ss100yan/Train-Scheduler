/* global moment firebase */

$(document).ready(function () {
    // Initialize Firebase

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
      var empName = $("#train-name-input").val().trim();
      var empRole = $("#destination-input").val().trim();
      var empStart = $("#Time-input").val().trim();
      var empRate = $("#Friquency-input").val().trim();
     
      // Creates local "temporary" object for holding employee data
      var newEmp = {
        name: empName,
        role: empRole,
        start: empStart,
        rate: empRate
      };
     
      // Uploads employee data to the database
      console.log(newEmp);
      database.ref().push(newEmp);
     
      // Logs everything to console
      console.log(newEmp.name);
      console.log(newEmp.role);
      console.log(newEmp.start);
      console.log(newEmp.rate);
     
      // Alert
      alert("Employee successfully added");
     
      // Clears all of the text-boxes
      $("#train-name-input").val("");
      $("#destination-input").val("");
      $("#Time-input").val("");
      $("#Friquency-input").val("");
     });
     
     // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
     database.ref().on("child_added", function(employeeSnapshot) {
     
      console.log(employeeSnapshot.val());
     
      // Store everything into a variable.
      var empName = employeeSnapshot.val().name;
      var empRole = employeeSnapshot.val().role;
      var empStart = employeeSnapshot.val().start;
      var empRate = employeeSnapshot.val().rate;
     
      // Employee Info
      console.log(empName);
      console.log(empRole);
      console.log(empStart);
      console.log(empRate);
     
      // Prettify the employee start
      var empStartPretty = moment(empStart).format("MM/DD/YY");
      var empStartMoment = moment(empStart, "YYYY-MM-DD");
     
      // Calculate the months worked using hardcore math
      // To calculate the months worked
      var empMonths = Math.abs(empStartMoment.diff(moment(), "months"));
      console.log(empMonths);
     
      // Calculate the total billed rate
      var empBilled = empMonths * empRate;
      console.log(empBilled);
    
      var createRow = function(data) {
        // Create a new table row element
        var tRow = $("<tr>");
    
        // Methods run on jQuery selectors return the selector they we run on
        // This is why we can create and save a reference to a td in the same statement we update its text
        var emName = $("<td>").text(empName);
        var emRole = $("<td>").text(empRole);
        var emStartDate = $("<td>").text(empStartPretty);
        var emMonths = $("<td>").text(empMonths);
        var emMonthly = $("<td>").text(empRate);
        var totalBilled = $("<td>").text(empBilled);
    
        // Append the newly created table data to the table row
        tRow.append(emName, emRole, emStartDate, emMonths, emMonthly, totalBilled);
        // Append the table row to the table body
        $("#currentEmployees").append(tRow);
        
      };
    
      createRow();
      
     });
    });
    