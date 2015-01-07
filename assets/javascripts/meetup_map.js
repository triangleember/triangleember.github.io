(function() {
  window.MeetupMap = (function() {
    MeetupMap.prototype.MAPS_API_KEY = "AIzaSyA7wI0GezpAtXC4DPXQg5kEXYrKg4vC8Hc";

    function MeetupMap(address) {
      this.address = address;
    }

    MeetupMap.prototype.url = function() {
      return "https://www.google.com/maps/search/" + (this._encodedAddress());
    };

    MeetupMap.prototype._encodedAddress = function() {
      return encodeURIComponent(this.address);
    };

    return MeetupMap;

  })();

}).call(this);
