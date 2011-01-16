dojo.provide('uj.fais.MouseAdapter');

uj.fais.MouseAdapter = function(_viewElement) {
    var mouseActive;
    var viewElement = _viewElement;
    var mouse=new GLGE.MouseInput(_viewElement);

    this.getMouseRelativePosition = function() {
        if (mouseActive) {
            var mousePosition = mouse.getMousePosition();
            mousePosition.x = mousePosition.x + document.getElementById("gra").offsetLeft;
            mousePosition.y = mousePosition.y + document.getElementById("gra").offsetTop;

            return mousePosition;
        }
        return null;
    };

    this.setMouseActive = function() {
        mouseActive = true;
    };

    this.setMouseInActive = function() {
        mouseActive = false;
    };
};