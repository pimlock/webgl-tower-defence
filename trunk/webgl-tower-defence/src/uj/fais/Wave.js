dojo.provide('uj.fais.Wave');

dojo.require('uj.fais');

uj.fais.Wave = function(_path, _gameBoard, _delay) {
    var path = _path;
    var gameBoard = _gameBoard;
    var monsters = [];
    var monstersOnMove = [];
    var delay = _delay;
    var nextMonster = 0;
    var isWaveStarted = false;
    var lastTime;

    var mediator = uj.fais.Mediator.getInstance();

    var putMonsterOnTrack = function() {
        var now = parseInt(new Date().getTime());
        if (nextMonster < monsters.length && now - lastTime > delay) {
            var monster = monsters[nextMonster++];
            monstersOnMove.push(monster);

            gameBoard.addMonster(monster, path.getFirstPosition());

            lastTime = now;
        }
    };

    var moveMonsters = function() {
        for (var i = 0; i < monstersOnMove.length; i++) {
            var monster = monstersOnMove[i];
            var v = path.getMonsterMoveVector(monster);
            monster.move(v);
        }
    };

    var removeEscapingMonster = function() {
        var indexes = [];
        for (var i = 0; i < monstersOnMove.length; i++) {
            var monster = monstersOnMove[i];

            if (path.isMonsterAtEnd(monster)) {
                mediator.monsterEscaped();

                gameBoard.removeMonster(monster);
                indexes.push(i);
            }
        }

        for (var j = 0; j < indexes.length; j++) {
            var i = indexes[j];
            monstersOnMove.splice(i, 1);
        }

        delete indexes;
    };

    var handleWaveEnd = function() {
        if (nextMonster >= monsters.length && monstersOnMove.length == 0) {
            isWaveStarted = false;
        }
    };

    var removeKilledMonsters = function() {
        var indexes = [];
        for (var i = 0; i < monstersOnMove.length; i++) {
            var monster = monstersOnMove[i];

            if (monster.health <= 0) {
                mediator.monsterDead(monster);

                gameBoard.removeMonster(monster);
                indexes.push(i);
            }
        }

        for (var j = 0; j < indexes.length; j++) {
            var i = indexes[j];
            monstersOnMove.splice(i, 1);
        }

        delete indexes;
    };
    
    this.start = function() {
        isWaveStarted = true;
        lastTime = parseInt(new Date().getTime());

        return isWaveStarted;
    };

    this.handleWave = function() {
        if (isWaveStarted) {
        // put monsters on track
            putMonsterOnTrack();
        // move monsters
            moveMonsters();
        // remove killed monsters
            removeKilledMonsters();
        // remove monsters at the end of path
            removeEscapingMonster();
        // handle wave end
            handleWaveEnd();
        }
        return isWaveStarted;
    };

    this.addMonster = function(_monster) {
        monsters.push(_monster);
    };

    this.reset = function() {
        nextMonster = 0;
        isWaveStarted = false;

        var scene = gameBoard.getGameScene();
        for (var i = 0; i < monstersOnMove.length; i++) {
            var monster = monstersOnMove[i];
            monster.removeFromGameBoard(scene);
        }
        monstersOnMove = [];
    };
};