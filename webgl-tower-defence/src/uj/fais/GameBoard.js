dojo.provide("uj.fais.GameBoard");

uj.fais.GameBoard = function(_gameScene) {
    var towers = [];
    var monsters = [];
    var gameScene = _gameScene;

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

    this.addMonster = function(monster, position) {
        monsters.push(monster);
        monster.putOnGameBoard(position, this);
    };

    this.removeMonster = function(monster) {
        for (var i = 0; i < monsters.length; ++i) {
            if (monsters[i] == monster) {
                delete monsters[i];
            }
        }
        monster.removeFromGameBoard(gameScene);
    };

    this.isInRange = function(startPosition, endPosition, range) {
        var diffX = startPosition.getX() - endPosition.getX();
        var diffY = startPosition.getY() - endPosition.getY();

        var distance = Math.pow(Math.abs(diffX), 2) + Math.pow(Math.abs(diffY), 2);

        return Math.sqrt(distance) <= range;
    };

    this.getMonstersInRange = function(position, range) {
        var monstersInRange = [];
        for (var i = 0; i < monsters.length; ++i) {
            var monster = monsters[i];
            if (this.isInRange(position, monster.getPosition(), range)) {
                monstersInRange.push(monster);
            }
        }
        return monstersInRange;
    };

    this.getGameScene = function() {
        return gameScene;
    };
};