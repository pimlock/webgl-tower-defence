dojo.provide('uj.fais.SceneObjectPicker');

dojo.require('uj.fais.Tower');
dojo.require('uj.fais');

uj.fais.SceneObjectPicker = function(_highlight, _gameBoard, _objectToInsert) {
    var lastObject = null;
    var pickedObject = null;
    var gameScene = _gameBoard.getGameScene();
    var gameBoard = _gameBoard;
    var highlight = _highlight;
    var objectToInsert = _objectToInsert;
    var mediator = uj.fais.Mediator.getInstance();
    var _this = this;

    this.highlight = function (position) {
        if (position && position.x && position.y) {
            pickedObject = gameScene.pick(position.x, position.y).object;
            if (pickedObject && pickedObject != lastObject && _this.canSelect(pickedObject)) {

                pickedObject.oldmaterial = pickedObject.getMaterial();
                pickedObject.setMaterial(highlight);

                if (lastObject) {
                    lastObject.setMaterial(lastObject.oldmaterial);
                }
                lastObject = pickedObject;
            }
        }
    };

    this.insertObject = function() {
        if (pickedObject && _this.canInsert(pickedObject)) {

            var material = new GLGE.Material();
            material.setColor('#ff0000');
            
            var tower = new uj.fais.Tower(objectToInsert, material, 300, 2, 15);
            var player = mediator.get('player');
            if (player.getMoney() >= tower.getCost()) {
                mediator.towerBought(tower);
                gameBoard.addTower(tower, new uj.fais.Position(pickedObject.getLocX() / 2, pickedObject.getLocY() / 2));
            }

//            console.info(pickedObject.getLocX() + ' ' + pickedObject.getLocY(), + ' ' + pickedObject.getLocZ());
//            console.info(copy.getId());
//            console.info(pickedObject.getBoundingVolume());
        }
    };

    this.canInsert = function (_object) {
        if (_object.getId().indexOf('field') > -1)
            return true;
        return false;
    };

    this.canSelect = function (_object) {
        if (_object.getId() != 'wallobject')
            return true;
        return false;
    };
};
