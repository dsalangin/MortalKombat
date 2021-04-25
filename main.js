import { player1, player2, createPlayer, playerAtack, enemyAtack, compareAttacks, compareHP } from './players.js';
import { generateLogs } from './logs.js';

const arenas = document.querySelector(".arenas");
const $formFight = document.querySelector('.control');

arenas.appendChild(createPlayer(player1));
arenas.appendChild(createPlayer(player2));
generateLogs('start', player1, player2);

$formFight.addEventListener('submit', function (event) {
  event.preventDefault();
  const {hit: playerHit, defence: playerDefence, value: playerHitValue} = playerAtack();
  const {hit: enemyHit, defence: enemyDefence, value: enemyHitValue} = enemyAtack();
  compareAttacks(playerHit, enemyDefence, playerHitValue, player1, player2);
  compareAttacks(enemyHit, playerDefence, enemyHitValue, player2, player1);
  compareHP();
});