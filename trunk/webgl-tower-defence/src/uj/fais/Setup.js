dojo.provide("uj.fais.Setup");

uj.fais.Setup = function(canvasId) {
    /* private member declaration */
    var doc, gameRenderer, gameScene, cameraPosition;

    /* private methods */
    var render = function() {
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

        cameraPosition = gameScene.camera.getPosition();

        setInterval(render,1);
    };
};