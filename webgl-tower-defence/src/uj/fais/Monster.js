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

    var calculatePosition = function() {
        var x = Math.round(monsterObject.getLocX() / boundingVolume.dims[0]);
        var y = Math.round(monsterObject.getLocY() / boundingVolume.dims[1]);
        
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

        calculatePosition();
        scale();

        _gameScene.addChild(monsterObject);
    };

    this.removeFromGameBoard = function(_gameScene) {
        _gameScene.removeChild(monsterObject);
    };

    this.move = function(_vector) {
        monsterObject.setLocX(monsterObject.getLocX() + _vector[0] * dt);
        monsterObject.setLocY(monsterObject.getLocY() + _vector[1] * dt);
        monsterObject.setLocZ(monsterObject.getLocZ() + _vector[2] * dt);
        //console.info(dojo.toJson(monsterObject.getPosition()));
        calculatePosition();
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