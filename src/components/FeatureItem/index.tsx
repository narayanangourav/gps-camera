import React from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { webDomProps } from "../../logics/webDom.logic";
import { styles } from "./styles";

type FeatureItemProps = {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  text: string;
  selectorKey: string;
};

export default function FeatureItem({ icon, text, selectorKey }: FeatureItemProps) {
  return (
    <View
      style={styles.featureItem}
      {...webDomProps(
        `home-feature-item-${selectorKey}`,
        "home-feature-item",
      )}
    >
      <Ionicons name={icon} size={24} color="#A0CFFF" style={{ marginRight: 15 }} />
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
