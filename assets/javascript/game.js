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

  set myHealthPoints(hp) {
    this.healthPoints = hp;
  }

  set myBaseAttackPower(power) {
    this.baseAttackPower = power;
  }

  get myCounterAttackPower() {
    return this.counterAttackPower;
  }

  set myCounterAttackPower(power) {
    this.counterAttackPower = power;
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
      this.healthPoints -= defenderCounterAttackPower;
      return this.healthPoints;
    } else {
      return this.healthPoints;
    }
  }

  updateDefenderHP(attackCount, yourCharPower) {
    if (attackCount > 0) {
      this.healthPoints -= yourCharPower;
      return this.healthPoints;
    } else {
      return this.healthPoints;
    }
  }
}

const initCharState = {
  obiWan: {
    hp: 120,
    baseAttackPower: 8,
    counterAttackPower: 15
  },
  luke: {
    hp: 100,
    baseAttackPower: 6,
    counterAttackPower: 12
  },
  maul: {
    hp: 180,
    baseAttackPower: 10,
    counterAttackPower: 25
  },
  sidious: {
    hp: 150,
    baseAttackPower: 4,
    counterAttackPower: 10
  },
};



$('document').ready(function () {
  const htmlEl = {
    yourCharHolder: $('#your-character .character-holder'),
    enemiesHolder: $('#enemies .character-holder'),
    defenderHolder: $('#defender .character-holder')
  };

  const imgPath = './assets/images/';

  const gameSW = {
    gameState: null,

    charactersArray: null,

    characters: {
      obiWan: new Character('obiWan', 'Obi-Wan Kenobi', initCharState.obiWan.hp, initCharState.obiWan.baseAttackPower, initCharState.obiWan.counterAttackPower, `${imgPath}obi-wan.jpg`),
      luke: new Character('luke', 'Luke Skywalker', initCharState.luke.hp, initCharState.luke.baseAttackPower, initCharState.luke.counterAttackPower, `${imgPath}luke-skywalker.jpg`),
      maul: new Character('maul', 'Darth Maul', initCharState.maul.hp, initCharState.maul.baseAttackPower, initCharState.maul.counterAttackPower, `${imgPath}darth-maul.jpg`),
      sidious: new Character('sidious', 'Darth Sidious', initCharState.sidious.hp, initCharState.sidious.baseAttackPower, initCharState.sidious.counterAttackPower, `${imgPath}darth-sidious.jpg`)
    },

    createCharactersArray: function () {
      let charArr = [];
      for (const charProperty in this.characters) {
        charArr.push(this.characters[charProperty]);
      }
      this.charactersArray = charArr;
    },

    createCharPanels: function () {
      let content = '';
      this.charactersArray.forEach(function (char, index) {
        content += `<div id=${char.myId} class="character-panel">
      <p>${char.myName}</p>
      <img src="${char.myImage}" alt="${char.myName}">
      <p class="hp-points">${char.myHealthPoints}</p>
      </div>`;
      });
      htmlEl.yourCharHolder.html(content);
    },

    findCharInstance: function (id) {
      return this.charactersArray.find(function (char) {
        return char.returnSelf(id) !== undefined;
      });
    },

    showRestartBtn: function () {
      $('#restart').show();
    },

    gameStateFactory: function () {
      return {
        enemiesChosen: false,
        defenderChosen: false,
        gameOver: false,
        yourCharId: '',
        defenderId: '',
        attackCounter: 0,
        gameReset: false
      }
    },

    resetGame: function () {
      this.createCharactersArray();
      this.resetCharState();
      this.gameState = this.gameStateFactory();
      this.createCharPanels();
      this.resetHtml();
    },

    resetCharState: function () {
      this.characters.obiWan.myHealthPoints = initCharState.obiWan.hp;
      this.characters.obiWan.myBaseAttackPower = initCharState.obiWan.baseAttackPower;
      this.characters.obiWan.myCounterAttackPower = initCharState.obiWan.counterAttackPower;
      this.characters.luke.myHealthPoints = initCharState.luke.hp;
      this.characters.luke.myBaseAttackPower = initCharState.luke.baseAttackPower;
      this.characters.luke.myCounterAttackPower = initCharState.luke.counterAttackPower;
      this.characters.maul.myHealthPoints = initCharState.maul.hp;
      this.characters.maul.myBaseAttackPower = initCharState.maul.baseAttackPower;
      this.characters.maul.myCounterAttackPower = initCharState.maul.counterAttackPower;
      this.characters.sidious.myHealthPoints = initCharState.sidious.hp;
      this.characters.sidious.myBaseAttackPower = initCharState.sidious.baseAttackPower;
      this.characters.sidious.myCounterAttackPower = initCharState.sidious.counterAttackPower;
    },

    resetHtml: function () {
      $('#enemies .character-holder').empty();
      $('#defender .character-holder').empty();
      $('#messages .message').empty();
      $('#restart').hide();
    }
  };

  if (!gameSW.gameState){
    gameSW.resetGame();
  }

  $(document).on('click', '#your-character .character-panel', function(){
    if (gameSW.gameState.enemiesChosen) {
      return;
    }

    gameSW.gameState.enemiesChosen = true;
    const clickedPanel = $(this);
    gameSW.gameState.yourCharId = clickedPanel.attr('id');

    $('#your-character .character-panel').each(function (index) {
      if (gameSW.gameState.yourCharId !== $(this).attr('id')) {
        $(this).remove();
        htmlEl.enemiesHolder.append($(this))
      }
    });
  });



  $(document).on('click', '#enemies .character-panel', function(){
    if (gameSW.gameState.defenderChosen) {
      return;
    }

    gameSW.gameState.defenderChosen = true;
    $('#messages .message').empty();

    const clickedPanel = $(this);
    gameSW.gameState.defenderId = clickedPanel.attr('id');
    clickedPanel.remove();
    htmlEl.defenderHolder.append(clickedPanel);
  });



  $('#attack').on('click', function() {
    if (gameSW.gameState.gameOver) {
      return;
    }
    
    if (!gameSW.gameState.defenderChosen) {
      $('#messages .message').text('No defender has been chosen!');
      return;
    }

    gameSW.gameState.attackCounter += 1;

    const defender = gameSW.findCharInstance(gameSW.gameState.defenderId);
    const yourChar = gameSW.findCharInstance(gameSW.gameState.yourCharId);
    const yourCharPower = yourChar.updateAttackPower(gameSW.gameState.attackCounter);
    const defenderHP = defender.updateDefenderHP(gameSW.gameState.attackCounter, yourCharPower);
    const yourCharHP = yourChar.updateYourCharHP(gameSW.gameState.attackCounter, defender.myCounterAttackPower);

    $(`#your-character #${gameSW.gameState.yourCharId} .hp-points`).text(`${yourCharHP}`);
    $(`#defender #${gameSW.gameState.defenderId} .hp-points`).text(`${defenderHP}`);

    if (defenderHP > 0 && yourCharHP > 0) {
      $('#messages .message').text(`You attacked ${defender.myName} for ${yourCharPower} damage.
        ${defender.myName} attacked you back for ${defender.myCounterAttackPower} damage.`);
    } else if (defenderHP > 0 && yourCharHP <= 0) { // When your character LOSES. == Game Over
      gameSW.gameState.gameOver = true;
      $('#messages .message').text('You have been defeated...GAME OVER!!!');
      gameSW.showRestartBtn();
    } else if (defenderHP <= 0 && yourCharHP > 0) { // When your character WINS.
      $('#defender .character-panel').remove();
      gameSW.gameState.defenderChosen = false;

      if ($('#enemies .character-panel').length > 0) {  // And when there are still enemies (enemy) left in Enemies section
        $('#messages .message').text(`You have defeated ${defender.myName}, you can choose to fight another enemy.`);
      } else {  // And when there is NO enemy left in Enemies section  == Game Over
        gameSW.gameState.gameOver = true;
        $('#messages .message').text('You Won!!!! GAME OVER!!!');
        gameSW.showRestartBtn();
      }
    } else {
      gameSW.gameState.gameOver = true;
      $('#messages .message').text('It\'s a tie!'); // When the game is a tie. == Game Over
      gameSW.showRestartBtn();
    }
  });



  $(document).on('click', '#restart', function(){
    gameSW.gameState.gameReset = true;
    gameSW.resetGame();
  });

});


