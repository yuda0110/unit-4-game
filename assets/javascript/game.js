class Character {
  constructor(name, healthPoints, attackPower, counterAttackPower, image) {
    this.name = name;
    this.healthPoints = healthPoints;
    this.attackPower = attackPower;
    this.counterAttackPower = counterAttackPower;
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