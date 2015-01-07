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
