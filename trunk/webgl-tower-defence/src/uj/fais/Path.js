dojo.provide('uj.fais.Path');

dojo.require('uj.fais');

uj.fais.Path = function(_gameScene) {
    var elements = [];

    var isPathObject = function(_object) {
        return _object && _object.getId().indexOf('path') > -1;
    };

    var isMonsterOnElement = function(_element, _monster) {
        return _element.getPosition().equals(_monster.position);
    };

    var init = function(_gameScene) {
        for (var i = 0; i < _gameScene.getObjects().length; i++) {
            var obj =_gameScene.getObjects()[i];
            if (isPathObject(obj)) {
                elements.push(new uj.fais.PathElement(obj));
            }
        }
    };

    init(_gameScene);

    this.isMonsterAtEnd = function(_monster) {
        return isMonsterOnElement(elements[elements.length - 1], _monster);
    };

    this.getFirstPosition = function() {
        return elements[0].getPosition();
    };

    this.getMonsterMoveVector = function(_monster) {
        for (var i = 0; i < elements.length - 1; i++) {
            var element = elements[i];
            if (isMonsterOnElement(element, _monster)) {
                return [elements[i+1].getPosition().getX() - _monster.position.getX(), elements[i+1].getPosition().getY() - _monster.position.getY(), 0];
            }
        }
    };
};

uj.fais.PathElement = function(_object) {
    var visualObject = _object;
    var position;

    // to działa tylko jeśli układamy na całkowitych pozycjach obiekty o całkowitych wymiarach
    var init = function() {
        var x = Math.round(visualObject.getLocX() / visualObject.getBoundingVolume().dims[0]);
        var y = Math.round(visualObject.getLocY() / visualObject.getBoundingVolume().dims[1]);

        position = new uj.fais.Position(x, y);
    };

    init();

    this.getPosition = function() {
        return position;
    };

    this.getVisualPosition = function() {
        return visualObject.getPosition();
    };
};
