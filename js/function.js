import { generateEnemyField } from "./functions.mjs";

var map = {'~':0, 'w':0, 's':1, 'm':2, 'd':3};

const shipInfo = {
	Battleship: { length: 4, count: 1 },
	Cruiser: { length: 3, count: 2 },
	Destroyer: { length: 2, count: 3 },
	Submarine: { length: 1, count: 4 },
};



//Создаю самовызывающуюся функцию
(function(w, h) {
	var score = 0;
	var p1map = generateEnemyField();
	var p2map = generateEnemyField();
	//Здесь я задаю массив поля игрока и противника
	//Получаю элменты полей из html разметки
	var p1 = document.querySelector('#p1');
	p1.innerHTML = "";
	var p2 = document.querySelector('#p2');
	p2.innerHTML = "";
	//Здесь мы создаем клетки div1 для первого игрока и div2 для второго
	for (let i=0;i<w;i++) for (let j=0;j<h;j++) {
		let div1 = document.createElement('div');
		//Задаем id по шаблону <i_j> координаты
		div1.id = i+'_'+j;
		//Задаем имя класса для правильной css разметки причем s - корабль, w - вода
		div1.className = p1map[i][j] == map['s'] ? 's' : 'w';
		//Добавляем клетки первому игроку
		p1.appendChild(div1);
		let div2 = document.createElement('div');
		div2.id = i+'_'+j;
		div2.className = p2map[i][j] == map['s'] ? 's' : 'w';
		//Добавляем обработчик нажатия для клетки противника
		//Если клетка доступна для выстрела, то выполнряем его

		div2.onclick = function () { if (fire(this)) backfire(); };
		//Добавляем клетки второму игроку
		p2.appendChild(div2);
	}

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
	console.log(enemyShips)

	function getScore(status){
		switch (status){
			case 'd':
				score+=10;
				break;
		}
		return score;``
	}


	function changeGameStatus(status) {
		var gameStatus = document.getElementById("game status");
		switch (status){
			case 'd':
				gameStatus.innerText = "You make a damage";

				break;
			case 'm':
				gameStatus.innerText = "You have missed";
				break;
			case 'win':
				gameStatus.innerText = "You have won";
				break;
			case 'lose':
				gameStatus.innerText = "You have lost";
				break;
		}
	}

	document.querySelectorAll('#p2 .s').forEach(item=>console.log(item.id));

	function registerShipDeath(x, y) {
		// Find the ship that contains the cell (x, y)
		const ship = enemyShips.find((ship) =>
			ship.cells.some((cell) => cell.x === x && cell.y === y)
		);
		
		console.log(ship)

		if (ship) {
			// Mark the cell as hit
			ship.cells.forEach((cell) => {
				if (cell.x === x && cell.y === y) {
					cell.hit = true;
				}
			});

			// Check if all cells of the ship are hit
			const allCellsHit = ship.cells.every((cell) => cell.hit);

			if (allCellsHit) {
				// Create a new array without the destroyed ship
				const updatedShips = enemyShips.filter((s) => s !== ship);
				switch (ship.cells.length){
					case 1: name = "Submarine" 
						break;
					case 2: name = "Destroyer"
						break;
					case 3: name = "Cruiser" 
						break;
					case 4: name = "Battleship"
						break;
				}                                     				
				console.log(`Ship of type ${name} has been destroyed.`); 

				// Update the ships array
				enemyShips.length = 0;
				enemyShips.push(...updatedShips);

				console.log(enemyShips)
				console.log(shipInfo[name])
				
				// Decrement the count for the ship type in shipInfo
				shipInfo[name].count--;

				
				
			}
		} else {
			console.error(`No ship found at (${x}, ${y}).`);
		}
	}


	function fire(el) {
		if (el.className == 'd' || el.className == 'm') return false;
		if (el.className == 's'){
			el.className = 'd';
			changeGameStatus('d');
			if (el.parentElement.id=='p2'){
				document.getElementById("score").innerText = getScore('d');
				
				const [x, y] = el.id.split('_').map(Number);
				

				// Register the ship death based on the hit cell
				registerShipDeath(x, y);
			}
			
			return false;
		}
		el.className = 'm';
		if (victoryCheck()) {
			changeGameStatus('win');
			return false;
		}
		if (el.className == 'm') {
			changeGameStatus('m');
			return true;
		}
		
	}
	function victoryCheck(){
		if (document.querySelectorAll('#p2 .s').length === 0) {
			alert('You have won!');
			return true;
		}
		return false;
	}
	function backfire() {
		for (let i=w*h;i>0;i--) {
			var targets = document.querySelectorAll('#p1 .s, #p1 .w');
			if (targets.length === 0 || fire(targets[Math.floor(Math.random() * targets.length)])) break;
		}
		if (document.querySelectorAll('#p1 .s').length === 0) {
			changeGameStatus('lose');
			alert('You have lost!');
		}
	}

	// QUnit.module('tests_victoryCheck', function(){
	// 	QUnit.test('checkFalse', function(assert){
	//
	// 		assert.false(victoryCheck());
	// 	})
	// 	// QUnit.test('checkTrue', function(assert){
	// 	// 	document.querySelectorAll('#p2 .s').forEach(item=>item.className='d');
	// 	// 	assert.true(victoryCheck());
	// 	// })
	// })

	// QUnit.module('tests_fire', function(){
	// 	QUnit.test('fire_w', function(assert){
	// 		var el = {'className':'w'};
	// 		assert.true(fire(el));
	// 	})
	// 	QUnit.test('fire_s', function(assert){
	// 		var el = {'className':'s'};
	// 		assert.false(fire(el));
	// 	})
	// 	QUnit.test('fire_d', function(assert){
	// 		var el = {'className':'d'};
	// 		assert.false(fire(el));
	// 	})
	// 	QUnit.test('fire_m', function(assert){
	// 		var el = {'className':'m'};
	// 		assert.false(fire(el));
	// 	})
	// });

	// Тест для функции findEnemyShips
	QUnit.test('findEnemyShips', function (assert) {
		const p2CellsMock = [
			{ id: '1_1' },
			{ id: '1_2' },
			{ id: '1_3' },
			{ id: '3_3' },
			{ id: '3_4' },
		];
		const querySelectorAllMock = (selector) => {
			if (selector === '#p2 .s') {
				return p2CellsMock;
			}
		};
		const originalQuerySelectorAll = document.querySelectorAll;
		document.querySelectorAll = querySelectorAllMock;
		const ships = findEnemyShips();
		document.querySelectorAll = originalQuerySelectorAll;
		assert.ok(Array.isArray(ships), 'findEnemyShips should return an array');
		assert.equal(ships.length, 2, 'The returned array should contain 2 ships');
		assert.deepEqual(
			ships,
			[
				{ cells: [{ x: 1, y: 1 }, { x: 1, y: 2 }, { x: 1, y: 3 }] },
				{ cells: [{ x: 3, y: 3 }, { x: 3, y: 4 }] },
			],
			'The returned array should contain the correct ship objects'
		);
	});

	QUnit.test('findEnemyShips', function (assert) {
		const p2CellsMock = [
			{ id: '1_1' },
			{ id: '1_2' },
			{ id: '1_5' },
			{ id: '4_3' },
			{ id: '3_4' },
		];
		const querySelectorAllMock = (selector) => {
			if (selector === '#p2 .s') {
				return p2CellsMock;
			}
		};
		const originalQuerySelectorAll = document.querySelectorAll;
		document.querySelectorAll = querySelectorAllMock;
		const ships = findEnemyShips();
		document.querySelectorAll = originalQuerySelectorAll;
		assert.ok(Array.isArray(ships), 'findEnemyShips should return an array');
		assert.equal(ships.length, 4, 'The returned array should contain 4 ships');
		assert.deepEqual(
			ships,
			[
				{ cells: [{ x: 1, y: 1 }, { x: 1, y: 2 }] },
				{ cells: [{ x: 1, y: 5 }]},
				{ cells: [{ x: 4, y: 3 }]},
				{ cells: [{ x: 3, y: 4 }]}
			],
			'The returned array should contain the correct ship objects'
		);
	});



})(10, 10); 



