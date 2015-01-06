window.displayInformationForNextMeetup = ->
  meetup = new MeetupApi

  meetup.loadEvents().done ->
    nextEvent = meetup.firstEvent()

    setName(nextEvent.name())
    setDescription(nextEvent.description())
    setDateTime(nextEvent)
    setVenueName(nextEvent.venueName())
    setVenueLocation(nextEvent.mapUrl())
    setRsvpUrl(nextEvent.eventUrl())

    showMeetup()

setRsvpUrl = (url) ->
  eventOnPage("rsvp-link").prop("href", url)

setName = (name) ->
  setEventText("name", name)

setDescription = (text)->
  eventOnPage("description").html(text)

setDateTime = (event) ->
  setEventText("time", event.time())
  setEventText("date", event.date())

setVenueName = (name) ->
  setEventText("venue-name", name)

setVenueLocation = (url) ->
  eventOnPage("venue-name").prop("href", url).load()

setEventText = (role, text) ->
  eventOnPage(role).text(text)

eventOnPage = (role) ->
  $("[data-role='event'] [data-role='#{role}']")

showMeetup = ->
  $(".event").show()
