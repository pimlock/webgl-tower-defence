dojo.provide("uj.fais.Setup");

dojo.require('uj.fais.KeyboardAdapter');
dojo.require('uj.fais.CameraAdapter');

uj.fais.Setup = function(canvasId) {
    /* private member declaration */
    var doc, gameRenderer, gameScene, cameraPosition, cameraAdapter, keyboardAdapter;

    /* private methods */
    var render = function() {
        keyboardAdapter.handleInput(cameraAdapter);
        gameRenderer.render();
    };

    var init = function(canvasId) {
        gameRenderer = new GLGE.Renderer(document.getElementById(canvasId));

        doc = new GLGE.Document();
        doc.load('src/uj/fais/board.xml');
    };

    init(canvasId);

    doc.onLoad = function(canvasId) {
        gameScene = doc.getElement('mainscene');
        
        gameRenderer.setScene(gameScene);

        cameraAdapter = new uj.fais.CameraAdapter(gameScene);
        keyboardAdapter = new uj.fais.KeyboardAdapter();

        cameraPosition = gameScene.camera.getPosition();

        setInterval(render,1);
    };
};