/**
 * 中键 = MouseEvent.button === 1
 * mousedown 仅阻止默认（避免中键打开链接新标签、自动滚动等）。
 * auxclick 时再关闭当前标签，避免重复发送。
 */
function isMiddleButton(event) {
  return event.button === 1;
}

function blockMiddleDefault(event) {
  if (!isMiddleButton(event)) return;
  event.preventDefault();
}

function closeThisTab(event) {
  if (!isMiddleButton(event)) return;
  event.preventDefault();
  event.stopPropagation();
  chrome.runtime.sendMessage({ type: "close-current-tab" });
}

document.addEventListener("mousedown", blockMiddleDefault, true);
document.addEventListener("auxclick", closeThisTab, true);
