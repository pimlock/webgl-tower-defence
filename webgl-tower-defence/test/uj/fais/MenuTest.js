dojo.require("uj.fais.Menu");

TestCase("MenuTest", {
    testAddButton: function() {
        // having
        var menu = new uj.fais.Menu('menu');
        var menuCommand = new uj.fais.MenuCommand();
        var test = 'before-click';

        menuCommand.run = function() {
            test = 'after-click';
        };
        menu.addButton(new uj.fais.MenuButton('option-1', menuCommand));

        // when
        var a = document.createElement('a');
        a.id = 'option-1';
        menu.handleEvent({target: a});

        // then
        assertEquals('after-click', test);
    }
});