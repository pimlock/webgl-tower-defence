dojo.provide('uj.fais.GameInfoPanel');

dojo.require('dojo.html');

uj.fais.GameInfoPanelElement = function(elementId) {
    var elementDom = dojo.byId(elementId);
    var currentValue = null;

    this.setValue = function(value) {
        if (currentValue != value) {
            dojo.fadeOut({
                node: elementDom,
                onEnd: function(){
                    elementDom.innerHTML = value;
                    dojo.fadeIn({node: elementDom}).play()
                }
            }).play();
            currentValue = value;
        }
    };
};

uj.fais.GameInfoPanel = function(panelId) {
    var panelDom = dojo.byId(panelId);
    var items = dojo.query('.item', panelDom);

    this.elements = {};
    var _this = this;

    var init = function() {
        _this.elements = {
            money: new uj.fais.GameInfoPanelElement('kasa'),
            points: new uj.fais.GameInfoPanelElement('punkty'),
            lifes: new uj.fais.GameInfoPanelElement('zycia'),
            waveNumber: new uj.fais.GameInfoPanelElement('fala')
        };
        uj.fais.Mediator.getInstance().set('gameInfoPanel', _this);
    };

    init();

    this.show = function() {
        items.style('display', 'block');
    };

    this.hide = function() {
        items.style('display', 'none');
    };

    this.update = function() {
        var player = uj.fais.Mediator.getInstance().get('player');

        this.elements.money.setValue(player.getMoney());
        this.elements.points.setValue(player.getPoints());
        this.elements.lifes.setValue(player.getLifes());
        this.elements.waveNumber.setValue(player.getWaveNumber());
    };
};