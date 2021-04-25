<<<<<<< Updated upstream
const arenas = document.querySelector(".arenas");
const button = document.querySelector(".control .button");
const $formFight = document.querySelector('.control');
const $chat = document.querySelector('.chat');

const HIT = {
  head: 30,
  body: 25,
  foot: 20
};

const ATACK = ['head', 'body', 'foot'];

const logs = {
  start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
  end: [
      'Результат удара [playerWins]: [playerLose] - труп',
      '[playerLose] погиб от удара бойца [playerWins]',
      'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
  ],
  hit: [
      '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
      '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
      '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
      '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
      '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
      '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
      '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
      '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
      '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
      '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
      '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
      '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
      '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
      '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
      '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
      '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
      '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
      '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
  ],
  defence: [
      '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
      '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
      '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
      '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
      '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
      '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
      '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
      '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
  ],
  draw: 'Ничья - это тоже победа!'
};

const player1 = {
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

const player2 = {
  player: 2,
  name: "Kitana",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/kitana.gif",
  weapon: ["hammer", "fork"],
  attack: function () {
    console.log(`${this.name} Fight`)
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
  const playerLife = document.querySelector(`.player${this.player} .life`);
  return playerLife;
};

function renderHP  () {
  this.elHP().style.width = `${this.hp}%`;
};

function playerWins (name) {
  const loseTitle = createElement("div", "loseTitle");
  if (name) {
    loseTitle.innerText = `${name} wins`;
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
generateLogs('start', player1, player2);

function enemyAtack () {
  const hit = ATACK[getRandom(3) - 1];
  const defence = ATACK[getRandom(3) - 1];

  return {
    value: getRandom(HIT[hit]),
    hit,
    defence
  };
};

function playerAtack () {
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

function compareAttacks (hit, defence, hitValue, attackingPlayer, defendingPlayer ) {
  if (hit !== defence) {
    defendingPlayer.changeHP(hitValue);
    defendingPlayer.renderHP();
    generateLogs('hit', attackingPlayer, defendingPlayer, hitValue);
  } else {
    generateLogs('defence', defendingPlayer, attackingPlayer);
  }
};

function compareHP () {
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

function getTime () {
  const date = new Date();
  const hours = date.getHours();
  let minutes = date.getMinutes();
  if (String(minutes).length === 1) {
    minutes = `0${minutes}`;
  }
  return (`${hours}:${minutes}`);
};

function timeForLogs () {
  return getTime() + ' - ';
}

function getLogs (type) {
  if (typeof logs[type] === 'object') {
    return logs[type][getRandom(logs[type].length) - 1];
  } else {
    return logs[type];
  }
};

function renderLogs (log) {
  const el = `<p>${log}<p>`;
  $chat.insertAdjacentHTML('afterbegin', el);
};

function generateLogs (type, player1, player2, hitValue) {

  switch (type) {
    case 'start':
      let startText = getLogs(type)
      startText = startText.replace('[time]', getTime()).replace('[player1]', player1.name).replace('[player2]', player2.name);
      renderLogs (startText);
      break;
    case 'end':
      let  endText = timeForLogs() + getLogs(type);
      endText = endText.replace('[playerWins]', player1.name).replace('[playerLose]', player2.name);
      renderLogs (endText);
      break;
    case 'hit':
      let hitText = timeForLogs() + getLogs(type);
      hitText = hitText.replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name);
      if (hitValue) {
        hitText = hitText + `[-${hitValue}] [${player2.hp}/100]`;
      }
      renderLogs (hitText);
      break;
    case 'defence':
      let defenceText = timeForLogs() + getLogs(type);
      defenceText = defenceText.replace('[playerDefence]', player1.name).replace('[playerKick]', player2.name);
      renderLogs (defenceText);
      break;
    case 'draw':
      const drawText = timeForLogs() + getLogs(type);
      renderLogs (drawText);
      break;
    default:
      renderLogs('Что-то пошло не так');
      break;
  }
};

$formFight.addEventListener('submit', function (event) {
  event.preventDefault();
  const player = playerAtack();
  const enemy = enemyAtack();
  compareAttacks(player.hit, enemy.defence, player.value, player1, player2);
  compareAttacks(enemy.hit, player.defence, enemy.value, player2, player1);
  compareHP();
});
=======
import Game from './game.js';

const game = new Game;
game.start();
>>>>>>> Stashed changes
