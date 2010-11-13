dojo.require("uj.fais.MyString");

TestCase("MyStringTest", {
    myString: new uj.fais.MyString("Ala ma kota"),

    testGetLength: function() {
        assertEquals(11, this.myString.length);
    },

    testGetLengthOnEmpty: function() {
        var myString = new uj.fais.MyString("");
        assertEquals(0, myString.length);
    },

    testGetIndex: function() {
        assertEquals("A", this.myString[0]);
    },

    testToString: function() {
        assertEquals("Ala ma kota", this.myString.toString())
    },

    testValueOf: function() {
        assertEquals("Ala ma kota", this.myString.valueOf())
    },
    
    testCharAt: function() {
        assertEquals("l", this.myString.charAt(1));
        assertEquals("a", this.myString.charAt(2));
    },

    testConcat: function() {
        var myString = new uj.fais.MyString("Hello");
        assertEquals("Hello, world", myString.concat(', world'));
    }
});