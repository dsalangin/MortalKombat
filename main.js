const arenas = document.querySelector(".arenas");
const button = document.querySelector(".control .button");

const player1 = {
  player: 1,
  name: "Scorpion",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
  weapon: ["hammer", "fork"],
  attack: function () {
    console.log(this.name + " Fight")
  },
  changeHP: changeHP,
  elHP: elHP,
  renderHP: renderHP
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
  $reloadWrap.appendChild($reloadButton);
  return $reloadWrap;
};

function renderReloadButton () {
  arenas.appendChild(createReloadButton());
};

function getReloadPage () {
  renderReloadButton();
  const reloadButton = document.querySelector(".reloadWrap .button");
  reloadButton.addEventListener('click', function () {
    window.location.reload();
  });
}

button.addEventListener("click", function () {
  player1.changeHP(getRandom(20));
  player1.renderHP();

  player2.changeHP(getRandom(20));
  player2.renderHP();

  if (player1.hp === 0 || player2.hp === 0) {
    button.disabled = true;
    getReloadPage();
  }

  if (player1.hp === 0 && player1.hp < player2.hp) {
    arenas.appendChild(playerWins(player2.name));
  } else if (player2.hp === 0 && player2.hp < player1.hp) {
    arenas.appendChild(playerWins(player1.name));
  } else if (player1.hp === 0 && player2.hp === 0) {
    arenas.appendChild(playerWins());
  }
});

arenas.appendChild(createPlayer(player1));
arenas.appendChild(createPlayer(player2));
