const arenas = document.querySelector(".arenas");
const button = document.querySelector(".button");

const player1 = {
  player: 1,
  name: "Scorpion",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
  weapon: ["hammer", "fork"],
  attack: function () {
    console.log(player1.name + " Fight")
  }
};

const player2 = {
  player: 2,
  name: "Kitana",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/kitana.gif",
  weapon: ["hammer", "fork"],
  attack: function () {
    console.log(player2.name + " Fight")
  }
};

function createElement (tag, className) {
  const $tag = document.createElement(tag);
  if (className) {
    $tag.classList.add(className);
  }
  return $tag;
};

const createPlayer = function (player) {

  const $player = createElement("div", "player" + player.player);
  const progressbar = createElement("div", "progressbar");
  const character = createElement("div", "character");
  const life = createElement("div", "life");
  const name = createElement("div", "name");
  const img = createElement("img");

  life.style.width = player.hp + "%";
  name.innerText = player.name;
  img.src = player.img;
  
  $player.appendChild(progressbar);
  $player.appendChild(character);
  
  progressbar.appendChild(life);
  progressbar.appendChild(name);

  character.appendChild(img);   

  return $player;
};

function changeHp (player) {
  const playerLife = document.querySelector(".player" + player.player + " .life");
  player.hp -= Math.ceil(Math.random() * 20);

  if (player.hp <= 0) {
    player.hp = 0;
    button.disabled = true;

    player.player === 1 ? arenas.appendChild(playerWin(player2.name)) : arenas.appendChild(playerWin(player1.name));
  }

  playerLife.style.width = player.hp + "%";
};

function playerWin (name) {
  const loseTitle = createElement("div", "loseTitle");
  loseTitle.innerText = name + ' win';

  return loseTitle;
};

button.addEventListener("click", function () {
  changeHp (player1);
  changeHp (player2);
});

arenas.appendChild(createPlayer(player1));
arenas.appendChild(createPlayer(player2));
