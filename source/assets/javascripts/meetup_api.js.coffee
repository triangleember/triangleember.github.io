class window.MeetupApi
  # see http://www.meetup.com/meetup_api/auth/#keysign for signed URLs
  EVENTS_URL: "http:\/\/api.meetup.com\/2\/events?status=upcoming&order=time&limited_events=False&group_urlname=Triangle-Ember&desc=false&offset=0&format=json&page=200&fields=&sig_id=37213312&sig=ea0d0ebe4ca2a566bd6207d05b31647fff8bbc6d","link":"https:\/\/api.meetup.com\/2\/events"

  events: []
  pastEvents: []

  firstEvent: -> new MeetupEvent(@events[0])

  loadEvents: ->
    $.ajax
      type: "GET"
      url: @EVENTS_URL
      contentType: "application/json",
      dataType: "jsonp",
      success: (data) =>
        @events = data.results
