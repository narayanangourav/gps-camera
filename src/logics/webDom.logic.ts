import { Platform } from "react-native";

type WebDomProps = {
  id?: string;
  className?: string;
};

export const webDomProps = (id: string, className: string): WebDomProps => {
  if (Platform.OS !== "web") {
    return {};
  }

  return { id, className };
};

