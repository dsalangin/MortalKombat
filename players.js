import { createElement, getRandom } from './utils.js';
import { generateLogs } from './logs.js';
import { createReloadButton, playerWins } from './resaltGame.js';

const $formFight = document.querySelector('.control');
const button = document.querySelector(".control .button");
const arenas = document.querySelector(".arenas");

export const player1 = {
  player: 1,
  name: "Scorpion",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
  weapon: ["hammer", "fork"],
  attack: function () {
    console.log(`${this.name} Fight`)
  },
  changeHP,
  elHP,
  renderHP
};

export const player2 = {
  player: 2,
  name: "Kitana",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/kitana.gif",
  weapon: ["hammer", "fork"],
  attack: function () {
    console.log(`${this.name} Fight`)
  },
  changeHP,
  elHP,
  renderHP
};

export const createPlayer =  (player) => {

  const $player = createElement("div", `player${player.player}`);
  const progressbar = createElement("div", "progressbar");
  const character = createElement("div", "character");
  const life = createElement("div", "life");
  const name = createElement("div", "name");
  const img = createElement("img");

  life.style.width = `${player.hp}%`;
  name.innerText = player.name;
  img.src = player.img;
  
  $player.appendChild(progressbar);
  $player.appendChild(character);
  
  progressbar.appendChild(life);
  progressbar.appendChild(name);

  character.appendChild(img);   

  return $player;
};

function changeHP (value) {
  this.hp -= value;

  if (this.hp <= 0) {
    this.hp = 0;
  }
};

function elHP () {
  const playerLife = document.querySelector(`.player${this.player} .life`);
  return playerLife;
};

function renderHP  () {
  this.elHP().style.width = `${this.hp}%`;
};

const HIT = {
  head: 30,
  body: 25,
  foot: 20
};

const ATACK = ['head', 'body', 'foot'];

export const enemyAtack = () => {
  const hit = ATACK[getRandom(3) - 1];
  const defence = ATACK[getRandom(3) - 1];

  return {
    value: getRandom(HIT[hit]),
    hit,
    defence
  };
};

export const playerAtack = () => {
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

export const compareAttacks = (hit, defence, hitValue, attackingPlayer, defendingPlayer ) => {
  if (hit !== defence) {
    defendingPlayer.changeHP(hitValue);
    defendingPlayer.renderHP();
    generateLogs('hit', attackingPlayer, defendingPlayer, hitValue);
  } else {
    generateLogs('defence', defendingPlayer, attackingPlayer);
  }
};

export const compareHP = () => {
  if (player1.hp === 0 || player2.hp === 0) {
    button.disabled = true;
    createReloadButton();
  }

  if (player1.hp === 0 && player1.hp < player2.hp) {
    arenas.appendChild(playerWins(player2.name));
    generateLogs('end', player2, player1);
  } else if (player2.hp === 0 && player2.hp < player1.hp) {
    arenas.appendChild(playerWins(player1.name));
    generateLogs('end', player1, player2);
  } else if (player1.hp === 0 && player2.hp === 0) {
    arenas.appendChild(playerWins());
    generateLogs('draw', player1, player2);
  }
};