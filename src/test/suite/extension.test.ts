import assert from "assert";
import { window, ExtensionContext } from "vscode";
import {
  activate,
  deactivate,
  onFirstActivate,
  timeSinceInstall,
} from "../../extension";
import { stateProps } from "../../helpers/constants";
import { DAY_MS } from "../../helpers/time";

function fakeContext(initial: Record<string, unknown> = {}) {
  const store = new Map(Object.entries(initial));
  const context = {
    globalState: {
      get: (key: string) => store.get(key),
      update: (key: string, value: unknown) => {
        store.set(key, value);
        return Promise.resolve();
      },
    },
  } as unknown as ExtensionContext;
  return { context, store };
}

suite("extension startup gating", () => {
  const realInfo = window.showInformationMessage;

  suiteSetup(() => {
    // Silence the welcome / rating prompts so the gating logic runs without UI.
    (window as { showInformationMessage: any }).showInformationMessage =
      async () => undefined;
  });

  suiteTeardown(() => {
    (window as { showInformationMessage: any }).showInformationMessage =
      realInfo;
  });

  test("activate and deactivate are exported", () => {
    assert.ok(activate);
    assert.ok(deactivate);
  });

  test("onFirstActivate records the install date on a fresh install", () => {
    const { context, store } = fakeContext();
    onFirstActivate(context);
    assert.strictEqual(typeof store.get(stateProps.LAST_FOLLOW_UP), "number");
  });

  test("onFirstActivate does nothing when already installed", () => {
    const { context, store } = fakeContext({
      [stateProps.LAST_FOLLOW_UP]: 123,
    });
    onFirstActivate(context);
    assert.strictEqual(store.get(stateProps.LAST_FOLLOW_UP), 123);
  });

  test("timeSinceInstall re-stamps after 30+ days", () => {
    const old = Date.now() - 40 * DAY_MS;
    const { context, store } = fakeContext({
      [stateProps.LAST_FOLLOW_UP]: old,
    });
    timeSinceInstall(context);
    assert.ok(
      (store.get(stateProps.LAST_FOLLOW_UP) as number) > old,
      "expected the follow-up date to advance",
    );
  });

  test("timeSinceInstall does nothing before 30 days", () => {
    const recent = Date.now() - 10 * DAY_MS;
    const { context, store } = fakeContext({
      [stateProps.LAST_FOLLOW_UP]: recent,
    });
    timeSinceInstall(context);
    assert.strictEqual(store.get(stateProps.LAST_FOLLOW_UP), recent);
  });

  test("timeSinceInstall does nothing when the user opted out", () => {
    const old = Date.now() - 40 * DAY_MS;
    const { context, store } = fakeContext({
      [stateProps.LAST_FOLLOW_UP]: old,
      [stateProps.SHOULD_NOT_SHOW_FOLLOW_UP]: true,
    });
    timeSinceInstall(context);
    assert.strictEqual(store.get(stateProps.LAST_FOLLOW_UP), old);
  });

  test("timeSinceInstall does nothing when never installed", () => {
    const { context, store } = fakeContext();
    timeSinceInstall(context);
    assert.strictEqual(store.get(stateProps.LAST_FOLLOW_UP), undefined);
  });
});
