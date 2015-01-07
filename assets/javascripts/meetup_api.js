(function() {
  window.MeetupApi = (function() {
    function MeetupApi() {}

    MeetupApi.prototype.EVENTS_URL = "http:\/\/api.meetup.com\/2\/events?status=upcoming&order=time&limited_events=False&group_urlname=Triangle-Ember&desc=false&offset=0&format=json&page=200&fields=&sig_id=37213312&sig=ea0d0ebe4ca2a566bd6207d05b31647fff8bbc6d";

    MeetupApi.prototype["link"] = "https:\/\/api.meetup.com\/2\/events";

    MeetupApi.prototype.events = [];

    MeetupApi.prototype.pastEvents = [];

    MeetupApi.prototype.firstEvent = function() {
      return new MeetupEvent(this.events[0]);
    };

    MeetupApi.prototype.loadEvents = function() {
      return $.ajax({
        type: "GET",
        url: this.EVENTS_URL,
        contentType: "application/json",
        dataType: "jsonp",
        success: (function(_this) {
          return function(data) {
            return _this.events = data.results;
          };
        })(this)
      });
    };

    return MeetupApi;

  })();

}).call(this);
