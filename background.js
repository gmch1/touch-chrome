function removeTab(tabId) {
  if (tabId == null) return;
  chrome.tabs.remove(tabId).catch(() => {});
}

async function removeActiveTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  removeTab(tab?.id);
}

chrome.runtime.onMessage.addListener((message, sender) => {
  if (message?.type !== "close-current-tab") return;
  removeTab(sender.tab?.id);
});

chrome.commands.onCommand.addListener((command) => {
  if (command === "close-current-tab") removeActiveTab();
});
