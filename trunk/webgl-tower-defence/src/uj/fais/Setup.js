dojo.provide("uj.fais.Setup");

dojo.require('uj.fais.KeyboardAdapter');
dojo.require('uj.fais.CameraAdapter');
dojo.require('uj.fais.MouseAdapter');
dojo.require('uj.fais.SceneObjectPicker');

uj.fais.Setup = function(canvasId) {
    /* private member declaration */
    var doc, viewElement, gameRenderer, gameScene, cameraAdapter, keyboardAdapter, mouseAdapter, objectPicker;

    /* private methods */
    var gameLoop = function() {
        objectPicker.highlight(mouseAdapter.getMouseRelativePosition());

        keyboardAdapter.handleInput(cameraAdapter);
        gameRenderer.render();
    };

    var init = function(canvasId) {
        viewElement = document.getElementById(canvasId);
        gameRenderer = new GLGE.Renderer(viewElement);

        doc = new GLGE.Document();
        doc.load('src/uj/fais/board.xml');
    };

    init(canvasId);

    doc.onLoad = function(canvasId) {
        gameScene = doc.getElement('mainscene');
        
        gameRenderer.setScene(gameScene);

        cameraAdapter = new uj.fais.CameraAdapter(gameScene);
        keyboardAdapter = new uj.fais.KeyboardAdapter();
        mouseAdapter = new  uj.fais.MouseAdapter(gameScene);
        objectPicker = new uj.fais.SceneObjectPicker(doc.getElement("yellow"));

        viewElement.onmouseover = function(e) { mouseAdapter.setMouseActive(); };
        viewElement.onmouseout = function(e) { mouseAdapter.setMouseInActive(); };
        
        setInterval(gameLoop,1);
    };
};