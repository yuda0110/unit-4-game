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

  updateYourCharHP(attackCount, defenderCounterAttackPower) {
    if (attackCount > 0) {
      console.log('this.counterAttackPower:' + defenderCounterAttackPower);
      console.log('this.healthPoints1:' + this.healthPoints);

      this.healthPoints -= defenderCounterAttackPower;

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
const obiWan = new Character('obiWan', 'Obi-Wan Kenobi', 120, 8, 15, `${imgPath}obi-wan.jpg`);
const luke = new Character('luke', 'Luke Skywalker', 100, 6, 12, `${imgPath}luke-skywalker.jpg`);
const maul = new Character('maul', 'Darth Maul', 180, 10, 25, `${imgPath}darth-maul.jpg`);
const sidious = new Character('sidious', 'Darth Sidious', 150, 4, 10, `${imgPath}darth-sidious.jpg`);
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

function showRestartBtn() {
  $('#restart').show();
}



$('document').ready(function() {
  createCharPanels();

  function gameStateFactory() {
    return {
      enemiesChosen: false,
      defenderChosen: false,
      gameOver: false,
      yourCharId: '',
      defenderId: '',
      attackCounter: 0
    }
  }

  let gameState = gameStateFactory();

  const yourCharPanels = $('#your-character .character-panel');


  yourCharPanels.on('click', function() {
    if (gameState.enemiesChosen) {
      return;
    }

    gameState.enemiesChosen = true;
    const clickedPanel = $(this);
    gameState.yourCharId = clickedPanel.attr('id');
    console.log('clickedPanel: ' + gameState.yourCharId);

    yourCharPanels.each(function (index) {
      console.log('id: ' + $(this).attr('id'));
      if (gameState.yourCharId !== $(this).attr('id')) {
        $(this).remove();
        htmlEl.enemiesHolder.append($(this))
      }
    });
  });



  $(document).on('click', '#enemies .character-panel', function(){
    if (gameState.defenderChosen) {
      return;
    }

    gameState.defenderChosen = true;
    console.log('gameState.defenderChosen: ' + gameState.defenderChosen);
    $('#messages .message').empty();

    const clickedPanel = $(this);
    gameState.defenderId = clickedPanel.attr('id');
    console.log('enemy clickedPanel: ' + clickedPanel.attr('id'));
    clickedPanel.remove();
    htmlEl.defenderHolder.append(clickedPanel);
  });



  $('#attack').on('click', function() {
    if (gameState.gameOver) {
      return;
    }
    
    if (!gameState.defenderChosen) {
      $('#messages .message').text('No defender has been chosen!');
      return;
    }

    console.log('defenderID: ' + gameState.defenderId);
    console.log('yourCharID: ' + gameState.yourCharId);
    gameState.attackCounter += 1;
    console.log('attackCount: ' + gameState.attackCounter);

    const defender = findCharInstance(gameState.defenderId);
    const yourChar = findCharInstance(gameState.yourCharId);
    const yourCharPower = yourChar.updateAttackPower(gameState.attackCounter);
    const defenderHP = defender.updateDefenderHP(gameState.attackCounter, yourCharPower);
    const yourCharHP = yourChar.updateYourCharHP(gameState.attackCounter, defender.myCounterAttackPower);

    $(`#your-character #${gameState.yourCharId} .hp-points`).text(`${yourCharHP}`);
    $(`#defender #${gameState.defenderId} .hp-points`).text(`${defenderHP}`);

    if (defenderHP > 0 && yourCharHP > 0) {
      $('#messages .message').text(`You attacked ${defender.myName} for ${yourCharPower} damage.
        ${defender.myName} attacked you back for ${defender.myCounterAttackPower} damage.`);
    } else if (defenderHP > 0 && yourCharHP <= 0) { // When your character LOSES. == Game Over
      gameState.gameOver = true;
      $('#messages .message').text('You have been defeated...GAME OVER!!!');
      showRestartBtn();
    } else if (defenderHP <= 0 && yourCharHP > 0) { // When your character WINS.
      $('#defender .character-panel').remove();
      gameState.defenderChosen = false;

      if ($('#enemies .character-panel').length > 0) {  // And when there are still enemies (enemy) left in Enemies section
        $('#messages .message').text(`You have defeated ${defender.myName}, you can choose to fight another enemy.`);
      } else {  // And when there is NO enemy left in Enemies section  == Game Over
        gameState.gameOver = true;
        $('#messages .message').text('You Won!!!! GAME OVER!!!');
        showRestartBtn();
      }
    } else {
      gameState.gameOver = true;
      $('#messages .message').text('It\'s a tie!'); // When the game is a tie. == Game Over
      showRestartBtn();
    }
  });



  $(document).on('click', '#restart', function(){
    console.log('restart clicked!');
  });

});


