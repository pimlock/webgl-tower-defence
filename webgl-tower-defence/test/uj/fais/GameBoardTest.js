dojo.require("uj.fais.GameBoard");

TestCase("GameBoardTest", {
    samplePosition: new uj.fais.Position(0, 0),
    sampleTower: new uj.fais.Tower(),

    setUp: function() {
        this.gameBoard = new uj.fais.GameBoard();
    },

    testGetTowersShouldReturnEmptyArray: function() {
        this.assertTowersEquals();
    },

    testTowersCountShouldBeOneAfterAdd: function() {
        this.addSampleTowerToGameBoard();        
        assertEquals(1, this.gameBoard.getTowersCount());
    },

    testShouldBeAbleToRetrieveAddedTower: function() {
        this.addSampleTowerToGameBoard();
        this.assertTowersEquals(this.sampleTower);
    },

    testShouldRetrieveTowerFromPosition: function() {
        this.addSampleTowerToGameBoard();
        var tower = this.gameBoard.getTowerAtPosition(this.samplePosition);
        assertEquals(this.sampleTower, tower);
    },

    testShouldRetrieveTowerFromPositionIfThereAreTwo: function() {
        this.addSampleTowerToGameBoard();
        var position = new uj.fais.Position(1, 1);
        var tower = new uj.fais.Tower();
        this.gameBoard.addTower(tower, position);

        var retrievedTower = this.gameBoard.getTowerAtPosition(position);

        assertEquals(tower, retrievedTower);
    },

    testIsInRange1: function() {
        var isInRange = this.gameBoard.isInRange(new uj.fais.Position(0, 0), new uj.fais.Position(1, 1), 1);
        assertEquals(false, isInRange);
    },

    addSampleTowerToGameBoard: function() {
        this.gameBoard.addTower(this.sampleTower, this.samplePosition);            
    },

    assertTowersEquals: function() {
        assertEquals(arguments, this.gameBoard.getAllTowers());
    }
});