dojo.provide('uj.fais.MouseAdapter');

uj.fais.MouseAdapter = function(_viewElement, _parentViewElement) {
    var mouseActive = false;
    var viewElement = _viewElement;
    var parentViewElement = _parentViewElement;
    var mouse=new GLGE.MouseInput(_viewElement);

    this.getMouseRelativePosition = function() {
        if (mouseActive) {
            var mousePosition = mouse.getMousePosition();
            mousePosition.x = mousePosition.x + parentViewElement.offsetLeft;
            mousePosition.y = mousePosition.y + parentViewElement.offsetTop;

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