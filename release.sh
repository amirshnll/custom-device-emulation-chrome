find . -type f -name ".DS_Store" -delete
cd plugin
zip -r chrome.zip . --exclude .DS_Store
mv chrome.zip ~/Downloads/chrome.zip