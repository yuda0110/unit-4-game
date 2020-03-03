class Character {
  constructor(id, name, healthPoints, attackPower, counterAttackPower, image) {
    this.id = id;
    this.name = name;
    this.healthPoints = parseInt(healthPoints);
    this.attackPower = parseInt(attackPower);
    this.counterAttackPower = parseInt(counterAttackPower);
    this.image = image;
  }

  get myId() {
    return this.id;
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

  returnSelf(id) {
    if (this.id === id) {
      return this
    }
  }
}

const htmlEl = {
  yourCharHolder: $('#your-character .character-holder'),
  enemiesHolder: $('#enemies .character-holder'),
  defenderHolder: $('#defender .character-holder')
};

const imgPath = './assets/images/';
const obiWan = new Character('obiWan', 'Obi-Wan Kenobi', 120, 8, 25, `${imgPath}obi-wan.jpg`);
const luke = new Character('luke', 'Luke Skywalker', 100, 6, 25, `${imgPath}luke-skywalker.jpg`);
const maul = new Character('maul', 'Darth Maul', 180, 10, 25, `${imgPath}darth-maul.jpg`);
const sidious = new Character('sidious', 'Darth Sidious', 150, 4, 25, `${imgPath}darth-sidious.jpg`);
const charactersArray = [obiWan, luke, maul, sidious];

function createCharPanels() {
  let content = '';
  charactersArray.forEach(function (char, index) {
    content += `<div id=${char.myId} class="character-panel">
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
  let yourCharId = '';
  let defenderId = '';

  const yourCharPanels = $('#your-character .character-panel');

  yourCharPanels.on('click', function() {
    if (enemyChosen) {
      return;
    }

    enemyChosen = true;
    const clickedPanel = $(this);
    yourCharId = clickedPanel.attr('id');
    console.log('clickedPanel: ' + yourCharId);
    yourCharPanels.each(function (index) {
      console.log('id: ' + $(this).attr('id'));
      if (yourCharId !== $(this).attr('id')) {
        $(this).remove();
        htmlEl.enemiesHolder.append($(this))
      }
    });
  });

  $(document).on('click', '#enemies .character-panel', function(){
    console.log($('#enemies .character-panel'));
    if (defenderChosen) {
      return;
    }

    defenderChosen = true;
    const clickedPanel = $(this);
    defenderId = clickedPanel.attr('id');
    console.log('enemy clickedPanel: ' + clickedPanel.attr('id'));
    clickedPanel.remove();
    htmlEl.defenderHolder.append(clickedPanel);
  });

  $('#attack').on('click', function() {
    if (!defenderChosen) {
      return;
    }

    console.log('defenderID: ' + defenderId);

    let defender = '';
    charactersArray.forEach(function(char) {
      let tmpDefender = char.returnSelf(defenderId);
      if (tmpDefender) {
        defender = tmpDefender;
      }
    });

    $('#points').html(`<p>You attacked ${defender.myName} for ? damage.<br>
        ${defender.myName} attacked you back for ? damage.</p>`);
  });

});




