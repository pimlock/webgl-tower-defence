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

    var init = function(_monsterMesh, _monsterMaterial, _id) {
        monsterObject = new GLGE.Object();
        monsterObject.setId(_id);
        monsterObject.setMesh(_monsterMesh);
        monsterObject.setMaterial(_monsterMaterial);

        boundingVolume = monsterObject.getBoundingVolume();
    };

    init(_monsterMesh, _monsterMaterial, _id);

    var calculatePosition = function() {
        var x = Math.floor(monsterObject.getLocX() / boundingVolume.dims[0]);
        var y = Math.floor(monsterObject.getLocY() / boundingVolume.dims[1]);
        
        _this.position = new uj.fais.Position(x, y); 
    };
    
    this.putOnGameBoard = function(_position, _gameBoard) {
        this.gameBoard = _gameBoard;
        var _gameScene = this.gameBoard.getGameScene();

        monsterObject.setLocX(_position.getX() * 2);
        monsterObject.setLocY(_position.getY() * 2);
        monsterObject.setLocZ(uj.fais.Config['object.loc.z']);

        calculatePosition();

        _gameScene.addChild(monsterObject);
    };

    this.removeFromGameBoard = function(_gameScene) {
        _gameScene.removeChild(monsterObject);
    };

    this.move = function(_vector) {
        monsterObject.setLocX(monsterObject.getLocX() + _vector[0] * dt);
        monsterObject.setLocY(monsterObject.getLocY() + _vector[1] * dt);
        monsterObject.setLocZ(monsterObject.getLocZ() + _vector[2] * dt);

        calculatePosition();

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
        }
    };
};