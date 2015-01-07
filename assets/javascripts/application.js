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
(function() {
  window.MeetupEvent = (function() {
    function MeetupEvent(eventData) {
      this.eventData = eventData;
    }

    MeetupEvent.prototype.name = function() {
      var _ref;
      return (_ref = this.eventData) != null ? _ref.name : void 0;
    };

    MeetupEvent.prototype.mapUrl = function() {
      return new MeetupMap(this.address()).url();
    };

    MeetupEvent.prototype.eventUrl = function() {
      return this.eventData.event_url;
    };

    MeetupEvent.prototype.description = function() {
      return this.eventData.description;
    };

    MeetupEvent.prototype.speakerName = function() {
      var match, pattern;
      pattern = /^<p><b>Speaker<\/b>:(.*)<\/p> <p><b>S/;
      match = this.description().match(pattern);
      return (match != null ? match[1] : void 0) || '';
    };

    MeetupEvent.prototype.address = function() {
      return [this._venue().name, this._venue().address_1, this._venue().address_2, this._venue().city, this._venue().zip].join(',');
    };

    MeetupEvent.prototype.time = function() {
      return this._time().format('h:mm a');
    };

    MeetupEvent.prototype.date = function() {
      return this._time().format('MMM DD, YYYY');
    };

    MeetupEvent.prototype.monthYear = function() {
      return this._time().format('MMMM YYYY');
    };

    MeetupEvent.prototype.venueName = function() {
      return this._venue().name;
    };

    MeetupEvent.prototype._time = function() {
      return this._momentTime || (this._momentTime = moment(this.eventData.time));
    };

    MeetupEvent.prototype._venue = function() {
      return this.eventData.venue;
    };

    return MeetupEvent;

  })();

}).call(this);
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
(function() {
  var eventOnPage, setDateTime, setDescription, setEventText, setName, setRsvpUrl, setVenueLocation, setVenueName, showEmpty, showMeetup;

  window.displayInformationForNextMeetup = function() {
    var meetup;
    meetup = new MeetupApi;
    return meetup.loadEvents().done(function() {
      var nextEvent;
      nextEvent = meetup.firstEvent();
      if (nextEvent.name()) {
        setName(nextEvent.name());
        setDescription(nextEvent.description());
        setDateTime(nextEvent);
        setVenueName(nextEvent.venueName());
        setVenueLocation(nextEvent.mapUrl());
        setRsvpUrl(nextEvent.eventUrl());
        return showMeetup();
      } else {
        return showEmpty();
      }
    });
  };

  setRsvpUrl = function(url) {
    return eventOnPage("rsvp-link").prop("href", url);
  };

  setName = function(name) {
    return setEventText("name", name);
  };

  setDescription = function(text) {
    return eventOnPage("description").html(text);
  };

  setDateTime = function(event) {
    setEventText("time", event.time());
    return setEventText("date", event.date());
  };

  setVenueName = function(name) {
    return setEventText("venue-name", name);
  };

  setVenueLocation = function(url) {
    return eventOnPage("venue-name").prop("href", url).load();
  };

  setEventText = function(role, text) {
    return eventOnPage(role).text(text);
  };

  eventOnPage = function(role) {
    return $("[data-role='event'] [data-role='" + role + "']");
  };

  showMeetup = function() {
    return $(".js-scheduled").show();
  };

  showEmpty = function() {
    return $(".js-unscheduled").show();
  };

}).call(this);
(function() {
  $(function() {
    return displayInformationForNextMeetup();
  });

}).call(this);
