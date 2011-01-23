dojo.provide("uj.fais.Tower");

dojo.require("uj.fais");
dojo.require('uj.fais.Audio');

uj.fais.Tower = function(_towerMesh, _towerMaterial, _cost, _range, _power) {
    this.position = new uj.fais.Position(0, 0);
    
    var towerObject = null, boundingVolume = null;
    var _this = this;

    var calculatePosition = function() {
        var x = Math.floor(towerObject.getLocX() / boundingVolume.dims[0]);
        var y = Math.floor(towerObject.getLocY() / boundingVolume.dims[1]);

        _this.position = new uj.fais.Position(x, y);
    };

    this.putOnGameBoard = function(_position, _gameBoard) {
        this.gameBoard = _gameBoard;
        this.position = _position;

        var _gameScene = this.gameBoard.getGameScene();

        towerObject.setLocX(_position.getX() * 2);
        towerObject.setLocY(_position.getY() * 2);
        towerObject.setLocZ(uj.fais.Config['object.loc.z']);

        calculatePosition();

        _gameScene.addChild(towerObject);
    };

    this.removeFromGameBoard = function(_gameScene) {
        _gameScene.removeChild(towerObject);
    };

    this.getPosition = function() {
        if (typeof this.position == 'undefined') {
            return null;
        }
        return this.position;
    };

    // tutaj jakiś algorytm wybierający potworka, w którego będziemy strzelać
    // może np. strzelać do najsłabszego, albo do tego, który jest najdalej, itp.
    var getBestMonsterToHit = function(monstersInRange) {
        if (monstersInRange.length > 0) {
            return monstersInRange[0];
        }
        return null;
    };

    this.hitMonster = function() {
        var monstersInRange = this.gameBoard.getMonstersInRange(this.position, this.range);
        var monster = getBestMonsterToHit(monstersInRange);
        if (monster !== null) {
            uj.fais.Audio.playSound('swf');
            monster.wasHit(this.power);
        }    
    };

    this.setCost = function(_cost) {
        if (typeof _cost !== 'undefined') {
            this.cost = _cost;
        }
    };

    this.setRange = function(_range) {
        if (typeof _range !== 'undefined') {
            this.range = _range;
        }
    };

    this.setPower = function(_power) {
        if (typeof _power !== 'undefined') {
            this.power = _power;
        }
    };

    this.getCost = function() {
        return this.cost;
    };

    this.getRange = function() {
        return this.range;
    };

    this.getPower = function() {
        return this.power;
    };

    this.toString = function() {
        return "Tower{id:" + this.towerId + ", pos:" + this.position + "}";
    };

    // constructor
    this.towerId = uj.fais.Tower.towerId++;

    this.cost = uj.fais.Tower.defaults['cost'];
    this.range = uj.fais.Tower.defaults['range'];
    this.power = uj.fais.Tower.defaults['power'];

    this.setCost(_cost);
    this.setRange(_range);
    this.setPower(_power);

    var init = function(_towerMesh, _towerMaterial, _id) {
        towerObject = new GLGE.Object();
        towerObject.setId(_id);
        towerObject.setMesh(_towerMesh);
        towerObject.setMaterial(_towerMaterial);
        //towerObject.setScale(0.03);

        boundingVolume = towerObject.getBoundingVolume();
    };

    init(_towerMesh, _towerMaterial, 'tower' + this.towerId);
};

uj.fais.Tower.towerId = 1;
uj.fais.Tower.defaults = {
    cost: 10,
    range: 10,
    power: 10
};
