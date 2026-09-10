/**
 * Centralized content-protection configuration.
 *
 * Change `enabled` to false to disable every protection rule at once.
 * Individual rules can also be switched on/off without changing the component.
 */
export const CONTENT_PROTECTION = {
  enabled: false,

  rules: {
    contextMenu: false,
    keyboardShortcuts: false,
    imageDrag: false,
    linkDrag: false,
    imageMouseDown: false,
    copy: false,
    cut: false,
    textSelection: false,
  },
};

/**
 * A rule is active only when the global switch and the individual switch
 * are both enabled.
 */
export const isProtectionEnabled = (rule) =>
  CONTENT_PROTECTION.enabled && CONTENT_PROTECTION.rules[rule] === false;
