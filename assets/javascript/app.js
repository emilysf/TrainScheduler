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

	return false;
})