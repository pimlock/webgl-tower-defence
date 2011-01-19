dojo.provide('uj.fais.KeyboardAdapter');

dojo.require('uj.fais.CameraAdapter');

/**
 * To jest klasa do obs�ugi sterowania klawiatur� (widok itp.)
 */
uj.fais.KeyboardAdapter = function() {
    var keyInput = new GLGE.KeyInput();

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
        if (keyInput.isKeyPressed(GLGE.KI_Q)) {
            _cameraAdapter.rotateLeft();
        }
        if (keyInput.isKeyPressed(GLGE.KI_E)) {
            _cameraAdapter.rotateRight();
        }
        if (keyInput.isKeyPressed(GLGE.KI_Z)) {
            _cameraAdapter.rotateUp();
        }
        if (keyInput.isKeyPressed(GLGE.KI_X)) {
            _cameraAdapter.rotateDown();
        }
        _cameraAdapter.handleCameraMove();
    };
};