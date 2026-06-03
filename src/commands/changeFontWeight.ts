import { getConfig } from "../helpers/config";
import livePreview from "../helpers/livePreview";

interface FontWeightItem {
  label: string;
  description?: string;
}

const SECTION = "terminal.integrated.fontWeight";

export function changeFontWeight() {
  const currentWeight = getConfig({ section: SECTION }) as string;
  const weights = [
    "normal",
    "bold",
    ...Array.from({ length: 9 }, (_, i) => String((i + 1) * 100)),
  ];
  const items: FontWeightItem[] = weights.map((weight) => ({
    label: weight,
    description: currentWeight === weight ? "current" : undefined,
  }));
  return livePreview<FontWeightItem>({
    section: SECTION,
    items,
    toValue: (item) => item.label,
    options: { placeHolder: "Choose a Font Weight" },
  });
}
