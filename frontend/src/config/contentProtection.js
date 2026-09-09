/**
 * Centralized content-protection configuration.
 *
 * Change `enabled` to false to disable every protection rule at once.
 * Individual rules can also be switched on/off without changing the component.
 */
export const CONTENT_PROTECTION = {
  enabled: true,

  rules: {
    contextMenu: true,
    keyboardShortcuts: true,
    imageDrag: true,
    linkDrag: true,
    imageMouseDown: true,
    copy: true,
    cut: true,
    textSelection: true,
  },
};

/**
 * A rule is active only when the global switch and the individual switch
 * are both enabled.
 */
export const isProtectionEnabled = (rule) =>
  CONTENT_PROTECTION.enabled && CONTENT_PROTECTION.rules[rule] === true;
