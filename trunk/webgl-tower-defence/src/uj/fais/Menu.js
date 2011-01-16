dojo.provide("uj.fais.Menu");

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
    console.info('sdsada');
    this.domMenu = dojo.byId(menuId);
    this.menuCommands = [];

    var _this = this;

    /**
     * Rejestruje eventy w DOMie.
     */
    function _registerEventHandler() {
        dojo.connect(_this.domMenu, 'onclick', _this.handleEvent);
    }

    this.handleEvent = function(event) {
        var target = event.target;
        var id = dojo.attr(target, "id");
        dojo.addClass(target, "ala");

        if (typeof _this.menuCommands[id] !== "undefined") {
            _this.menuCommands[id].run();
        } else {
            console.warn("Nie ma komendy " + id);
        }
    };

    /**
     * Rejestruje akcje w menu.
     *
     * @param commandKey
     * @param command
     */
    this.register = function(commandKey, command) {
        this.menuCommands[commandKey] = command;
        command.menu = this;
    };

    _registerEventHandler();
};

/**
 * Inicjalizacja menusów.
 */
uj.fais.Menu.init = function() {
    console.info('sdsada');
    var menuBoczne = new uj.fais.Menu('menu-boczne');
    var opcja1Command = new uj.fais.MenuCommand();

    opcja1Command.run = function() {
        console.info("Fdgdfgdfgdfg");
    };
    menuBoczne.register('next-wave', opcja1Command);
    uj.fais.Menu.initAuthorsInfo(menuBoczne);

    var menuDolne = new uj.fais.Menu('menu-dolne');
};

uj.fais.Menu.initAuthorsInfo = function(menu) {
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
        dojo.require('dojo.fx');

        dojo.style(authorsInfo, 'opacity', 0);
        dojo.style(authorsInfo, 'display', '');
        dojo.fadeIn({node: authorsInfo}).play();
        dojo.fx.slideTo({
            node: authorsInfo,
            top: dojo.coords('plansza').t - 15,
            left: dojo.coords('plansza').l - 15,
            unit: 'px'
        }).play();
    };
    menu.register('authors', authorsInfoCommand);
};