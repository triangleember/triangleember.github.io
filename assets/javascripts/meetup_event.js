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
