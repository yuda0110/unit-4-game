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
  enemiesHolder: $('#enemies .character-holder'),
  defenderHolder: $('#defender .character-holder')
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
  let defenderChosen = false;

  const yourCharPanels = $('#your-character .character-panel');

  yourCharPanels.on('click', function() {
    if (enemyChosen) {
      return;
    }

    enemyChosen = true;
    const clickedPanel = $(this);
    const clickedPanelId = clickedPanel.attr('id');
    console.log('clickedPanel: ' + clickedPanelId);
    yourCharPanels.each(function (index) {
      console.log('id: ' + $(this).attr('id'));
      if (clickedPanelId !== $(this).attr('id')) {
        $(this).remove();
        htmlEl.enemiesHolder.append($(this))
      }
    });
  });

  $(document).on("click", "#enemies .character-panel", function(){
    console.log($('#enemies .character-panel'));
    if (defenderChosen) {
      return;
    }

    defenderChosen = true;
    const clickedPanel = $(this);
    console.log('enemy clickedPanel: ' + clickedPanel.attr('id'));
    clickedPanel.remove();
    htmlEl.defenderHolder.append(clickedPanel);
  });

});




