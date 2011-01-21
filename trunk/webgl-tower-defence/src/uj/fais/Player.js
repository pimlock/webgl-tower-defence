dojo.provide("uj.fais.Player");

dojo.require("uj.fais");

uj.fais.Player = function() {
    var money = uj.fais.Config['player.money'], points = 0;
    /**
     * Określa liczbę potworków, którą gracz może jeszcze przepuścić.
     */
    var lifes = uj.fais.Config['player.lifes'];

    this.getMoney = function() {
        return money;
    };

    this.getPoints = function() {
        return points;
    };

    this.getLifes = function() {
        return lifes;
    };

    uj.fais.Mediator.getInstance().set('player', this);
};