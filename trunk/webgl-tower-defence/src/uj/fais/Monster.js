dojo.provide('uj.fais.Monster');

dojo.require('uj.fais');

uj.fais.Monster = function(_monsterMesh, _monsterMaterial) {
    this.health = 0;
    this.position = new uj.fais.Position(0, 0);
    var monsterObject = null;
    var dt = 0.1;

    var init = function(_monsterMesh, _monsterMaterial) {
        var material = new GLGE.Material("mm1");
        material.setColor('#0000ff');

        monsterObject = new GLGE.Object("m1");
        monsterObject.setMesh(_monsterMesh);
        monsterObject.setMaterial(material);
    };

    init(_monsterMesh, null);

    this.putOnGameBoard = function(_pos, _gameScene) {
        monsterObject.setLocX(_pos[0]);
        monsterObject.setLocY(_pos[1]);
        monsterObject.setLocZ(_pos[2]);

        _gameScene.addChild(monsterObject);
    };

    this.move = function(_vector) {
        monsterObject.setLocX(monsterObject.getLocX() + _vector[0] * dt);
        monsterObject.setLocY(monsterObject.getLocY() + _vector[1] * dt);
        monsterObject.setLocZ(monsterObject.getLocZ() + _vector[2] * dt);
    };

    this.wasHit = function(power) {
        this.health -= power;
        if (this.health <= 0) {
            this.mediator.monsterDead(this);
        }
    };
};