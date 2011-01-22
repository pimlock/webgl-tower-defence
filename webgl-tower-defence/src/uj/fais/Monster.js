dojo.provide('uj.fais.Monster');

dojo.require('uj.fais');

uj.fais.Monster = function(_monsterMesh, _monsterMaterial, _id, _health, _value) {
    this.health = _health;
    this.position = new uj.fais.Position(0, 0);
    this.gameBoard = null;
    this.value = _value;

    var _this = this;

    var monsterObject = null, boundingVolume = null;
    var dt = uj.fais.Config['monster.deltaTime'];
    var maxHealth = uj.fais.Config['monster.maxHealth'];

    var init = function(_monsterMesh, _monsterMaterial, _id) {
        monsterObject = new GLGE.Object();
        monsterObject.setId(_id);
        monsterObject.setMesh(_monsterMesh);
        monsterObject.setMaterial(_monsterMaterial);

        boundingVolume = monsterObject.getBoundingVolume();
    };

    init(_monsterMesh, _monsterMaterial, _id);

    var calculatePosition = function(vector) {
        var dx, dy;
        var x = _this.position.getX();
        var y = _this.position.getY();
        dx = monsterObject.getLocX() / boundingVolume.dims[0] - x;
        dy = monsterObject.getLocY() / boundingVolume.dims[1] - y;

        if (dx > 1) {
            x++
        } else if (dx < -1) {
            x--;
        }

        if (dy > 1) {
            y++
        } else if (dy < -1) {
            y--;
        }

        _this.position = new uj.fais.Position(x, y);
    };

    var scale = function() {
        var scale = _this.health / maxHealth;
        if (scale < 0.1) {
            scale = 0.1;
        }
        monsterObject.setScale(scale);
    };

    this.putOnGameBoard = function(_position, _gameBoard) {
        this.gameBoard = _gameBoard;
        var _gameScene = this.gameBoard.getGameScene();

        monsterObject.setLocX(_position.getX() * 2);
        monsterObject.setLocY(_position.getY() * 2);
        monsterObject.setLocZ(uj.fais.Config['object.loc.z']);

        _this.position = _position;
        scale();

        _gameScene.addChild(monsterObject);
    };

    this.removeFromGameBoard = function(_gameScene) {
        _gameScene.removeChild(monsterObject);
    };

    this.move = function(_vector) {
        //console.info(dojo.toJson(_vector));
        monsterObject.setLocX(monsterObject.getLocX() + _vector[0] * dt);
        monsterObject.setLocY(monsterObject.getLocY() + _vector[1] * dt);
        monsterObject.setLocZ(monsterObject.getLocZ() + _vector[2] * dt);

        calculatePosition(_vector);
        //console.info(this.position.toString());

        //console.info(this.position.toString());
    };

    this.getPosition = function() {
        return _this.position;
    };

    this.wasHit = function(power) {
        this.health -= power;
        /* zostało to przniesione do Wave.removeKilledMonsters()
            tu można dodać np zmniejsznie się potworka? póki nie będzie lepszej animacji
        */
        if (this.health <= 0) {
            uj.fais.Mediator.getInstance().monsterDead(this);
        } else {
            scale();
        }
    };
};