import { QuickPickItem, QuickPickOptions, window } from "vscode";

import { inspectScope, writeScoped } from "./config";
import debounce from "./debounce";

// Preview a setting on quick-pick hover, then persist on accept or restore the captured original on cancel/Escape/hide/error. Reads/writes at the value's real scope so we never shadow a workspace setting with a global one.
export default async function livePreview<T extends QuickPickItem>({
  section,
  items,
  toValue,
  options,
}: {
  section: string;
  items: T[];
  toValue: (item: T) => any;
  options?: QuickPickOptions;
}) {
  const original = inspectScope(section);
  let previewWrite: Promise<unknown> = Promise.resolve();
  const preview = debounce((item: T) => {
    previewWrite = Promise.resolve(
      writeScoped(section, toValue(item), original.target),
    );
  }, 300);
  let picked: T | undefined;
  try {
    picked = await window.showQuickPick<T>(items, {
      matchOnDescription: true,
      matchOnDetail: true,
      ...options,
      onDidSelectItem: (item) => preview(item as T),
    });
  } finally {
    // Stop new previews, let any in-flight preview write settle, then write the final value last so a late preview can't clobber it.
    preview.cancel();
    await previewWrite;
    await writeScoped(
      section,
      picked ? toValue(picked) : original.value,
      original.target,
    );
  }
  return picked;
}
