import urllib.request
import json

url = "https://itunes.apple.com/search?term=Tspazz&entity=album&limit=200"
try:
    with urllib.request.urlopen(url) as response:
        data = json.loads(response.read().decode())
        found_need_that = False
        for result in data.get("results", []):
            title = result.get("collectionName")
            if "Need That" in title:
                link = result.get("collectionViewUrl")
                artwork = result.get("artworkUrl100")
                if artwork:
                    artwork = artwork.replace("100x100bb", "600x600bb")
                print(f"Title: {title}")
                print(f"Link: {link}")
                print(f"Artwork: {artwork}")
                print("---")
                found_need_that = True
        if not found_need_that:
            print("Need That still not found")
except Exception as e:
    print(f"Error: {e}")
