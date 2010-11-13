dojo.require("uj.fais");

TestCase("faisTest", {
    testPositionToString: function() {
        var position = new uj.fais.Position(1, 2);
        assertEquals("(1,2)", position.toString());
    }
});