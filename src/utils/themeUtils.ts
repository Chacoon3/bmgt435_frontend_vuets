import { reactive, computed } from "vue";

const themeConfig = reactive<ThemeConfig>({
  colorMode: "light",
});

const divBackgroundColor = computed(() => {
  if (themeConfig.colorMode === "light") {
    return "white";
  } else if (themeConfig.colorMode === "dark") {
    return "lightgray";
  } else {
    throw new Error("Invalid color mode");
  }
});

export default function useTheme() {
  return {
    themeConfig,
    divBackgroundColor
  };
}

export type ThemeConfig = {
  colorMode: "light" | "dark";
};
