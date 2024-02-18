
import googlemaps

def get_place_reviews(place_name, api_key):
    # Initialize the Google Maps client
    gmaps = googlemaps.Client(key=api_key)
    
    # Perform a place search based on the place name
    places_result = gmaps.places(query=place_name)

    # Check if any places were found
    if len(places_result['results']) == 0:
        print("No places found with the given name.")
        return []

    # Extract the place ID of the first result
    place_id = places_result['results'][0]['place_id']

    # Fetch details of the place, including its reviews
    place_details = gmaps.place(place_id=place_id, fields=['reviews'])

    # Extract and return the reviews
    reviews = place_details.get('reviews', [])
    return reviews

def get_coffee_shop_ids(api_key, location, radius=1000):
    gmaps = googlemaps.Client(key=api_key)
    
    # Perform a nearby search for coffee shops
    coffee_shops = gmaps.places_nearby(location=location, radius=radius, type='cafe')
    
    # Extract place IDs of coffee shops
    coffee_shop_ids = [place['place_id'] for place in coffee_shops['results']]
    
    return coffee_shop_ids

def get_place_reviews(api_key, place_id):
    gmaps = googlemaps.Client(key=api_key)
    place_details = gmaps.place(place_id)
    reviews = place_details['result'].get('reviews', [])
    return reviews

# Example usage:
if __name__ == "__main__":
    place_name = "Empire State Building"  # Replace with the place name you want to search for
    api_key = 'YOUR_API_KEY'  # Replace with your actual Google Maps API key

    reviews = get_place_reviews(place_name, api_key)
    print("Number of reviews:", len(reviews))
    for idx, review in enumerate(reviews, start=1):
        print(f"Review {idx}:")
        print("Rating:", review.get('rating'))
        print("Author:", review.get('author_name'))
        print("Text:", review.get('text'))
        print()

    api_key = 'YOUR_API_KEY'
    place_id = 'PLACE_ID'  # Replace with the place ID of the restaurant or coffee shop
    reviews = get_place_reviews(api_key, place_id)
    
    for review in reviews:
        print(f"Author: {review['author_name']}")
        print(f"Rating: {review['rating']}")
        print(f"Text: {review['text']}")
        print()

    api_key = 'YOUR_API_KEY'
    location = '37.7749,-122.4194'  # Latitude and longitude of the desired location
    radius = 1000  # Search radius in meters
    
    coffee_shop_ids = get_coffee_shop_ids(api_key, location, radius)
    
    print("Coffee Shop IDs:")
    for place_id in coffee_shop_ids:
        print(place_id)