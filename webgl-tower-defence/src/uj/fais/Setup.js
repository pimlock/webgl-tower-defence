dojo.provide('uj.fais.Setup');

dojo.require('uj.fais.KeyboardAdapter');
dojo.require('uj.fais.CameraAdapter');
dojo.require('uj.fais.MouseAdapter');
dojo.require('uj.fais.SceneObjectPicker');

dojo.require('uj.fais.Monster');
dojo.require('uj.fais.Path');

uj.fais.Setup = function(canvasId) {
    /* private member declaration */
    var doc, viewElement, gameRenderer, gameScene, cameraAdapter, keyboardAdapter, mouseAdapter, objectPicker;
    var monster1, path;
    var timer;
    var tic = 0;

    /* private methods */
    var gameLoop = function() {
        var mouseRelativePosition = mouseAdapter.getMouseRelativePosition();
        objectPicker.highlight(mouseRelativePosition);

        keyboardAdapter.handleInput(cameraAdapter);
        
        if (path.isMonsterAtEnd(monster1))
            monster1.removeFromGameBoard(gameScene);
        else {
            var v = path.getMonsterMoveVector(monster1);
            monster1.move(v);
        }

        gameRenderer.render();
    };

    var init = function(canvasId) {
        viewElement = document.getElementById(canvasId);
        gameRenderer = new GLGE.Renderer(viewElement);
        mouseAdapter = new uj.fais.MouseAdapter(viewElement, document.getElementById("plansza-wrapper"));

        doc = new GLGE.Document();
        doc.load('src/uj/fais/board.xml');
    };

    init(canvasId);

    doc.onLoad = function(canvasId) {
        gameScene = doc.getElement('mainscene');

        gameRenderer.setScene(gameScene);

        cameraAdapter = new uj.fais.CameraAdapter(gameScene);
        keyboardAdapter = new uj.fais.KeyboardAdapter();

        objectPicker = new uj.fais.SceneObjectPicker(doc.getElement("yellow"), gameScene, doc.getElement('cube2'));

        path = new uj.fais.Path(gameScene);
        
        monster1 = new uj.fais.Monster(doc.getElement('cube2'), null);
        monster1.putOnGameBoard([-10, -8, 2], gameScene);

        viewElement.onmouseover = function(e) {
            mouseAdapter.setMouseActive();
        };
        viewElement.onmouseout = function(e) {
            mouseAdapter.setMouseInActive();
        };
        viewElement.onmousedown = function (e) {
            objectPicker.insertObject();
        };
        gameLoop();
    };

    this.startGame = function() {
        timer = setInterval(gameLoop, 1);
    };

    this.pauseGame = function() {
        clearInterval(timer);
    };

    this.resetGame = function() {
        clearInterval(timer);
        
        doc = new GLGE.Document();
        doc.load('src/uj/fais/board.xml');
        monster1.putOnGameBoard([-10, -6, 2], gameScene);

        doc.onLoad();

        gameLoop();
    };
};