import { getConfig, inspectScope, writeScoped } from "../helpers/config";
import livePreview from "../helpers/livePreview";

interface FontSizeItem {
  label: string;
  description?: string;
}

const SECTION = "terminal.integrated.fontSize";

export function changeFontSize() {
  const currentSize = getConfig({ section: SECTION }) as number;
  const items: FontSizeItem[] = Array.from({ length: 19 }, (_, i) => i + 8).map(
    (size) => ({
      label: `${size}-pt`,
      description: currentSize === size ? "current" : undefined,
    }),
  );
  return livePreview<FontSizeItem>({
    section: SECTION,
    items,
    toValue: (item) => parseInt(item.label.slice(0, -3)),
    options: { placeHolder: "Choose a Font Size" },
  });
}

function adjustFontSize(delta: number) {
  const currentSize = getConfig({ section: SECTION }) as number;
  const { target } = inspectScope(SECTION);
  writeScoped(SECTION, currentSize + delta, target);
}

export const decreaseFontSize = () => adjustFontSize(-1);
export const increaseFontSize = () => adjustFontSize(1);
