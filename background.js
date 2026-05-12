chrome.runtime.onMessage.addListener((message, sender) => {
  if (message?.type !== "close-current-tab") return;
  const tabId = sender.tab?.id;
  if (tabId == null) return;
  chrome.tabs.remove(tabId).catch(() => {});
});
