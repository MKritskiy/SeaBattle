
var Yadda = require('yadda');
var FeatureParser = Yadda.parsers.FeatureParser;



var English = require('yadda').localisation.English;
var library = English.library()

  .given('$x,$y coordinates of the field', function (x, y) {
	  this.x = x;
      this.y = y;
  })

  .when('all s tiles of the ship is d', function () {
  })

  .then('a $name is destroyed', function (testName) {
      const x = 1;
      const y = 1;
	  QUnit.assert.equal(testName, registerShipDeath(x, y));
   });


const enemyShips = findEnemyShips();

function findEnemyShips() {
    const ships = [];
    const p2Cells = document.querySelectorAll('#p2 .s');

    p2Cells.forEach((cell) => {
        const [x, y] = cell.id.split('_').map(Number);

        const existingShip = ships.find((ship) => {
            return ship.cells.some((existingCell) => {
                return (
                    (existingCell.x === x && Math.abs(existingCell.y - y) === 1) || // Горизонтальное соседство
                    (existingCell.y === y && Math.abs(existingCell.x - x) === 1) // Вертикальное соседство
                );
            });
        });

        if (existingShip) {
            existingShip.cells.push({ x, y });
        } else {
            ships.push({ cells: [{ x, y }] });
        }
    });

    return ships;
}

function registerShipDeath(x, y) {
    let name;
    // Find the ship that contains the cell (x, y)
    const ship = [
        { cells: [{ x: 1, y: 1 }] }].find((ship) =>
        ship.cells.some((cell) => cell.x === x && cell.y === x)
    );

    console.log(ship)

    if (ship) {
        // Mark the cell as hit
        ship.cells.forEach((cell) => {
            if (cell.x === x && cell.y === y) {
                cell.hit = true;
            }
        });
        
        const allCellsHit = ship.cells.every((cell) => cell.hit);
        
        if (allCellsHit) {
            switch (ship.cells.length){
                case 1: name = "submarine"
                    break;
                case 2: name = "Destroyer"
                    break;
                case 3: name = "Cruiser"
                    break;
                case 4: name = "Battleship"
                    break;
            }
        }
        
    } else {
        console.error(`No ship found at (${x}, ${y}).`);
    }
    return name
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
