dojo.provide('uj.fais.SceneObjectPicker');

uj.fais.SceneObjectPicker = function(_highlight, _gameScene, _objectToInsert) {
    var lastObject = null;
    var pickedObject = null;
    var gameScene = _gameScene;
    var highlight = _highlight;
    var objectToInsert = _objectToInsert;
    var id = 10;
    var _this = this;
    
    this.highlight = function (position) {
        if (position && position.x && position.y) {
			pickedObject = gameScene.pick(position.x,position.y).object;
			if (pickedObject &&  pickedObject != lastObject) {

                pickedObject.oldmaterial = pickedObject.getMaterial();
                pickedObject.setMaterial(highlight);

                if(lastObject) {
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
            var copy = new GLGE.Object(id++);
            //copy.setId(copy.getId() + id++);
            //var mm = new GLGE.MultiMaterial(objectToInsert, material);

            //copy.addMultiMaterial(mm);
            copy.setMesh(objectToInsert);
            copy.setMaterial(material);

            copy.setLoc(pickedObject.getLocX(), pickedObject.getLocY(), pickedObject.getLocZ() + 4);
            copy.setScale(1, 1, 1);
            console.info(pickedObject.getLocX() + ' ' + pickedObject.getLocY(), + ' ' + pickedObject.getLocZ());
            console.info(copy.getId());

            gameScene.addChild(copy);
        }
    };

    this.canInsert = function (_object) {
        if (_object.getId().indexOf('crate') > -1)
            return true;
        return false;
    };
};
