import { useEffect } from "react";
import { isProtectionEnabled } from "../../config/contentProtection";

/**
 * Client-side content protection / anti-copy deterrence.
 *
 * The global and individual switches are controlled from:
 * `src/config/contentProtection.js`
 *
 * This is a deterrent, not DRM. Browser-delivered content can still be
 * accessed by a determined user through browser/network tooling.
 */
export default function ContentProtection() {
  useEffect(() => {
    const contextMenuEnabled = isProtectionEnabled("contextMenu");
    const keyboardShortcutsEnabled = isProtectionEnabled("keyboardShortcuts");
    const imageDragEnabled = isProtectionEnabled("imageDrag");
    const linkDragEnabled = isProtectionEnabled("linkDrag");
    const imageMouseDownEnabled = isProtectionEnabled("imageMouseDown");
    const copyEnabled = isProtectionEnabled("copy");
    const cutEnabled = isProtectionEnabled("cut");
    const selectionEnabled = isProtectionEnabled("textSelection");

    const preventContextMenu = (event) => {
      if (contextMenuEnabled) event.preventDefault();
    };

    const isEditableTarget = (target) =>
      target?.matches?.("input, textarea, [contenteditable='true']") ||
      target?.closest?.("input, textarea, [contenteditable='true']");

    const preventImageDrag = (event) => {
      if (imageDragEnabled && event.target?.closest?.("img, picture, svg")) {
        event.preventDefault();
      }
    };

    const preventLinkDrag = (event) => {
      if (linkDragEnabled && event.target?.closest?.("a")) {
        event.preventDefault();
      }
    };

    const preventCopy = (event) => {
      if (!copyEnabled || isEditableTarget(event.target)) return;
      event.preventDefault();
    };

    const preventCut = (event) => {
      if (!cutEnabled || isEditableTarget(event.target)) return;
      event.preventDefault();
    };

    const preventSelection = (event) => {
      if (!selectionEnabled || isEditableTarget(event.target)) return;
      event.preventDefault();
    };

    const preventProtectedImageMouseDown = (event) => {
      if (
        imageMouseDownEnabled &&
        event.button === 0 &&
        event.target?.closest?.("img, picture, svg")
      ) {
        event.preventDefault();
      }
    };

    const preventShortcuts = (event) => {
      if (!keyboardShortcutsEnabled) return;

      const key = event.key.toLowerCase();
      const ctrlOrMeta = event.ctrlKey || event.metaKey;
      const blocked =
        event.key === "F12" ||
        (ctrlOrMeta && event.shiftKey && ["i", "j", "c"].includes(key)) ||
        (ctrlOrMeta && ["u", "s", "p"].includes(key)) ||
        (event.ctrlKey && event.shiftKey && key === "k");

      if (blocked) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    if (contextMenuEnabled) document.addEventListener("contextmenu", preventContextMenu, true);
    if (imageDragEnabled) document.addEventListener("dragstart", preventImageDrag, true);
    if (linkDragEnabled) document.addEventListener("dragstart", preventLinkDrag, true);
    if (copyEnabled) document.addEventListener("copy", preventCopy, true);
    if (cutEnabled) document.addEventListener("cut", preventCut, true);
    if (selectionEnabled) document.addEventListener("selectstart", preventSelection, true);
    if (imageMouseDownEnabled) document.addEventListener("mousedown", preventProtectedImageMouseDown, true);
    if (keyboardShortcutsEnabled) document.addEventListener("keydown", preventShortcuts, true);

    return () => {
      document.removeEventListener("contextmenu", preventContextMenu, true);
      document.removeEventListener("dragstart", preventImageDrag, true);
      document.removeEventListener("dragstart", preventLinkDrag, true);
      document.removeEventListener("copy", preventCopy, true);
      document.removeEventListener("cut", preventCut, true);
      document.removeEventListener("selectstart", preventSelection, true);
      document.removeEventListener("mousedown", preventProtectedImageMouseDown, true);
      document.removeEventListener("keydown", preventShortcuts, true);
    };
  }, []);

  return null;
}
