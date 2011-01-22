dojo.provide("uj.fais.GameBoard");

uj.fais.GameBoard = function(_gameScene) {
    var towers = [];
    var monsters = [];
    var gameScene = _gameScene;

    this.addTower = function(tower, position) {
        towers.push(tower);
        tower.putOnGameBoard(position, this);
    };

    this.removeTower = function(tower) {
        for (var i = 0; i < towers.length; ++i) {
            if (towers[i] == tower) {
                tower.removeFromGameBoard(gameScene);
                towers.splice(i, 1);
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
                monster.removeFromGameBoard(gameScene);
                monsters.splice(i, 1);
            }
        }
    };

    this.getAllMonsters = function() {
        return monsters;
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
            if (monster != null && this.isInRange(position, monster.getPosition(), range)) {
                monstersInRange.push(monster);
            }
        }
        return monstersInRange;
    };

    this.getGameScene = function() {
        return gameScene;
    };

    this.towerShot = function() {
        for (var i = 0; i < towers.length; ++i) {
            if (towers[i] != null) {
                towers[i].hitMonster();
            }
        }
    };

    this.reset = function() {
        for (var i = 0; i < towers.length; ++i) {
            if (towers[i] != null) {
                towers[i].removeFromGameBoard(gameScene);
            }
        }
        towers = [];
    };

    uj.fais.Mediator.getInstance().set('gameBoard', this);
};