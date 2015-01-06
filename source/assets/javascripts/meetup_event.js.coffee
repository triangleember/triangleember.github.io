class window.MeetupEvent
  constructor: (@eventData) ->

  name: -> @eventData.name

  mapUrl: -> new MeetupMap(@address()).url()

  eventUrl: -> @eventData.event_url

  description: -> @eventData.description
  speakerName: ->
    pattern = /^<p><b>Speaker<\/b>:(.*)<\/p> <p><b>S/
    match = @description().match(pattern)

    match?[1] || ''

  address: ->
    [
      @_venue().name,
      @_venue().address_1,
      @_venue().address_2,
      @_venue().city,
      @_venue().zip
    ].join(',')

  time: ->
    @_time().format('h:mm a')

  date: ->
    @_time().format('MMM DD, YYYY')

  monthYear: ->
    @_time().format('MMMM YYYY')

  venueName: ->
    @_venue().name

  _time: -> @_momentTime ||= moment(@eventData.time)

  _venue: -> @eventData.venue
