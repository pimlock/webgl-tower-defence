dojo.provide("uj.fais.Tower");

dojo.require("uj.fais");

uj.fais.Tower = function(_cost, _range, _power) {
    this.putOnGameBoard = function(gameBoard, position) {
        this.gameBoard = gameBoard;
        this.position = position;
    };

    this.getPosition = function() {
        if (typeof this.position == 'undefined') {
            return null;
        }
        return this.position;
    };

    this.hitMonster = function() {
        var monster = this.gameBoard.getClosestMonster(this.position, this.range);
        if (monster !== null) {
            monster.wasHit(this.power);
        }
    };

    this.setCost = function(_cost) {
        if (typeof _cost !== 'undefined') {
            this.cost = _cost;
        }
    };

    this.setRange = function(_range) {
        if (typeof _range !== 'undefined') {
            this.range = _range;
        }
    };

    this.setPower = function(_power) {
        if (typeof _power !== 'undefined') {
            this.power = _power;
        }
    };

    this.getCost = function() {
        return this.cost;
    };

    this.getRange = function() {
        return this.range;
    };

    this.getPower = function() {
        return this.power;
    };

    this.toString = function() {
        return "Tower{id:" + this.towerId + ", pos:" + this.position + "}";
    };

    // constructor
    this.towerId = uj.fais.Tower.towerId++;

    this.cost = uj.fais.Tower.defaults['cost'];
    this.range = uj.fais.Tower.defaults['range'];
    this.power = uj.fais.Tower.defaults['power'];

    this.setCost(_cost);
    this.setRange(_range);
    this.setPower(_power);
};

uj.fais.Tower.towerId = 1;
uj.fais.Tower.defaults = {
    cost: 10,
    range: 10,
    power: 10
};
