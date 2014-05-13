/**
 * Created by oge on 13.05.14.
 */
function TrackingShot(name,distance) {
    var self = this;
    self.name = name;
    self.distance = distance;

}

// Overall viewmodel for this screen, along with initial state
function CameraViewModel() {
    var self = this;

    var baseAddress = "http://localhost:3000";

    // Non-editable catalog data - would come from the server
    self.availableTrackingShots = [
        { name: "Umkreisen", distance: 2 },
        { name: "Überflug", distance: 3 },
        { name: "Kran", distance: 5 }
    ];

    // Editable data
    self.trackingShots = ko.observableArray([
        new TrackingShot(self.availableTrackingShots[0].name,self.availableTrackingShots[0].distance),
        new TrackingShot(self.availableTrackingShots[1].name,self.availableTrackingShots[1].distance)
    ]);

    self.addTrackingShot = function(){
        self.trackingShots.push(new TrackingShot(self.availableTrackingShots[0]));
    };

    self.removeTrackingShot = function(trackingShot) { self.trackingShots.remove(trackingShot) };

    self.sendToServer = function(){
        var xmlHttp = null;

        xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", baseAddress + "/takeoff", false );
        xmlHttp.send( null );
        alert('Server responded: ' + xmlHttp.responseText);
    };
}

ko.applyBindings(new CameraViewModel());