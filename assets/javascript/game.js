class Character {
  constructor(name, healthPoints, attackPower, counterAttackPower, image) {
    this.name = name;
    this.healthPoints = parseInt(healthPoints);
    this.attackPower = parseInt(attackPower);
    this.counterAttackPower = parseInt(counterAttackPower);
    this.image = image;
  }

  get myName() {
    return this.name;
  }

  get myHealthPoints() {
    return this.healthPoints;
  }

  get myAttackPower() {
    return this.attackPower;
  }

  get myCounterAttackPower() {
    return this.counterAttackPower;
  }

  get myImage() {
    return this.image;
  }
}

const htmlEl = {
  yourCharHolder: $('#your-character .character-holder'),
  enemiesHolder: $('#enemies .character-holder')
};

const imgPath = './assets/images/';
const obiWan = new Character('Obi-Wan Kenobi', 120, 8, 25, `${imgPath}obi-wan.jpg`);
const luke = new Character('Luke Skywalker', 100, 6, 25, `${imgPath}luke-skywalker.jpg`);
const maul = new Character('Darth Maul', 180, 10, 25, `${imgPath}darth-maul.jpg`);
const sidious = new Character('Darth Sidious', 150, 4, 25, `${imgPath}darth-sidious.jpg`);
const charactersArray = [obiWan, luke, maul, sidious];

function createCharPanels() {
  let content = '';
  charactersArray.forEach(function (char, index) {
    content += `<div id="char${index + 1}" class="character-panel">
      <p>${char.myName}</p>
      <img src="${char.myImage}" alt="${char.myName}">
      <p>${char.myHealthPoints}</p>
      </div>`;
  });
  htmlEl.yourCharHolder.html(content);
}

$('document').ready(function() {
  createCharPanels();

  let enemyChosen = false;

  const charPanelEl = {
    yourCharPanel: $('#your-character .character-panel')
  };

  console.log(htmlEl.yourCharHolder)
  console.log(charPanelEl.yourCharPanel)

  charPanelEl.yourCharPanel.on('click', function() {
    if (enemyChosen) {
      return;
    }

    enemyChosen = true;
    const clickedPanel = $(this);
    console.log('clickedPanel' + clickedPanel);
    clickedPanel.remove();
    htmlEl.enemiesHolder.append(clickedPanel);
  })
})




