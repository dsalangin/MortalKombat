import { generateLogs } from './logs.js';
import { Player, playerAtack, compareAttacks, compareHP } from './players.js';
import { getRandom } from './utils.js';

export default class Game {
  getPlayers = async () => {
    const body = fetch('https://reactmarathon-api.herokuapp.com/api/mk/players').then(res => res.json());
    return body;
  };

  getRandomPlayer = async () => {
    const body = fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/choose').then(res => res.json());
    return body;
  };

  getAtack = async () => {
    const body = fetch('http://reactmarathon-api.herokuapp.com/api/mk/player/fight',{
      method: 'POST',
      body: JSON.stringify(playerAtack())
    }).then(res => res.json());
    return body;
  };

  start = async () => {
    const players = await this.getPlayers();
    let p1 = players[getRandom(players.length - 1)];
    let p2 = players[getRandom(players.length - 1)];

    let player1 = new Player ({
      ...p1,
      player: 1,
      rootSelector: 'arenas'
    });

    let player2 = new Player ({
      ...p2,
      player: 2,
      rootSelector: 'arenas'
    });


    player1.createPlayer();
    player2.createPlayer();

    generateLogs('start', player1, player2);

    const $formFight = document.querySelector('.control');

    $formFight.addEventListener('submit', async (event) => {
      event.preventDefault();

      const {player1: {hit: playerHit, defence: playerDefence, value: playerHitValue}} = await this.getAtack(); //playerAtack();
      const {player2: {hit: enemyHit, defence: enemyDefence, value: enemyHitValue}} = await this.getAtack();  //enemyAtack();
      compareAttacks(playerHit, enemyDefence, playerHitValue, player1, player2);
      compareAttacks(enemyHit, playerDefence, enemyHitValue, player2, player1);
      compareHP(player1, player2);
    });
  };

};