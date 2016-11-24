#
#   Duraction
#   
#   A service to provide duration when given a direction and an endpoint
#
from config import api_key, place_ids
import googlemaps
from googlemaps.client import Client

#   Query google servers for route
client = Client(api_key)
params = {
    'origin' : 'place_id:' + place_ids['home'],
    'destination' : 'place_id:' + place_ids['tigo'],
    'departure_time': 'now',
}
directions  = client._get('/maps/api/directions/json', params)

#   Parse out route summary
duration    = directions['routes'][0]['legs'][0]
summary     = directions['routes'][0]['summary']

#   Prase out route duration
route       = directions['routes'][0]['legs'][0]
minutes     = route['duration_in_traffic']['text']

#   Output route message 
print('Suggested Route: ' + summary)
print(minutes)

