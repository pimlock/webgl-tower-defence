dojo.provide('uj.fais.MonsterBuilder');

dojo.require('uj.fais.Monster');

uj.fais.MonsterBuilder = function(_doc) {
    var monstersDefinitions = new Array();
    var doc = _doc;
    var _this = this;

    var add = function(_name, _definition) {
        monstersDefinitions[_name] = _definition;
        return _this;
    };

    var createMonster = function(_name) {
        var def = monstersDefinitions[_name];
        if (def) {
            return def.createMonster();
        }
        return null;
    };

    this.createSimpleMonster = function() {
        var name = 'simple';
        var monster = createMonster(name);

        if (monster) {
            return monster;
        } else {
            add(name, new uj.fais.SimpleMonsterDefinition(100, 100, doc.getElement('cube2'), doc.getElement('monsterMaterial')));
            return _this.createSimpleMonster();
        }
    };
};

uj.fais.MonsterDefinition = function(_name, _hitPoints, _value, _mesh, _material) {
    var mesh = _mesh;
    var name = _name;
    var material = _material;
    var hitPoints = _hitPoints;
    var value = _value;
    var id = 0;

    this.createMonster = function() {
        console.info('bazowa');
        return new uj.fais.Monster(mesh, material, (name + id++).toString(), hitPoints, value);
    };

    this.present = function() {
        console.info(mesh);
        console.info(material);
        console.info(hitPoints);
        console.info(name);
    };
};

uj.fais.SimpleMonsterDefinition = function(_hitPoints, _value, _mesh, _material) {
    uj.fais.MonsterDefinition.call(this, 'simpleMonster', _hitPoints, _value, _mesh, _material);

    // TODO czemu to jest źle
    //this.createMonster = function() {
    //    console.info('pochodna');
    //    return uj.fais.SimpleMonsterDefinition.prototype.createMonster();
    //};
};

uj.fais.SimpleMonsterDefinition.prototype = new uj.fais.MonsterDefinition();
