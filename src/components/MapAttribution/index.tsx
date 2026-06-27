import React from "react";
import { Text, View } from "react-native";

import { MAP_CONFIG } from "../../services/mapConfig.service";
import { styles } from "./styles";

type MapAttributionProps = {
  compact?: boolean;
};

export default function MapAttribution({
  compact = false,
}: MapAttributionProps) {
  return (
    <View style={[styles.container, compact && styles.containerCompact]}>
      <Text style={[styles.text, compact && styles.textCompact]}>
        {MAP_CONFIG.attributionText}
      </Text>
    </View>
  );
}
