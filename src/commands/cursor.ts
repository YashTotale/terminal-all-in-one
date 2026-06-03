import { getConfig, inspectScope, writeScoped } from "../helpers/config";
import livePreview from "../helpers/livePreview";

interface PickItem {
  label: string;
  description?: string;
}

type CursorStyle = "line" | "block" | "underline";

const WIDTH = "terminal.integrated.cursorWidth";
const STYLE = "terminal.integrated.cursorStyle";
const BLINKING = "terminal.integrated.cursorBlinking";

export function changeCursorWidth() {
  const current = getConfig({ section: WIDTH }) as number;
  const items: PickItem[] = Array.from({ length: 8 }, (_, i) => i + 1).map(
    (width) => ({
      label: `${width}-pt`,
      description: current === width ? "current" : undefined,
    }),
  );
  return livePreview<PickItem>({
    section: WIDTH,
    items,
    toValue: (item) => parseInt(item.label.slice(0, -3)),
    options: { placeHolder: "Choose a Cursor Width" },
  });
}

export function changeCursorStyle() {
  const current = getConfig({ section: STYLE }) as CursorStyle;
  const styles: CursorStyle[] = ["line", "block", "underline"];
  const items: PickItem[] = styles.map((style) => ({
    label: style,
    description: style === current ? "current" : undefined,
  }));
  return livePreview<PickItem>({
    section: STYLE,
    items,
    toValue: (item) => item.label,
    options: { placeHolder: "Choose a Cursor Style" },
  });
}

export function toggleBlinkingCursor() {
  const isBlinking = getConfig({ section: BLINKING }) as boolean;
  const { target } = inspectScope(BLINKING);
  return writeScoped(BLINKING, !isBlinking, target);
}
