dojo.provide('uj.fais.Wave');

uj.fais.Wave = function(_path, _gameBoard) {
    var path = _path;
    var gameBoard = _gameBoard;
    var monsters = [];
    var monstersOnMove = [];

    // TODO as function parameter
    var delay = 1000;
    
    var nextMonster = 0;
    var isWaveStarted = false;
    var lastTime;

    var putMonsterOnTrack = function() {
        var now = parseInt(new Date().getTime());
        if (nextMonster < monsters.length && now - lastTime > delay) {
            var monster = monsters[nextMonster++];
            monstersOnMove.push(monster);

            monster.putOnGameBoard(path.getFirstPosition(), gameBoard);

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
                // TODO hit player life :)
                var scene = gameBoard.getGameScene();
                monster.removeFromGameBoard(scene);
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
            console.info('wave ended');
        }
    };

    var removeKilledMonsters = function() {
        // TODO implement
    };
    
    this.start = function() {
        isWaveStarted = true;
        lastTime = parseInt(new Date().getTime());
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
    };

    this.addMonster = function(_monster) {
        monsters.push(_monster);
    };
};