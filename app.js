// Initialize Firebase
var config = {
    apiKey: "AIzaSyC_56hJwdH64iNnWeV4yf8t76vx5LGetlM",
    authDomain: "train-scheduler-fb90f.firebaseapp.com",
    databaseURL: "https://train-scheduler-fb90f.firebaseio.com",
    projectId: "train-scheduler-fb90f",
    storageBucket: "train-scheduler-fb90f.appspot.com",
    messagingSenderId: "803652599717"
};
firebase.initializeApp(config);

//storing the database in a variable
var trainName = '';
var destination = '';
var firstTrain = '';
var frequency = 0;


var database = firebase.database();



//taking inputed values of train name, destination, first train, and frequency on push of button
function addTrain() {
    var trainName = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrain = $("#firstTrain").val().trim();
    var frequency = $("#frequency").val().trim();




    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency

    });
}

database.ref().on("child_added", function (childSnapShot) {

    var snapval = childSnapShot.val();


    var trainName = snapval.trainName;
    var destination = snapval.destination;
    var firstTrainN = snapval.firstTrain;
    var frequency = snapval.frequency;

    var nextArrival;
    var tMinutesTillTrain;



    var firstTrainN = moment(childSnapShot.val().firstTrain, "HH:mm").subtract(1, "years");
    var diffTime = moment().diff(moment(firstTrainN), "minutes");
    var tRemainder = diffTime % frequency;
    var tMinutesTillTrain = childSnapShot.val().frequency - tRemainder;
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format('LT');

    var row = $('<tr>')
    var cellTrainName = $('<td>')
    cellTrainName.text(trainName)
    var cellDestination = $('<td>')
    cellDestination.text(destination)
    var cellFrequency = $('<td>')
    cellFrequency.text(frequency + " mins")
    var cellNextTrain = $('<td>')
    cellNextTrain.text(nextTrain)
    var cellNextArrival = $('<td>')
    cellNextArrival.text(nextArrival)
    var celltMinutesTillTrain = $('<td>')
    celltMinutesTillTrain.text("In " + tMinutesTillTrain + " mins")
    row.append(cellTrainName);
    row.append(cellDestination);
    row.append(cellFrequency);
    row.append(cellNextTrain);
    //row.append(cellNextArrival);
    row.append(celltMinutesTillTrain);


    $("#tableBody").append(row);
},
    function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    })


