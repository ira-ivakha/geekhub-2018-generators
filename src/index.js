// Symbols
// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Symbol

// let symbol = Symbol();
// console.log(symbol);
// console.log(typeof(symbol));
//
// let symbol2 = Symbol('named_symbol');
// let symbol3 = Symbol('named_symbol');
//
// console.log(symbol2 === symbol3); //false

// console.log(symbol2.toString());
// console.log(symbol3.toString());

// Symbol.for(), Symbol.keyFor() & global symbol registry

// Symbol.iterator
//
// let newGlobalSymbol = Symbol.for('new');
// console.log(Symbol.keyFor(newGlobalSymbol));
//
// let anotherGlobalSymbol = Symbol.for('new');
// console.log(newGlobalSymbol === anotherGlobalSymbol); // true

// // iterators
// // for .. of
//
// let iteratedArray = [0, 1, 2, 3];
//
// for (item of iteratedArray) {
// 	console.log(item);
// };

// let iteratedString = 'This is string';
//
// for (char of iteratedString) {
// 	console.log(char);
// }

//
//
// let iteratedArray = [0, 1, 2, 3];
//
// let iterator = iteratedArray[Symbol.iterator]();
//
// while (true) {
// 	let next = iterator.next();
// 	console.log(next.value, next.done);
// 	if (next.done) break;
// }
//
//
// //"handmade" iteartor
//
// let iteratedRange = {start: 5, end: 25};
// //
// iteratedRange[Symbol.iterator] = function(){
// 	let first = this.start;
// 	let last = this.end;
// 	return {
// 		next(){
// 			if (first <= last) {
// 				return {
// 					done: false,
// 					value: first++
// 				};
// 			}
// 			else {
// 				return {done: true};
// 			}
// 		}
// 	}
// };
//
// for (let iteratedNum of iteratedRange) {
// 	console.log(iteratedNum);
// }

//
// // generators
//
// function * strangeGenerator(){
// 	yield "start";
// 	yield "still works";
// 	yield "done";
// }
//
// let generator = strangeGenerator();
//
// while (true) {
// 	let nextStep = generator.next();
// 	console.log(nextStep);
// 	if (nextStep.done) break;
// }
//
// // generator - 2 async fucntions
// debugger;
//
// let coords;
// function * asyncGenerator(){
// 	let first = yield oneAsync();
// 	let second = yield secondAsync(coords);
// }
//
//
//
function oneAsync(){
	let addressString = document.getElementById('text_address').value.replace(' ', '+');

	logSteps(document.getElementById('result'), 'Step 1. Sending request to Google Geolocation API');

	if (addressString.length) {

			var xhrString = "https://maps.googleapis.com/maps/api/geocode/json?address="+addressString+"&key=AIzaSyAX9V8Y70UEAV3u5JeG5ec02Jwx9m7Jqg4";

			fetch(xhrString)
				.then(function(response) {
					console.log(response); // application/json; charset=utf-8
					console.log(response.status); // 200

					return response.json();
				})
				.then(function(response) {
					coords = response.results[0].geometry.location;
				})
				.catch( alert );

			}

};
//
function secondAsync(result) {
	let coordString = result;
	

	logSteps(document.getElementById('result'), 'Step 2. Got response from Google Geolocation API, sending coordinates to Openweather');

	let xhrString = "https://api.openweathermap.org/data/2.5/weather?lat="+coordString.lat+"&lon="+coordString.lng+"&units=metric&appid=8a02a3510c4caed42ce0b956393033c5";

	fetch(xhrString)
		.then(function(response) {
			console.log(response.status); // 200

			return response.json();
		})
		.then(function(response) {
			showWeather(response);
		})
		.catch( alert );


};
//
document.getElementById('fetch_address').addEventListener('click', startGenerator);
//
let newGenerator = asyncGenerator();
//
function startGenerator(){
	newGenerator.next();
};
//
function showWeather(response) {
	logSteps(document.getElementById('result'), `<h2>${response.name}</h2><p>Temperature ${response.main.temp} C</p>`);
}
//
function logSteps(targetElement, message) {
	targetElement.innerHTML = message;
}

let coords;
function * asyncGenerator(){
	let first = yield oneAsync();
	let second = yield secondAsync(coords);
}
