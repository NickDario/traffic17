#
#   Duraction
#   
#   A service to provide duration when given a direction and an endpoint
#
from config import api_key, place_ids
import googlemaps
from googlemaps.client import Client

client = Client(api_key)
params = {
    'origin' : 'place_id:' + place_ids['home'],
    'destination' : 'place_id:' + place_ids['tigo'],
    'departure_time': 'now',
}

directions = client._get('/maps/api/directions/json', params)

duration = directions['routes'][0]['legs'][0]['duration_in_traffic']
print(duration['value']/60)



