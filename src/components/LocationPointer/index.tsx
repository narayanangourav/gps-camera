import React from "react";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { styles } from "./styles";

type LocationPointerProps = {
  size?: number;
};

const PIN_COLOR = "#1E1A1D";
const CENTER_BG = "#FFFFFF";

export default function LocationPointer({ size = 32 }: LocationPointerProps) {
  const ringWidth = Math.max(4, Math.round(size * 0.18));
  const innerSize = Math.max(12, size - ringWidth * 2);
  const personSize = Math.max(10, Math.round(size * 0.3));
  const tailSize = Math.max(10, Math.round(size * 0.38));

  return (
    <View style={[styles.wrapper, { width: size, height: size + tailSize }]}>
      <View
        style={[
          styles.head,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: ringWidth,
          },
        ]}
      >
        <View
          style={[
            styles.inner,
            {
              width: innerSize,
              height: innerSize,
              borderRadius: innerSize / 2,
            },
          ]}
        >
          <Ionicons name="person" size={personSize} color={PIN_COLOR} />
        </View>
      </View>
      <View
        style={[
          styles.tail,
          {
            width: tailSize,
            height: tailSize,
            marginTop: -Math.round(tailSize * 0.45),
          },
        ]}
      />
    </View>
  );
}
