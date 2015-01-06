class window.MeetupApi
  # see http://www.meetup.com/meetup_api/auth/#keysign for signed URLs
  # TODO Change to Triangle Ember endpoint
  EVENTS_URL: "http:\/\/api.meetup.com\/2\/events?status=upcoming&order=time&limited_events=False&group_urlname=WebDesign2-0&desc=false&offset=0&format=json&page=200&fields=&sig_id=37213312&sig=de4525e61ba15c5578f37d0af95b9a6a815d1e15"

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
