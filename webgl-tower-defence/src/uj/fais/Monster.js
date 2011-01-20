dojo.provide('uj.fais.Monster');

dojo.require('uj.fais');

uj.fais.Monster = function(_monsterMesh, _monsterMaterial) {
    this.health = 0;
    this.position = new uj.fais.Position(0, 0);
    var _this = this;

    var monsterObject = null;
    var dt = uj.fais.Config['monster.deltaTime'];

    var init = function(_monsterMesh, _monsterMaterial) {
        var material = new GLGE.Material("mm1");
        material.setColor('#0000ff');

        monsterObject = new GLGE.Object("m1");
        monsterObject.setMesh(_monsterMesh);
        monsterObject.setMaterial(material);
    };

    init(_monsterMesh, _monsterMaterial);

    var calculatePosition = function() {
        var x = Math.floor(monsterObject.getLocX() / monsterObject.getBoundingVolume().dims[0]);
        var y = Math.floor(monsterObject.getLocY() / monsterObject.getBoundingVolume().dims[1]);
        _this.position = new uj.fais.Position(x, y); 
    };
    
    this.putOnGameBoard = function(_pos, _gameScene) {
        monsterObject.setLocX(_pos[0]);
        monsterObject.setLocY(_pos[1]);
        monsterObject.setLocZ(_pos[2]);

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

        console.info(this.position.toString());
    };

    this.wasHit = function(power) {
        this.health -= power;
        if (this.health <= 0) {
            this.mediator.monsterDead(this);
        }
    };
};