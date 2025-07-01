// Message listener to receive instructions from background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "modifyURL") {
      // Check if the extension is enabled
      chrome.storage.sync.get('enabled', function (data) {
        if (data.enabled !== false) { // Default to enabled if not set
          modifyURL();
        }
      });
    }
  });
  
  // Function to modify URL
  function modifyURL() {
    const url = window.location.href;
    const pattern = "https://make.powerautomate.com/environments/{environmentID}/flows/";
  
    // Check if URL contains the pattern and "?v3=true" in the query string
    if (url.startsWith(pattern) && url.includes("?v3=true")) {
      // Replace "?v3=true" with "?v3=false" in the URL
      const modifiedURL = url.replace("?v3=true", "?v3=false");
  
      // Navigate to the modified URL
      window.location.href = modifiedURL;
    } else if (url.startsWith(pattern) && url.includes("runs") && !url.includes("v3=false")) {
      const modifiedURL = url.concat("?v3=false");
      // Navigate to the modified URL
      window.location.href = modifiedURL;
    }
  }
  