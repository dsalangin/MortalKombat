import { getTime, getRandom } from './utils.js';
import { LOGS } from './constants.js';

const $chat = document.querySelector('.chat');

const timeForLogs = () => getTime() + ' - ';

const getLogs = (type) => {
  if (typeof LOGS[type] === 'object') {
    return LOGS[type][getRandom(LOGS[type].length) - 1];
  } else {
    return LOGS[type];
  }
};

const renderLogs = (log) => {
  const el = `<p>${log}<p>`;
  $chat.insertAdjacentHTML('afterbegin', el);
};

export const generateLogs = (type, player1, player2, hitValue) => {

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