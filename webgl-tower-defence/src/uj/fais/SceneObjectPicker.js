dojo.provide('uj.fais.SceneObjectPicker');

uj.fais.SceneObjectPicker = function(_highlight) {
    var lastObject = null;

    var highlight = _highlight;
    
    this.highlight = function (position) {
        if (position && position.x && position.y) {
			var pickedObject = gameScene.pick(position.x,position.y).object;
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
};
