import { generateLogs } from './logs.js';
import { player1, player2, playerAtack, enemyAtack, compareAttacks, compareHP } from './players.js';

export default class Game {
  start = () => {
    player1.createPlayer();
    player2.createPlayer();

    generateLogs('start', player1, player2);

    const $formFight = document.querySelector('.control');

    $formFight.addEventListener('submit', function (event) {
      event.preventDefault();
      const {hit: playerHit, defence: playerDefence, value: playerHitValue} = playerAtack();
      const {hit: enemyHit, defence: enemyDefence, value: enemyHitValue} = enemyAtack();
      compareAttacks(playerHit, enemyDefence, playerHitValue, player1, player2);
      compareAttacks(enemyHit, playerDefence, enemyHitValue, player2, player1);
      compareHP();
    });
  }

};