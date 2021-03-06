dojo.provide('uj.fais.Menu');

dojo.require('dojo.fx');
dojo.require('uj.fais.Audio');

uj.fais.MenuButton = function(_buttonId, _command) {
    var buttonId = _buttonId;
    var button = dojo.byId(_buttonId);
    var command = _command;

    this.getId = function() {
        return _buttonId;
    };

    this.setMenu = function(_menu) {
        command.menu = _menu;
    };

    this.action = function() {
        command.run();
    };

    this.hide = function() {
        dojo.style(button, 'display', 'none');
    };

    this.show = function() {
        dojo.style(button, 'display', '');
    };
};

uj.fais.MenuState = function() {
    var buttonStates = {
        'start': 0,
        'authors': 0,
        'next-wave': 0,
        'pause': 0,
        'resume': 0,
        'menu-return': 0,
        'debug': 0,
        'sound': 1
    };

    var _this = this;

    this.activateButton = function(buttonId) {
        buttonStates[buttonId] = 1;
        return _this;
    };

    this.getButtonState = function(buttonId) {
        return buttonStates[buttonId];
    }
};

/**
 * Klasa akcji, która może być dodana do menu.
 */
uj.fais.MenuCommand = function() {
    this.menu = null;

    /**
     * Funkcja odpalająca akcję.
     */
    this.run = function() {
    }
};

/**
 * Klasa obsługująca menu.
 *
 * @param menuId
 */
uj.fais.Menu = function(menuId) {
    this.menuId = menuId;
    this.domMenu = dojo.byId(menuId);
    this.buttons = [];
    this.menuState = uj.fais.Menu.States.mainMenu;

    var _this = this;

    /**
     * Konstruktor
     */
    function init() {
        _this.menuStateChanged();
        registerEventHandler();
    }

    /**
     * Rejestruje eventy w DOMie.
     */
    function registerEventHandler() {
        dojo.connect(_this.domMenu, 'onclick', _this.handleEvent);
    }

    this.handleEvent = function(event) {
        var target = event.target;
        var buttonId = dojo.attr(target, "id");

        var button = _this.getButton(buttonId);
        if (button !== null) {
            button.action();
        } else {
            console.info(buttonId);
        }
    };

    this.getButton = function(buttonId) {
        if (typeof _this.buttons[buttonId] !== "undefined") {
            return _this.buttons[buttonId];
        } else {
            return null;
        }
    };

    this.addButton = function(button) {
        this.buttons[button.getId()] = button;
        button.setMenu(this);
    };

    this.changeState = function(newState) {
        this.menuState = newState;
        this.menuStateChanged();
    };

    this.menuStateChanged = function() {
        for (var x in this.buttons) if (this.buttons.hasOwnProperty(x)) {
            var button = this.buttons[x];
            if (this.menuState.getButtonState(x) === 0) {
                button.hide();
            } else {
                button.show();
            }
        }
    };

    this.reset = function() {
        this.changeState(uj.fais.Menu.States.mainMenu);
    };

    init();
};

/**
 * Inicjalizacja menusów.
 */
