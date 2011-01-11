dojo.provide('uj.fais.KeyboardAdapter');

dojo.require('uj.fais.CameraAdapter');

/**
 * To jest klasa do obs³ugi sterowania klawiatur¹ (widok itp.)
 */
uj.fais.KeyboardAdapter = function() {
    var keyInput=new GLGE.KeyInput();

    this.handleInput = function(_cameraAdapter) {
        _cameraAdapter.prepare();
        if (keyInput.isKeyPressed(GLGE.KI_W)) {
            _cameraAdapter.moveForward();
        }
        if (keyInput.isKeyPressed(GLGE.KI_S)) {
            _cameraAdapter.moveBackward();
        }
	    if (keyInput.isKeyPressed(GLGE.KI_A)) {
            _cameraAdapter.moveLeft();
        }
	    if (keyInput.isKeyPressed(GLGE.KI_D)) {
            _cameraAdapter.moveRight();
        }
        _cameraAdapter.handleCameraMove();
    };
};