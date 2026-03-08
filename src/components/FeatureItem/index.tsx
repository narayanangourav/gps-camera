import React from "react";
import { Text, View, useWindowDimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { responsiveValue } from "../../logics/responsive.logic";
import { appTheme } from "../../logics/theme.logic";
import { webDomProps } from "../../logics/webDom.logic";
import { useStyles } from "./styles";

type FeatureItemProps = {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  text: string;
  selectorKey: string;
};

export default function FeatureItem({ icon, text, selectorKey }: FeatureItemProps) {
  const styles = useStyles();
  const { width } = useWindowDimensions();
  const iconSize = responsiveValue(width, {
    mobile: 20,
    tablet: 24,
    desktop: 26,
  });

  return (
    <View
      style={styles.featureItem}
      {...webDomProps(
        `home-feature-item-${selectorKey}`,
        "home-feature-item",
      )}
    >
      <Ionicons
        name={icon}
        size={iconSize}
        color={appTheme.colors.iconPrimary}
        style={styles.featureIcon}
      />
      <Text
        style={styles.featureText}
        {...webDomProps(
          `home-feature-text-${selectorKey}`,
          "home-feature-text",
        )}
      >
        {text}
      </Text>
    </View>
  );
}
