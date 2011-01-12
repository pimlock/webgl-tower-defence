dojo.provide('uj.fais.CameraAdapter');

uj.fais.CameraAdapter = function(_gameScene) {
    var camera, xVector, yVector, trans, gameScene;

    var _this = this;

    this.prepare = function () {
        var mat=camera.getRotMatrix();
        trans=GLGE.mulMat4Vec4(mat,[0,0,-1,1]);
        var mag=Math.pow(Math.pow(trans[0],2)+Math.pow(trans[1],2),0.5);
        trans[0]=trans[0]/mag;
        trans[1]=trans[1]/mag;
        xVector = 0;
        yVector = 0;
    };

    var init = function(_gameScene) {
        gameScene = _gameScene;
        camera = gameScene.getCamera();

        _this.prepare();
    };

    init(_gameScene);

    this.handleCameraMove = function() {
        var cameraPosition = camera.getPosition();
        if(xVector!=0 || yVector!=0){
            var origin=[cameraPosition.x,cameraPosition.y,cameraPosition.z];

            var dist2=gameScene.ray(origin,[-xVector,0,0]);
            var dist3=gameScene.ray(origin,[0,-yVector,0]);
            if (dist2.distance<5)
                xVector=0;
            if (dist3.distance<5)
                yVector=0;
            if (xVector!=0 || yVector!=0) {
                camera.setLocY(cameraPosition.y+yVector*0.05);
                camera.setLocX(cameraPosition.x+xVector*0.05);
            }
	    }
    };

    this.rotateLeft = function() {
        var cameraRotation = camera.getRotation();
        camera.setRotY(cameraRotation.y+0.01);
    };

    this.rotateRight = function() {
        var cameraRotation = camera.getRotation();
        camera.setRotY(cameraRotation.y-0.01);
    };

    this.rotateUp = function() {
        var cameraRotation = camera.getRotation();
        camera.setRotX(cameraRotation.x-0.01);
    };

    this.rotateDown = function() {
        var cameraRotation = camera.getRotation();
        camera.setRotX(cameraRotation.x+0.01);
    };

    this.moveForward = function() {
        yVector=yVector+parseFloat(trans[1]);
        xVector=xVector+parseFloat(trans[0]);
    };

    this.moveBackward = function() {
        yVector=yVector-parseFloat(trans[1]);
        xVector=xVector-parseFloat(trans[0]);
    };

    this.moveLeft = function() {
        yVector=yVector+parseFloat(trans[0]);
        xVector=xVector-parseFloat(trans[1]);
    };

    this.moveRight = function() {
        yVector=yVector-parseFloat(trans[0]);
        xVector=xVector+parseFloat(trans[1]);
    };
};