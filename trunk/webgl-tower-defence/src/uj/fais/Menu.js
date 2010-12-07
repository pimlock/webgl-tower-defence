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
            alert("Nie ma komendy " + id);
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
    var menuBoczne = new uj.fais.Menu('menu-boczne');
    var opcja1Command = new uj.fais.MenuCommand();

    opcja1Command.run = function() {
        alert("Fdgdfgdfgdfg");
    };
    menuBoczne.register('opcja-1', opcja1Command);

    var menuDolne = new uj.fais.Menu('menu-dolne');
};