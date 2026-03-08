import { useEffect } from "react";
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

export const useWebViewportLock = () => {
  useEffect(() => {
    if (Platform.OS !== "web" || typeof document === "undefined") {
      return;
    }

    const html = document.documentElement;
    const body = document.body;
    const root = document.getElementById("root");
    const appRoot = document.getElementById("app-root");
    const targets = [html, body, root, appRoot].filter(
      (element): element is HTMLElement => element instanceof HTMLElement,
    );

    const previousStyles = targets.map((element) => ({
      element,
      height: element.style.height,
      width: element.style.width,
      overflow: element.style.overflow,
      display: element.style.display,
      flex: element.style.flex,
      margin: element.style.margin,
      overscrollBehavior: element.style.overscrollBehavior,
    }));

    html.style.height = "100%";
    html.style.width = "100%";
    body.style.height = "100%";
    body.style.width = "100%";
    body.style.margin = "0";
    body.style.overflow = "hidden";
    body.style.overscrollBehavior = "none";

    if (root) {
      root.style.display = "flex";
      root.style.flex = "1";
      root.style.height = "100%";
      root.style.width = "100%";
      root.style.overflow = "hidden";
    }

    if (appRoot) {
      appRoot.style.display = "flex";
      appRoot.style.flex = "1";
      appRoot.style.height = "100%";
      appRoot.style.width = "100%";
      appRoot.style.overflow = "hidden";
    }

    return () => {
      previousStyles.forEach(({ element, ...styles }) => {
        element.style.height = styles.height;
        element.style.width = styles.width;
        element.style.overflow = styles.overflow;
        element.style.display = styles.display;
        element.style.flex = styles.flex;
        element.style.margin = styles.margin;
        element.style.overscrollBehavior = styles.overscrollBehavior;
      });
    };
  }, []);
};
