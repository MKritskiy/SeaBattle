
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
  }
