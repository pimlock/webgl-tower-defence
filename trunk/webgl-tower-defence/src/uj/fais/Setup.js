dojo.provide('uj.fais.Setup');

dojo.require('uj.fais.GameBoard');
dojo.require('uj.fais.GameInfoPanel');
dojo.require('uj.fais.Player');

dojo.require('uj.fais.KeyboardAdapter');
dojo.require('uj.fais.CameraAdapter');
dojo.require('uj.fais.MouseAdapter');
dojo.require('uj.fais.SceneObjectPicker');

dojo.require('uj.fais.MonsterBuilder');
dojo.require('uj.fais.Monster');
dojo.require('uj.fais.Path');
dojo.require('uj.fais.Wave');
dojo.require('uj.fais.WaveManager');

uj.fais.Setup = function(canvasId) { 
    /* private member declaration */
    var doc, viewElement, gameRenderer, gameScene, cameraAdapter, keyboardAdapter, mouseAdapter, objectPicker;
    var waveManager, path;
    var timer, gameBoard;

    /* private methods */
    var gameLoop = function() {
        var mouseRelativePosition = mouseAdapter.getMouseRelativePosition();
        objectPicker.highlight(mouseRelativePosition);

        keyboardAdapter.handleInput(cameraAdapter);
        waveManager.handleWavesProgress();

        gameBoard.towerShot();

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

    var createWaves = function() {
        var mb = new uj.fais.MonsterBuilder(doc);
        waveManager = new uj.fais.WaveManager();
        
        var wave1 = new uj.fais.Wave(path, gameBoard, 50);
        wave1.addSimpleMonsters(3, mb);
        waveManager.addWave(wave1);

        var wave2 = new uj.fais.Wave(path, gameBoard, 30);
        wave2.addSimpleMonsters(4, mb);
        waveManager.addWave(wave2);

        var wave3 = new uj.fais.Wave(path, gameBoard, 30);
        wave3.addSimpleMonsters(5, mb);
        waveManager.addWave(wave3);
    };

    doc.onLoad = function(canvasId) {
        gameScene = doc.getElement('mainscene');
        gameBoard = new uj.fais.GameBoard(gameScene);

        gameRenderer.setScene(gameScene);
        cameraAdapter = new uj.fais.CameraAdapter(gameScene);

        keyboardAdapter = new uj.fais.KeyboardAdapter();

        objectPicker = new uj.fais.SceneObjectPicker(doc.getElement("yellow"), gameBoard, doc.getElement('tower-mesh'), doc.getElement('towerMaterial'));
        path = new uj.fais.Path(gameScene);

        createWaves();

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

        gameBoard.reset();
        waveManager.resetAllWaves();
        gameLoop();
    };

    this.nextWave = function() {
        console.info('click');
        waveManager.sendNextWave();
    };
};