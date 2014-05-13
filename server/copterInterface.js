// Copter Interface
module.exports = {
    takeOff : function(){},
    land: function(){},

    /*
        direction: ['left', 'right']
        speed: [0..1]
     */
    turnAround: function(direction, speed){},
    up: function(speed){},
    down: function(speed){},
    front: function(speed){},
    back: function(speed){},
    left: function(speed){},
    right: function(speed){},
    stop: function(){},

    /* animation:
         ['phiM30Deg', 'phi30Deg', 'thetaM30Deg', 'theta30Deg', 'theta20degYaw200deg',
         'theta20degYawM200deg', 'turnaround', 'turnaroundGodown', 'yawShake',
         'yawDance', 'phiDance', 'thetaDance', 'vzDance', 'wave', 'phiThetaMixed',
         'doublePhiThetaMixed', 'flipAhead', 'flipBehind', 'flipLeft', 'flipRight']

     duration: milliseconds
     */
    animate: function(animation, duration){}
};