dojo.provide("uj.fais.Tower");

dojo.require("uj.fais");

uj.fais.Tower = function(position) {
    this.position = position;
    this.towerId = uj.fais.Tower.towerId++;

    this.toString = function() {
        return "Tower{id:" + this.towerId + ", pos:" + this.position + "}";
    };
};
uj.fais.Tower.towerId = 1;