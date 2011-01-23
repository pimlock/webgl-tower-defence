dojo.provide("uj.fais.Player");

dojo.require("uj.fais");

uj.fais.Player = function() {
    var money = uj.fais.Config['player.money'], points = 0;
    /**
     * Określa liczbę potworków, którą gracz może jeszcze przepuścić.
     */
    var lifes = uj.fais.Config['player.lifes'];

    var waveNumber = 1;
    
    this.getMoney = function() {
        return money;
    };

    this.getPoints = function() {
        return points;
    };

    this.getLifes = function() {
        return lifes;
    };

    this.getWaveNumber = function() {
        return waveNumber;
    };

    this.decrementLifes = function() {
        if (lifes > 0) {
            lifes--;
        }
        if (lifes <= 0) {
            uj.fais.Mediator.getInstance().gameOver(true);
        }
    };

    this.incrementWave = function() {
        waveNumber++;
    }

    this.addMoney = function(amount) {
        money += amount;
        // TODO coś mądrzejszego?
        points += amount/10;
    };

    this.removeMoney = function(amount) {
        money -= amount;
    };

    uj.fais.Mediator.getInstance().set('player', this);
};