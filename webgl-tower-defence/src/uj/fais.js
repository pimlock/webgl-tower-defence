dojo.provide("uj.fais");

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
        if (Modernizr.webgl) {
            try {
                var setup = new uj.fais.Setup(canvasId);
                setup.init();
            } catch (e) {
            }
        }
    }
    uj.fais.Menu.init(setup);

    setTimeout(uj.fais.removeLoadingInfo, 500);
};

uj.fais.removeLoadingInfo = function() {
    var loading = dojo.byId('loading');
    dojo.fadeOut({
        node: loading,
        onEnd: function() {
            dojo.style(loading, 'display', 'none');
        }
    }).play();
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
    };

    this.equals = function(obj) {
        return _x == obj.getX() && _y == obj.getY();  
    };
};

uj.fais.Mediator = function() {
    this.monsterDead = function() {
        
    };  
};

uj.fais.Config = {
    'monster.deltaTime': 0.1,
    'camera.rot.x': 2.44,
    'camera.rot.y': 2.97,
    'camera.rot.z': 0.7,
    'camera.loc.x': 4.53,
    'camera.loc.y': 12.58,
    'camera.loc.z': 28
};