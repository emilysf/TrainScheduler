$(document).ready(function() {

	//firebase link
	trainData = new Firebase('https://train-emily.firebaseio.com/');

	//button to add trains
	$('#clickButton').on('click', function(){

		//gathers train info input
		var trainName = $('#train').val().trim();
		var trainDestination = $('#destination').val().trim();
		var trainTime = $('#time').val().trim();
		var trainFreq = $('#freq').val().trim();

		//creates object to hold train info
		var newTrain = {
			name: trainName,
			destination: trainDestination,
			time: trainTime,
			freq: trainFreq
		}

		//pushes data to firebase
		trainData.push(newTrain);

		console.log(newTrain);

		//clears boxes
		$('#train').val('');
		$('#destination').val('');
		$('#time').val('');
		$('#freq').val('');

		//prevents moving to new page
		return false;
	})

	//event adds data to the current train schedule chart
	trainData.on("child_added", function(childSnapshot, prevChildKey){

		//store everything in a variable
		var trainName = childSnapshot.val().name;
		var trainDestination = childSnapshot.val().destination;
		var trainTime = childSnapshot.val().time;
		var trainFreq = childSnapshot.val().freq;



		//first train time
		var firstTimeConverted = moment(trainTime ,"HH:mm").subtract(1, "years");
		console.log(firstTimeConverted);
		
		//current time
		var currentTime = moment();
		console.log("Current time: " + moment(currentTime).format("HH:mm"));

		var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
		console.log("Time difference: " + diffTime);

		//time apart
		var tRemainder = diffTime % trainFreq; 
		console.log("Time remaining: " + tRemainder);

		//minutes until next train 
		var trainMin = trainFreq - tRemainder;
		console.log("Minutes until train: " + trainMin);

		//nextTrain
		var nextTrain = moment().add(trainMin, "minutes");
		var nextArrival = moment(nextTrain).format("hh:mm A");
		
		//adds to train chart
		$('#traintable > tbody').append('<tr><td>' + trainName + '</td><td>' + trainDestination + '</td><td>' + trainFreq + '</td><td>' + nextArrival + '</td><td>' + trainMin + '</td></tr>');

	})
});