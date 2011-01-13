dojo.provide('uj.fais.Monster');

dojo.require('uj.fais');

uj.fais.Monster = function() {
    this.health = 0;
    this.position = new uj.fais.Position(0, 0);

    this.putOnGameBoard = function() {
        this.gameBoard    
    };

    this.wasHit = function(power) {
        this.health -= power;
        if (this.health <= 0) {
            this.mediator.monsterDead(this);
        }
    };
};