dojo.provide("uj.fais");

//dojo.require("uj.fais.WebGL");
dojo.require("uj.fais.Setup");
dojo.require("uj.fais.Menu");

/**
 * Funkcja, która inicjalizuje WebGL'a, podpina zdarzenia pod buttony i inne rzeczy,
 * które są potrzebne do odpalenia gierki.
 *
 * @param canvasId id elementu canvas, w którym będzię wyświetlana plansza
 */
uj.fais.init = function(canvasId, initWebGL) {
    if (initWebGL) {
        //uj.fais.WebGL.start(canvasId);
        var setup = new uj.fais.Setup(canvasId);

        setup.init();
    }
    uj.fais.Menu.init();
};

uj.fais.Position = function(x, y) {
    var /* Float */_x, _y;

    // private methods
    var init = function(x, y) {
        _x = x;
        _y = y;
    };

    init(x, y);    

    // public methods
    /**
     * Returns x-coordinate.
     * @returns x-coordinate
     * @type Number
     */
    this.getX = function() {
        return _x;
    };

    /**
     * Returns y-coordinate.
     * @returns y-coordinate
     * @type Number
     */
    this.getY = function() {
        return _y;
    };

    this.toString = function() {
        return "(" + _x + "," + _y + ")";
    }
};

uj.fais.Mediator = function() {
    this.monsterDead = function() {
        
    };  
};