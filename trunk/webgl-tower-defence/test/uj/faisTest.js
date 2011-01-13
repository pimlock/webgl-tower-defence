dojo.require("uj.fais");

TestCase("faisTest", {
    testPositionToString: function() {
        var position = new uj.fais.Position(1, 2);
        assertEquals("(1,2)", position.toString());
    },

    testArrayDelete: function() {
        var array = [];
        array.push(1);
        array.push(2);

        assertEquals([1, 2], array);

        delete array[0];

        assertEquals([null, 2], array);
    }
});