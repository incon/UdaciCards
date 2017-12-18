import { Platform } from "react-native";
import { materialColors } from "react-native-typography";
export const bgDarker = "#E0E0E0";
export const bg = "#F5F5F5";
export const primary = "#424242";
export const primaryDarker = "#212121";
export const white = "#FFF";
export const title =
  Platform.OS === "ios"
    ? materialColors.blackPrimary
    : materialColors.blackSecondary;
