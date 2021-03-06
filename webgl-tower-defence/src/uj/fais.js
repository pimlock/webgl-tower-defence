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
    var gameInfoPanel = new uj.fais.GameInfoPanel('gra-info');

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

/**
 * Klasa, która będzie zarządzała logiką gry, tzn.
 * co się dzieje, gdy umiera potworek, itp.
 */
uj.fais.Mediator = function() {
    this.registry = {
        setup: null,
        gameInfoPanel: null,
        player: null,
        gameBoard: null,
        waveManager: null,
        menuBoczne: null
    };

    this.monsterDead = function(monster) {
        this.get('player').addMoney(monster.value);
        this.registry.gameInfoPanel.update();

        this.registry.gameBoard.removeMonster(monster);
        this.registry.waveManager.getCurrentWave().removeKilledMonster(monster);
    };

    this.waveEnd = function() {
        this.get('player').incrementWave();
        this.registry.gameInfoPanel.update();
    };

    this.towerBought = function(tower) {
        this.get('player').removeMoney(tower.getCost());
        this.registry.gameInfoPanel.update();
    };

    this.monsterEscaped = function() {
        this.get('player').decrementLifes();
        this.registry.gameInfoPanel.update();
    };

    this.get = function(id) {
        return this.registry[id];
    };

    this.gameOver = function(isGameOver) {
        var gameOver = dojo.byId('game-over');
        if (isGameOver) {
            dojo.style('game-completed-hdr', 'display', 'none');
            dojo.style('game-over-hdr', 'display', '');
        } else {
            dojo.style('game-completed-hdr', 'display', '');
            dojo.style('game-over-hdr', 'display', 'none');
            uj.fais.Audio.playSound('applause');
        }
        dojo.query('a', gameOver).onclick(function(event) {
            dojo.fadeOut({
                node: gameOver,
                onEnd: function() {
                    dojo.style(gameOver, 'display', 'none');
                }
            }).play();
            dojo.fx.slideTo({
                node: gameOver,
                top: 0,
                left: 0,
                unit: 'px'
            }).play();
        });

        dojo.style(gameOver, 'opacity', 0);
        dojo.style(gameOver, 'display', '');
        dojo.fadeIn({node: gameOver}).play();
        dojo.fx.slideTo({
            node: gameOver,
            top: dojo.coords('plansza-wrapper').t - 15,
            left: dojo.coords('plansza-wrapper').l - 15,
            unit: 'px'
        }).play();
        dojo.byId('game-punkty').innerHTML = this.registry.player.getPoints();

        this.registry.setup.resetGame();
        this.registry.menuBoczne.reset();
    };

    this.set = function(id, object) {
        this.registry[id] = object;

        if (id == 'player') {
            this.registry.gameInfoPanel.update();
        }
    };
};
uj.fais.Mediator.instance = null;
uj.fais.Mediator.getInstance = function() {
    if (uj.fais.Mediator.instance === null) {
        uj.fais.Mediator.instance = new uj.fais.Mediator();
    }
    return uj.fais.Mediator.instance;
};

uj.fais.Config = {
    'monster.deltaTime': 0.1,
    'monster.maxHealth': 200,

    'camera.rot.x': 2.44,
    'camera.rot.y': 2.97,
    'camera.rot.z': 0.7,
    'camera.loc.x': 4.53,
    'camera.loc.y': 12.58,
    'camera.loc.z': 28,

    'object.loc.z': 2,

    'player.money': 1000,
    'player.lifes': 5
};