uj.fais.Menu.init = function(setup) {
    var menuBoczne = new uj.fais.Menu('menu-boczne');
    uj.fais.Mediator.getInstance().set('menuBoczne', menuBoczne);
    uj.fais.Menu.initAuthorsInfo(menuBoczne);

    var startCommand = new uj.fais.MenuCommand();
    startCommand.run = function() {
        setup.startGame();

        var player = new uj.fais.Player();
        uj.fais.Mediator.getInstance().get('gameInfoPanel').show();
        
        startCommand.menu.changeState(uj.fais.Menu.States.activeGame);
    };

    menuBoczne.addButton(new uj.fais.MenuButton('start', startCommand));

    var nextWaveCommand = new uj.fais.MenuCommand();
    nextWaveCommand.run = function() {
        setup.nextWave();
    };
    menuBoczne.addButton(new uj.fais.MenuButton('next-wave', nextWaveCommand));

    var pauseCommand = new uj.fais.MenuCommand();
    pauseCommand.run = function() {
        setup.pauseGame();
        pauseCommand.menu.changeState(uj.fais.Menu.States.pausedGame);
    };

    menuBoczne.addButton(new uj.fais.MenuButton('pause', pauseCommand));

    var resumeCommand = new uj.fais.MenuCommand();
    resumeCommand.run = function() {
        setup.startGame();

        startCommand.menu.changeState(uj.fais.Menu.States.activeGame);
    };
    menuBoczne.addButton(new uj.fais.MenuButton('resume', resumeCommand));

    var menuReturnCommand = new uj.fais.MenuCommand();
    menuReturnCommand.run = function() {
        setup.resetGame();
        menuReturnCommand.menu.changeState(uj.fais.Menu.States.mainMenu);
    };
    menuBoczne.addButton(new uj.fais.MenuButton('menu-return', menuReturnCommand));

    var debugCommand = new uj.fais.MenuCommand();
    debugCommand.run = function() {
        var mediator = uj.fais.Mediator.getInstance();
        var gameBoard = mediator.get('gameBoard');

        console.info(dojo.toJson(gameBoard.getAllTowers()));
        console.info(dojo.toJson(gameBoard.getAllMonsters()));

        mediator.gameOver(true);
    };
    menuBoczne.addButton(new uj.fais.MenuButton('debug', debugCommand));

    var soundCommand = new uj.fais.MenuCommand();
    soundCommand.run = function() {
        var fileName = 'img/sound-' + (uj.fais.Audio.enabled ? 'off' : 'on') + '.png';
        dojo.attr(dojo.byId('sound'), 'src', fileName);
        uj.fais.Audio.enabled = !uj.fais.Audio.enabled;
    };
    menuBoczne.addButton(new uj.fais.MenuButton('sound', soundCommand));

    menuBoczne.menuStateChanged();
};

uj.fais.Menu.initMenuStates = function() {
    var mainMenuState = new uj.fais.MenuState();
    mainMenuState.activateButton('start').
            activateButton('authors');

    var activeGameState = new uj.fais.MenuState();
    activeGameState.activateButton('pause').
            activateButton('menu-return').
            activateButton('next-wave');

    var pausedGameState = new uj.fais.MenuState();
    pausedGameState.activateButton('resume').
            activateButton('menu-return');

    var levelCompletedState = new uj.fais.MenuState();
    levelCompletedState.activateButton('next-wave').
            activateButton('menu-return');

    uj.fais.Menu.States = {
        mainMenu: mainMenuState,
        activeGame: activeGameState,
        pausedGame: pausedGameState,
        levelCompleted: levelCompletedState
    };
};
uj.fais.Menu.initMenuStates();

uj.fais.Menu.initAuthorsInfo = function(menuBoczne) {
    var authorsInfo = dojo.byId('authors-info');
    dojo.query('a', authorsInfo).onclick(function(event) {
        dojo.fadeOut({
            node: authorsInfo,
            onEnd: function() {
                dojo.style(authorsInfo, 'display', 'none');
            }
        }).play();
        dojo.fx.slideTo({
            node: authorsInfo,
            top: 0,
            left: 0,
            unit: 'px'
        }).play();
    });

    var authorsInfoCommand = new uj.fais.MenuCommand();
    authorsInfoCommand.run = function() {
        dojo.style(authorsInfo, 'opacity', 0);
        dojo.style(authorsInfo, 'display', '');
        dojo.fadeIn({node: authorsInfo}).play();
        dojo.fx.slideTo({
            node: authorsInfo,
            top: dojo.coords('plansza-wrapper').t - 15,
            left: dojo.coords('plansza-wrapper').l - 15,
            unit: 'px'
        }).play();
        uj.fais.Audio.playSound('applause');
    };
    menuBoczne.addButton(new uj.fais.MenuButton('authors', authorsInfoCommand));
};