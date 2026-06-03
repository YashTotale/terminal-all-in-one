export const EXTENSION_NAME_W_PUBLISHER = "yasht.terminal-all-in-one";
export const READABLE_EXTENSION_NAME = "Terminal All In One";
export const EXTENSION_NAME = "terminalAllInOne";

// Key strings are preserved so existing users' globalState is honored (no re-shown welcome, no re-prompt for those who opted out). LAST_FOLLOW_UP holds the install date initially, then the last time the rating prompt was shown; its presence also marks that the welcome has run.
export const stateProps = {
  LAST_FOLLOW_UP: "dateInstalled",
  SHOULD_NOT_SHOW_FOLLOW_UP: "shouldNotShowFollowUp",
};
