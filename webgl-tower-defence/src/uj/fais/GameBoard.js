dojo.provide("uj.fais.GameBoard");

uj.fais.GameBoard = function() {
    var towers = [];

    this.addTower = function(tower, position) {
        towers.push(tower);
        tower.putOnGameBoard(this, position);
    };

    this.removeTower = function(tower) {
        for (var i = 0; i < towers.length; ++i) {
            if (towers[i] == tower) {
                delete towers[i];
            }
        }
    };

    this.getTowersCount = function() {
        return towers.length;
    };

    this.getAllTowers = function() {
        return towers;
    };

    this.isTowerAtPosition = function(position) {
        return this.getTowerAtPosition(position) !== false;
    };

    this.getTowerAtPosition = function(position) {
        for (var i = 0; i < towers.length; ++i) {
            if (towers[i].getPosition() == position) {
                return towers[i];
            }
        }
        return false;
    };
};