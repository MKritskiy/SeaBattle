function canPlaceShip(field, x, y, isHor, size){
  if(!(x >= 0 && x < 10 && y >= 0 && y < 10)){
    return false;
  }
  if(isHor && x + size - 1 > 9){
    return false;
  }
  if(!isHor && y + size - 1 > 9){
    return false;
  }
  if(isHor){
    for(let k = 0; k < size; k++){
      for(let i = -1; i <= 1; i++) for(let j = -1; j <= 1; j++){
        if(x + i + k >= 0 && x + i + k< 10 && y + j >= 0 && y + j < 10 && field[x + i + k][y + j] != 0){
          return false;
        }
      }
    }
  }
  else{
    for(let k = 0; k < size; k++){
      for(let i = -1; i <= 1; i++) for(let j = -1; j <= 1; j++){
        if(x + i >= 0 && x + i< 10 && y + j + k >= 0 && y + j + k < 10 && field[x + i][y + j + k] != 0){
          return false;
        }
      }
    }
  }
  return true;
}

function placeShip(field, x, y, isHor, size){
  if(!canPlaceShip(field, x, y, isHor, size)){
    return false;
  }
  for(let i = 0; i < size; i++){
    if(isHor){
      field[x+i][y] = 1;
      console.log(field);
    }
    else{
      field[x][y+i] = 1;
    }
  }
  return true;
}

var Yadda = require('yadda');
var FeatureParser = Yadda.parsers.FeatureParser;



var English = require('yadda').localisation.English;
var el;

var library = English.library()

  .given('$TYPE cell on the field', function (className) {
	  el = {'className': className};
  })

  .when('cell take a fire', function () {
	  fire(el);
  })

  .then('there (?:are|are still) $TYPE cell on the field', function (className) {
	  QUnit.assert.equal(className, el.className);
   });

function countShipCellsOnField(field){
  let c = 0;
  for(let i = 0; i < 10; i++)for(let j = 0; j < 10; j++){
    if(field[i][j] == 1)
      c++
  }
  return c;
}

var library2 = English.library()
.given('empty field', function () {
  emptyField = [];
  for (let i = 0; i < 10; i++){
      let line = [];
      for (let j = 0; j < 10; j++){
          line.push(0);
      }
      emptyField.push(line);
  }
})

.when('we successfully place ship with size $NUM', function (number) {
  placeShip(emptyField, 0, 0, true, Number(number));
  console.log(emptyField);
})

.then('there are $NUM ship cells on the field', function (number) {
  QUnit.assert.equal(Number(number), countShipCellsOnField(emptyField));
 });


//    var res;
//    var library = English.library()

//    .given('$TYPE className ships have', function (className) {
//       document.querySelectorAll('#p2 .s').forEach(item=>item.className=className);
//    })
 
//    .when('we check the victory', function () {
//      res = victoryCheck();
//    })
 
//    .then('there (?:are|are still) $RES result of fight', function (result) {
//      QUnit.assert.equal(result, res);
//     });

function changeGameStatus(status) {
  var gameStatus = document.getElementById("game status");
  switch (status) {
    case 'd':
      gameStatus.innerText = "You have dealt a damage";
      break;
    case 'm':
      gameStatus.innerText = "You have missed";
      break;
    case 'win':
      gameStatus.innerText = "You have won";
      end=true;
      break;
    case 'lose':
      gameStatus.innerText = "You have lost";
      end=true;
      break;
  }
}

var library3 =English.library()
.given('status text is $TEXT', function (text) {
  document.getElementById("game status").innerText=text;
})

.when('when function is called with argument $ARG', function (arg) {
  changeGameStatus(arg);
})

.then('status text should be $TEXT', function (text) {
  QUnit.assert.equal(document.getElementById("game status").innerText, text);
 });



function victoryCheck(){
    if (document.querySelectorAll('#p2 .s').length === 0) {
        alert('You have won!'); 
        return true;
    }
    return false;
}

function fire(el) {
	if (el.className == 'd' || el.className == 'm') return false;
	if (el.className == 's'){ 
		el.className = 'd'; 
		return false;
	}
	el.className = 'm';
	if (victoryCheck()) {
		return false;
	}
	if (el.className == 'm') return true;
}




function runTests() {
    var text = document.getElementById('scenarios').innerText;
    var scenarios = new FeatureParser().parse(text).scenarios;
    for (var i = 0; i < scenarios.length; i++) {
      var scenario = scenarios[i];
      QUnit.test(scenario.title, buildTest(scenario));
  
      function buildTest(scenario) {
        return function () {
          Yadda.createInstance(library).run(scenario.steps);
        };
      }
    }
    runTests2();
    runTests3();
  }

function runTests2() {
    var text = document.getElementById('scenarios2').innerText;
    var scenarios = new FeatureParser().parse(text).scenarios;
    for (var i = 0; i < scenarios.length; i++) {
      var scenario = scenarios[i];
      QUnit.module("test placeShip BDD");
      QUnit.test(scenario.title, buildTest(scenario));
  
      function buildTest(scenario) {
        return function () {
          Yadda.createInstance(library2).run(scenario.steps);
        };
      }
    }
  }

  function runTests3() {
    var text = document.getElementById('scenarios3').innerText;
    var scenarios = new FeatureParser().parse(text).scenarios;
    for (var i = 0; i < scenarios.length; i++) {
      var scenario = scenarios[i];
      QUnit.module("test changeGameStatus BDD");
      QUnit.test(scenario.title, buildTest(scenario));
  
      function buildTest(scenario) {
        return function () {
          Yadda.createInstance(library3).run(scenario.steps);
        };
      }
    }
  }