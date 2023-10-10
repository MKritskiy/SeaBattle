export function updateFieldVisuals(field){
    let map = {0:'sea', 1:'ship', 2:'miss', 3:'shot'};
    for (let i = 0; i < 10; i++){
      for (let j = 0; j < 10; j++){
        document.getElementById(i + '' + j).className = 'grid-item ' + map[field[i][j]];
      }
    }
  }

/*проверка возможности установить корабль размера size в точку на поле field 
с координатами (x;y). isHor является истиной, если корабль установлен горизонтально.
возвращает true, если корабль можно установить, или false, если корабль нельзя установить*/
export function canPlaceShip(field, x, y, isHor, size){
}

/*export function placeShip(field, x, y, isHor, size){
  if(!canPlaceShip(field, x, y, isHor, size)){
    return false;
  }
  for(let i = 0; i < size; i++){
    if(isHor){
      field[x+i][y] = 1;
    }
    else{
      field[x][y+i] = 1;
    }
  }
  return true;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export function generateEnemyField(){
  let result = false;
  let field = [];
  for (let i = 0; i < 10; i++){
    let line = [];
    for (let j = 0; j < 10; j++){
      line.push(0);
    }
    field.push(line);
  }

  while(!result){
    let isHor = Math.random() > 0.5;
    let x = getRandomInt(10);
    let y = getRandomInt(10);
    result = placeShip(field, x, y, isHor, 4)
  }
  result = false;

  while(!result){
    let isHor = Math.random() > 0.5;
    let x = getRandomInt(10);
    let y = getRandomInt(10);
    result = placeShip(field, x, y, isHor,3)
  }
  result = false;

  while(!result){
    let isHor = Math.random() > 0.5;
    let x = getRandomInt(10);
    let y = getRandomInt(10);
    result = placeShip(field, x, y, isHor, 3)
  }
  result = false;

  for(let i = 0; i < 3; i++){
    while(!result){
      let isHor = Math.random() > 0.5;
      let x = getRandomInt(10);
      let y = getRandomInt(10);
      result = placeShip(field, x, y, isHor, 2)
    }
    result = false;
  }

  for(let i = 0; i < 4; i++){
    while(!result){
      let isHor = Math.random() > 0.5;

      let x = getRandomInt(10);
      let y = getRandomInt(10);
      result = placeShip(field, x, y, isHor, 1)
    }
    result = false;
  }
  return field;
}*/