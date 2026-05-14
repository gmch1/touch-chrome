/**
 * 中键 = MouseEvent.button === 1
 * 仅在非链接区域：mousedown 阻止默认（自动滚动等），auxclick 时关闭标签。
 * 点在 a[href] / area[href] 上时保持浏览器默认（中键在新标签打开链接）。
 */
function isMiddleButton(event) {
  return event.button === 1;
}

/**
 * @param {MouseEvent} event
 * @returns {boolean}
 */
function middleClickOnLink(event) {
  for (const node of event.composedPath()) {
    if (node === document || node === window) break;
    if (!(node instanceof Element)) continue;
    const tag = node.tagName;
    if (tag === "A" && node.hasAttribute("href")) return true;
    if (tag === "AREA" && node.hasAttribute("href")) return true;
  }
  return false;
}

function blockMiddleDefault(event) {
  if (!isMiddleButton(event)) return;
  if (middleClickOnLink(event)) return;
  event.preventDefault();
}

function closeThisTab(event) {
  if (!isMiddleButton(event)) return;
  if (middleClickOnLink(event)) return;
  event.preventDefault();
  event.stopPropagation();
  chrome.runtime.sendMessage({ type: "close-current-tab" });
}

document.addEventListener("mousedown", blockMiddleDefault, true);
document.addEventListener("auxclick", closeThisTab, true);
