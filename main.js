const arenas = document.querySelector(".arenas");
const button = document.querySelector(".control .button");
const $formFight = document.querySelector('.control');

const HIT = {
  head: 30,
  body: 25,
  foot: 20
};

const ATACK = ['head', 'body', 'foot'];

const player1 = {
  player: 1,
  name: "Scorpion",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
  weapon: ["hammer", "fork"],
  attack: function () {
    console.log(this.name + " Fight")
  },
  changeHP,
  elHP,
  renderHP
};

const player2 = {
  player: 2,
  name: "Kitana",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/kitana.gif",
  weapon: ["hammer", "fork"],
  attack: function () {
    console.log(this.name + " Fight")
  },
  changeHP: changeHP,
  elHP: elHP,
  renderHP: renderHP
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

function getRandom (value) {
  return Math.ceil(Math.random() * value);
};

function changeHP (value) {
  this.hp -= value;

  if (this.hp <= 0) {
    this.hp = 0;
  }
};

function elHP () {
  const playerLife = document.querySelector(".player" + this.player + " .life");
  return playerLife;
};

function renderHP  () {
  this.elHP().style.width = this.hp + "%";
};

function playerWins (name) {
  const loseTitle = createElement("div", "loseTitle");
  if (name) {
    loseTitle.innerText = name + ' wins';
  } else {
    loseTitle.innerText = 'draw';
  }
  return loseTitle;
};

function createReloadButton () {
  const $reloadWrap = createElement ('div', 'reloadWrap');
  const $reloadButton = createElement ('button', 'button');
  $reloadButton.innerText = 'Restart';

  $reloadButton.addEventListener('click', function () {
    window.location.reload();
  });

  $reloadWrap.appendChild($reloadButton);
  arenas.appendChild($reloadWrap);
};

arenas.appendChild(createPlayer(player1));
arenas.appendChild(createPlayer(player2));

function enemyAtack () {
  const hit = ATACK[getRandom(3) - 1];
  const defence = ATACK[getRandom(3) - 1];

  return {
    value: getRandom(HIT[hit]),
    hit,
    defence
  };
};

function myAtack () {
  const atack = {};
  for (let item of $formFight) {
    if (item.checked && item.name === 'hit') {
      atack.value = getRandom(HIT[item.value]);
      atack.hit = item.value;
    }

    if (item.checked && item.name === 'defence') {
      atack.defence = item.value;
    }

    item.checked = false;
  }
  return atack;
};

function compareAttacks (player1Atack, player2Atack) {
  if (player1Atack.hit !== player2Atack.defence) {
    player2.changeHP(player1Atack.value);
    player2.renderHP();
  }
  if (player2Atack.hit !== player1Atack.defence) {
    player1.changeHP(player2Atack.value);
    player1.renderHP();
  }
};

function compareHP () {
  if (player1.hp === 0 || player2.hp === 0) {
    button.disabled = true;
    createReloadButton();
  }

  if (player1.hp === 0 && player1.hp < player2.hp) {
    arenas.appendChild(playerWins(player2.name));
  } else if (player2.hp === 0 && player2.hp < player1.hp) {
    arenas.appendChild(playerWins(player1.name));
  } else if (player1.hp === 0 && player2.hp === 0) {
    arenas.appendChild(playerWins());
  }
};

$formFight.addEventListener('submit', function (event) {
  event.preventDefault();
  
  compareAttacks(myAtack(), enemyAtack());
  compareHP();
});