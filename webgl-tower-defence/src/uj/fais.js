dojo.provide("uj.fais");

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