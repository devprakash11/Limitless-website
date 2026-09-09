import { useEffect } from "react";

/**
 * Client-side content protection / anti-copy deterrence.
 *
 * This cannot make browser content impossible to inspect: anything rendered in
 * a browser can ultimately be accessed by a determined user. It does, however,
 * disable common casual save/copy/drag actions and common DevTools shortcuts.
 */
export default function ContentProtection() {
  useEffect(() => {
    const preventContextMenu = (event) => {
      event.preventDefault();
    };

    const preventImageDrag = (event) => {
      if (event.target?.closest?.("img, picture, svg")) {
        event.preventDefault();
      }
    };

    const preventCopy = (event) => {
      const target = event.target;
      // Keep normal copying available in inputs/textareas/contenteditable fields.
      if (
        target?.matches?.("input, textarea, [contenteditable='true']") ||
        target?.closest?.("input, textarea, [contenteditable='true']")
      ) {
        return;
      }
      event.preventDefault();
    };

    const preventSelection = (event) => {
      const target = event.target;
      if (
        target?.matches?.("input, textarea, [contenteditable='true']") ||
        target?.closest?.("input, textarea, [contenteditable='true']")
      ) {
        return;
      }
      event.preventDefault();
    };

    const preventProtectedImageMouseDown = (event) => {
      // Disable the left mouse button for images/media only, while keeping
      // normal navigation, forms, and buttons usable across the website.
      if (event.button === 0 && event.target?.closest?.("img, picture, svg")) {
        event.preventDefault();
      }
    };

    const preventShortcuts = (event) => {
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

    const preventDrag = (event) => {
      if (event.target?.closest?.("img, picture, svg, a")) {
        event.preventDefault();
      }
    };

    document.addEventListener("contextmenu", preventContextMenu, true);
    document.addEventListener("dragstart", preventImageDrag, true);
    document.addEventListener("dragstart", preventDrag, true);
    document.addEventListener("copy", preventCopy, true);
    document.addEventListener("cut", preventCopy, true);
    document.addEventListener("selectstart", preventSelection, true);
    document.addEventListener("mousedown", preventProtectedImageMouseDown, true);
    document.addEventListener("keydown", preventShortcuts, true);

    return () => {
      document.removeEventListener("contextmenu", preventContextMenu, true);
      document.removeEventListener("dragstart", preventImageDrag, true);
      document.removeEventListener("dragstart", preventDrag, true);
      document.removeEventListener("copy", preventCopy, true);
      document.removeEventListener("cut", preventCopy, true);
      document.removeEventListener("selectstart", preventSelection, true);
      document.removeEventListener("mousedown", preventProtectedImageMouseDown, true);
      document.removeEventListener("keydown", preventShortcuts, true);
    };
  }, []);

  return null;
}
