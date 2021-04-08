const gamer = {
  name: "Scorpion",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
  weapon: ["hammer", "fork"],
  attack: function () {
    console.log(gamer.name + " Fight")
  }
};

const createPlayer = function (playersNumber, gamer) {
  const arenas = document.querySelector(".arenas");

  const player1 = document.createElement("div");
  player1.classList.add(playersNumber);

  const progressbar =  document.createElement("div");
  progressbar.classList.add("progressbar");

  const character = document.createElement("div");
  character.classList.add("character");

  const life = document.createElement("div");
  life.classList.add("life");
  life.style.width = gamer.hp;

  const name = document.createElement("div");
  name.classList.add("name");
  name.innerText = gamer.name;

  const img = document.createElement("img");
  img.src = gamer.img;

  arenas.appendChild(player1);

  player1.appendChild(progressbar);
  player1.appendChild(character);
  
  progressbar.appendChild(life);
  progressbar.appendChild(name);

  character.appendChild(img);   

};
createPlayer("player1", gamer);
createPlayer("player2", gamer);