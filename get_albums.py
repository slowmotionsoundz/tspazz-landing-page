import urllib.request
import json

url = "https://itunes.apple.com/search?term=Tspazz&entity=album"
try:
    with urllib.request.urlopen(url) as response:
        data = json.loads(response.read().decode())
        
        for result in data.get("results", []):
            title = result.get("collectionName")
            link = result.get("collectionViewUrl")
            artwork = result.get("artworkUrl100")
            if artwork:
                # Get high res artwork
                artwork = artwork.replace("100x100bb", "600x600bb")
            print(f"Title: {title}")
            print(f"Link: {link}")
            print(f"Artwork: {artwork}")
            print("---")
except Exception as e:
    print(f"Error: {e}")
