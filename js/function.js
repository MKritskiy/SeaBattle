import { generateEnemyField } from "./functions.mjs";

var map = {'~':0, 'w':0, 's':1, 'm':2, 'd':3};
//var map = {'~':'~', 'w':'w', 's':'s', 'm':'m', 'd':'d'};

//Создаю самовызывающуюся функцию
(function(w, h) {
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
        div2.className = p2map[i][j] == map['s'] ? 's' : 'w';
		//Добавляем обработчик нажатия для клетки противника
		//Если клетка доступна для выстрела, то выполнряем его
        div2.onclick = function () { if (fire(this)) backfire(); };
		//Добавляем клетки второму игроку
        p2.appendChild(div2);
    }
	
    function fire(el) {
        if (el.className == 'd' || el.className == 'm') return false;
        el.className = el.className == 's' ? 'd' : 'm';
        if (document.querySelectorAll('#p2 .s').length === 0) {
            alert('You have won!'); 
            return false;
        }
        if (el.className == 'm') return true;
    }

    function backfire() {
        for (let i=w*h;i>0;i--) {
            var targets = document.querySelectorAll('#p1 .s, #p1 .w');
            if (targets.length === 0 || fire(targets[Math.floor(Math.random() * targets.length)])) break;
        }
        if (document.querySelectorAll('#p1 .s').length === 0) alert('You have lost!');
    }
	QUnit.module('backfire', function(){
		QUnit.test('one element', function(assert){
			var el = {'className':'d'};
			el.className = 'd';
			assert.equal(backfire(), undefined);
		})
	})
	
})(10, 10);



