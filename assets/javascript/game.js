class Character {
  constructor(id, name, healthPoints, baseAttackPower, counterAttackPower, image) {
    this.id = id;
    this.name = name;
    this.healthPoints = parseInt(healthPoints);
    this.baseAttackPower = parseInt(baseAttackPower);
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

  get myCounterAttackPower() {
    return this.counterAttackPower;
  }

  get myImage() {
    return this.image;
  }

  returnSelf(id) {
    if (this.id === id) {
      return this;
    }
  }

  updateAttackPower(attackCount) {
    return this.baseAttackPower * attackCount;
  }

  updateYourCharHP(attackCount) {
    if (attackCount > 0) {
      console.log('this.counterAttackPower:' + this.counterAttackPower);
      console.log('this.healthPoints1:' + this.healthPoints);

      this.healthPoints -= this.counterAttackPower;

      console.log('this.healthPoints2:' + this.healthPoints);

      return this.healthPoints;
    } else {
      return this.healthPoints;
    }
  }

  updateDefenderHP(attackCount, yourCharPower) {
    if (attackCount > 0) {
      console.log('yourCharPower:' + yourCharPower);
      console.log('defender healthPoints1:' + this.healthPoints);

      this.healthPoints -= yourCharPower;

      console.log('defender healthPoints2:' + this.healthPoints);

      return this.healthPoints;
    } else {
      return this.healthPoints;
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
      <p class="hp-points">${char.myHealthPoints}</p>
      </div>`;
  });
  htmlEl.yourCharHolder.html(content);
}

function findCharInstance(id) {
  console.log('id: ' + id);

  return charactersArray.find(function(char) {
    return char.returnSelf(id) !== undefined;
  });
}

$('document').ready(function() {

  createCharPanels();

  let enemiesChosen = false;
  let defenderChosen = false;
  let gameOver = false;
  let yourCharId = '';
  let defenderId = '';
  let attackCounter = 0;

  const yourCharPanels = $('#your-character .character-panel');

  yourCharPanels.on('click', function() {
    if (enemiesChosen) {
      return;
    }

    enemiesChosen = true;
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
    if (!defenderChosen || gameOver) {
      return;
    }

    console.log('defenderID: ' + defenderId);
    console.log('yourCharID: ' + yourCharId);
    attackCounter += 1;
    console.log('attackCount: ' + attackCounter);

    const defender = findCharInstance(defenderId);
    const yourChar = findCharInstance(yourCharId);
    const yourCharPower = yourChar.updateAttackPower(attackCounter);
    const defenderHP = defender.updateDefenderHP(attackCounter, yourCharPower);
    const yourCharHP = yourChar.updateYourCharHP(attackCounter);

    $(`#your-character #${yourCharId} .hp-points`).text(`${yourCharHP}`);
    $(`#defender #${defenderId} .hp-points`).text(`${defenderHP}`);

    if (defenderHP > 0 && yourCharHP > 0) {
      $('#points').html(`<p>You attacked ${defender.myName} for ${yourCharPower} damage.<br>
        ${defender.myName} attacked you back for ${defender.myCounterAttackPower} damage.</p>`);
    } else if (defenderHP > 0 && yourCharHP <0) { // When your Character LOSES.
      gameOver = true;
      $('#points').html(`<p>You have been defeated...GAME OVER!!!</p>`);
    } else if (defenderHP < 0 && yourCharHP > 0) { // When your Character WINS.
      defenderChosen = false;
      $('#points').html(`<p>You have defeated ${defender.myName}, you can choose to fight another enemy.</p>`);
      $('#defender .character-panel').remove();
    } else {
      $('#points').html('<p>It\'s a tie!</p>'); // When the game is a tie.
    }

  });

});




