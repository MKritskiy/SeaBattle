import { generateEnemyField } from "./functions.mjs";

var map = { '~': 0, 'w': 0, 's': 1, 'm': 2, 'd': 3 };

var end=false;

//Создаю самовызывающуюся функцию
(function (w, h) {
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
	for (let i = 0; i < w; i++) for (let j = 0; j < h; j++) {
		let div1 = document.createElement('div');
		//Задаем id по шаблону <i_j> координаты
		div1.id = i + '_' + j;
		//Задаем имя класса для правильной css разметки причем s - корабль, w - вода
		div1.className = p1map[i][j] == map['s'] ? 's' : 'w';
		//Добавляем клетки первому игроку
		p1.appendChild(div1);
		let div2 = document.createElement('div');
		div2.id = i + '_' + j;
		div2.className = p2map[i][j] == map['s'] ? 's' : 'w';
		//Добавляем обработчик нажатия для клетки противника
		//Если клетка доступна для выстрела, то выполнряем его
		div2.onclick = function () { if (!end) if (fire(this)) backfire(); };
		
		//Добавляем клетки второму игроку
		p2.appendChild(div2);
	}

	var combo=1;
	function getScore(status) {
		switch (status) {
			case 'd':
				score += 100*combo;
				combo+=1;
				break;
			case 'm':
				combo=1;
				break;
		}
		return score;
	}


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


	function fire(el) {
		if (el.className == 'd' || el.className == 'm') return false;
		if (el.className == 's') {
			el.className = 'd';
			changeGameStatus('d');
			document.querySelectorAll('#p2 .s').forEach(item => console.log(item.id));

			if (el.parentElement.id == 'p2')
				document.getElementById("score").innerText = getScore('d');
			if (victoryCheck()) {
				changeGameStatus('win');
			}
			return false;
		}
		el.className = 'm';

		if (el.className == 'm') {
			changeGameStatus('m');
			return true;
		}
	}

	function victoryCheck() {
		if (document.querySelectorAll('#p2 .s').length === 0) {
			alert('You have won!');
			return true;
		}
		return false;
	}
	function backfire() {
		for (let i = w * h; i > 0; i--) {
			var targets = document.querySelectorAll('#p1 .s, #p1 .w');
			if (targets.length === 0 || fire(targets[Math.floor(Math.random() * targets.length)])) break;
		}
		if (document.querySelectorAll('#p1 .s').length === 0) {
			changeGameStatus('lose');
			alert('You have lost!');
		}
	}

	QUnit.module('tests_victoryCheck', function () {
		QUnit.test('checkFalse', function (assert) {

			assert.false(victoryCheck());
		})
		// QUnit.test('checkTrue', function(assert){
		// 	document.querySelectorAll('#p2 .s').forEach(item=>item.className='d');
		// 	assert.true(victoryCheck());
		// })
	})

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


})(10, 10);



