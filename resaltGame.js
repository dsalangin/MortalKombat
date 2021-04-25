import { createElement } from './utils.js';

const arenas = document.querySelector(".arenas");

export const playerWins = (name) => {
  const loseTitle = createElement("div", "loseTitle");
  if (name) {
    loseTitle.innerText = `${name} wins`;
  } else {
    loseTitle.innerText = 'draw';
  }
  return loseTitle;
};

export const createReloadButton = () => {
  const $reloadWrap = createElement ('div', 'reloadWrap');
  const $reloadButton = createElement ('button', 'button');
  $reloadButton.innerText = 'Restart';

  $reloadButton.addEventListener('click', function () {
    window.location.reload();
  });

  $reloadWrap.appendChild($reloadButton);
  arenas.appendChild($reloadWrap);
};