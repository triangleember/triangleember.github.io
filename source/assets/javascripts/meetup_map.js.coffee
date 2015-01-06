class window.MeetupMap
  MAPS_API_KEY: "AIzaSyA7wI0GezpAtXC4DPXQg5kEXYrKg4vC8Hc"

  constructor: (@address) ->

  url: ->
    "https://www.google.com/maps/search/#{@_encodedAddress()}"

  _encodedAddress: ->
    encodeURIComponent(@address)
