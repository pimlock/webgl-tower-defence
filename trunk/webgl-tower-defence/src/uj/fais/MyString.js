dojo.provide("uj.fais.MyString");

uj.fais.MyString = function(text) {
    var stringArray = [];
    var that = this;

    var init = function() {
        var i = 0;
        for (var x in text) {
            stringArray.push(text[x]);
            that[i++] = text[x];
        }
    };
    init();

    this.length = stringArray.length;
    this.toString = function() {
        return stringArray.join('');
    };
    this.charAt = function(index) {
        return stringArray[index];
    };
    this.concat = function(string) {
        return this.toString() + string;
    }
};