chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "searchYouGlish",
    title: "Spell Finder: примеры '%s' на YouTube",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "searchYouGlish") {
    const query = info.selectionText;
    console.log("Context menu clicked, query:", query);

    // CRITICAL: chrome.sidePanel.open() MUST be called synchronously 
    // or in the very first turn of the event loop to preserve the "user gesture".
    // Calling it inside a storage.set callback loses the gesture.

    chrome.sidePanel.open({ tabId: tab.id }).then(() => {
      console.log("Side panel opened successfully");
    }).catch((err) => {
      console.error("Failed to open side panel:", err);
      // Fallback to windowId if tabId fails
      chrome.sidePanel.open({ windowId: tab.windowId }).catch(e => console.error("Window fallback failed:", e));
    });

    // Update storage AFTER calling open. 
    // The side panel will pick it up either via initial get or onChanged.
    chrome.storage.local.set({
      lastQuery: query,
      timestamp: Date.now()
    });
  }
});

// Open side panel when clicking the extension icon
chrome.action.onClicked.addListener((tab) => {
  chrome.sidePanel.open({ tabId: tab.id }).catch(() => {
    chrome.sidePanel.open({ windowId: tab.windowId });
  });
});
