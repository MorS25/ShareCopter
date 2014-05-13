// Copter Factory
var CopterFactory = {
    getCopterInstance : function(type) {}
};

var ConcreteCopterFactory = function() {};

var CopterImplementation = require('../copterImplementation').Copter;
var CopterTestImplementation = require('../copterTestImplementation').Copter;

ConcreteCopterFactory.prototype = Object.create(CopterFactory);

ConcreteCopterFactory.prototype.getCopterInstance = function(type) {
    if (type === "copter") {
        return new CopterImplementation();
    }
    return new CopterTestImplementation();
};

module.exports = CopterFactory;
