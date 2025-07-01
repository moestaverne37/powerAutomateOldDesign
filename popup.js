document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.getElementById('toggle');
  
    // Load the stored state of the extension
    chrome.storage.sync.get('enabled', function (data) {
      toggle.checked = data.enabled !== false; // Default to enabled if not set
    });
  
    // Add an event listener to the toggle switch
    toggle.addEventListener('change', function () {
      chrome.storage.sync.set({ enabled: toggle.checked });
    });
  });
  