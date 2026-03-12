import urllib.request
import json
import urllib.parse

url = "https://itunes.apple.com/search?term=Tspazz+Need+That&entity=song"
try:
    with urllib.request.urlopen(url) as response:
        data = json.loads(response.read().decode())
        for result in data.get("results", []):
            title = result.get("collectionName")
            link = result.get("collectionViewUrl")
            artwork = result.get("artworkUrl100")
            if artwork:
                artwork = artwork.replace("100x100bb", "600x600bb")
            print(f"Title: {title}")
            print(f"Link: {link}")
            print(f"Artwork: {artwork}")
            print("---")
except Exception as e:
    print(f"Error: {e}")
