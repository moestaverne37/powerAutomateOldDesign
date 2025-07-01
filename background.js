// Listen for tab updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // Check if URL is fully loaded and ready
    if (changeInfo.status === "complete") {
      // Check if the extension is enabled
      chrome.storage.sync.get('enabled', function (data) {
        if (data.enabled !== false) { // Default to enabled if not set
          // Send a message to the content script to modify the URL
          chrome.tabs.sendMessage(tabId, { action: "modifyURL" });
        }
      });
    }
  });
  