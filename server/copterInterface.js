// Copter Interface
module.exports = {
    takeOff : function(){},
    land: function(){},
    up: function(speed, duration){},
    down: function(speed, duration){},
    front: function(speed, duration){},
    back: function(speed, duration){},
    left: function(speed, duration){},
    right: function(speed, duration){},
    stop: function(){},
    crane: function(){},
    square: function(){},

    /*
     direction: ['left', 'right']
     speed: [0..1]
     */
    turnAround: function(direction, speed) { },
    /*
     animation:
         ['phiM30Deg', 'phi30Deg', 'thetaM30Deg', 'theta30Deg', 'theta20degYaw200deg',
         'theta20degYawM200deg', 'turnaround', 'turnaroundGodown', 'yawShake',
         'yawDance', 'phiDance', 'thetaDance', 'vzDance', 'wave', 'phiThetaMixed',
         'doublePhiThetaMixed', 'flipAhead', 'flipBehind', 'flipLeft', 'flipRight']

     duration: milliseconds
     */
    animate: function(animation, duration){},
    altitude: function(height) {},
    getClient : function(){}
};