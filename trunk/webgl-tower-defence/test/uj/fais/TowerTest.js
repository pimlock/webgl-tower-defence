dojo.require("uj.fais.Tower");

TestCase("TowerTest", {
    testTowerToString: function() {
        var tower = new uj.fais.Tower();
        tower.putOnGameBoard(new uj.fais.GameBoard(), new uj.fais.Position(1, 1));
        assertEquals("Tower{id:" + tower.towerId + ", pos:(1,1)}", tower.toString());
    },

    testTowerIdIncreaseOnTowerCreation: function() {
        var position = new uj.fais.Position(1, 1);
        var tower1 = new uj.fais.Tower(position);
        var tower2 = new uj.fais.Tower(position);

        assertEquals(tower1.towerId, tower2.towerId - 1);
    }
});