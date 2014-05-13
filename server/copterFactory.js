// Copter Factory

var CopterFactoryInterface = {
    getCopterInstance: function (type) {
    }
};

var ConcreteCopterFactory = function () {
};

var CopterImplementation = require('../server/copterImplementation').Copter;
var CopterTestImplementation = require('../test/copterTestImplementation').Copter;

ConcreteCopterFactory.prototype = Object.create(CopterFactoryInterface);

ConcreteCopterFactory.prototype.getCopterInstance = function (type) {
    if (type === "copter") {
        console.log("Creating copter client...")
        return new CopterImplementation();
    }
    return new CopterTestImplementation();
};

module.exports = ConcreteCopterFactory;
