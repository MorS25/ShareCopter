// copter namespace
var CopterApplication = CopterApplication || {};

CopterApplication.CommandValidator = function() {
    this.VALID_ANIMATIONS = ['phiM30Deg', 'phi30Deg', 'thetaM30Deg', 'theta30Deg', 'theta20degYaw200deg',
        'theta20degYawM200deg', 'turnaround', 'turnaroundGodown', 'yawShake',
        'yawDance', 'phiDance', 'thetaDance', 'vzDance', 'wave', 'phiThetaMixed',
        'doublePhiThetaMixed', 'flipAhead', 'flipBehind', 'flipLeft', 'flipRight'];
};

CopterApplication.CommandValidator.prototype = {
    validateDirection: function (req, res) {
        var direction = req.params.direction;
        if (direction !== 'left' && direction !== 'right') {
            res.statusCode = 400;
            return res.send("Error 400: direction should be 'left' or 'right'");
        }
        return direction;
    },
    validateSpeed: function (req, res) {
        var speed = req.params.speed;
        if (speed === undefined || speed < 0 || speed > 1) {
            res.statusCode = 400;
            return res.send("Error 400: speed should be a number between 0 and 1");
        }
        return speed;
    },
    validateAnimation: function (req, res) {
        var animation = req.params.animation;
        if (this.VALID_ANIMATIONS.indexOf(animation) === -1) {
            res.statusCode = 400;
            var valid_animation_string = this.VALID_ANIMATIONS.join(", ")
            return res.send("Error 400: invalid animation name. Should be one of the following: "  + valid_animation_string);
        }
        return animation;
    },
    validateDuration: function (req, res) {
        var duration = req.params.duration;
        if (isNaN(duration) || duration <= 0) {
            res.statusCode = 400;
            return res.send("Error 400: duration should be bigger than 0");
        }
        return duration;
    },
    validateSpeed: function (req, res) {
        var speed = req.params.speed;
        if (isNaN(speed) || speed < 0 || speed > 1) {
            res.statusCode = 400;
            return res.send("Error 400: speed should be between 0 and 1");
        }
        return speed;
    }
};

module.exports.CommandValidator = CopterApplication.CommandValidator;